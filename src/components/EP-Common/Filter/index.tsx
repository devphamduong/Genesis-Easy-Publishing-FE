import { FC, useEffect, useState } from "react";
import "./EPFilter.scss";
import { Button, Checkbox, Form, GetProp, Input, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IFilterOptions } from "../../../interfaces/global.interface";
import { getFilterOptions } from "../../../services/common-api-service";
import { useSearchParams } from "react-router-dom";

interface IProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

let MAX_PRICE = 100;

const EPFilter: FC<IProps> = (props: IProps) => {
  const { searchTerm, setSearchTerm } = props;
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();

  useEffect(() => {
    // if (searchParams) {
    //   form.setFieldsValue({
    //     title: searchParams.get("title"),
    //     price: [searchParams.get("downLimit"), searchParams.get("upLimit")],
    //     cates: [searchParams.get("cates")],
    //   });
    //   // setPriceRange([
    //   //   searchParams.get("downLimit"),
    //   //   +searchParams.get("upLimit"),
    //   // ]);
    // }
    // console.log(searchParams.get("title"), searchParams.get("cates"));
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    const res = await getFilterOptions();
    if (res && res.ec === 0) {
      setPriceRange([res.dt.from, res.dt.to]);
      MAX_PRICE = res.dt.to;
      form.setFieldValue("price", [res.dt.from, res.dt.to]);
      setFilterOptions(res.dt);
    }
  };

  // const options = [
  //   { label: "Apple", value: "Apple" },
  //   { label: "Pear", value: "Pear" },
  //   { label: "Orange", value: "Orange" },
  // ];

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };

  const onChangePriceRange = (value: number[]) => {
    setPriceRange(value);
    form.setFieldValue("price", value);
  };

  const onFinish = (values) => {
    let query = "";
    Object.keys(values).forEach((key, index) => {
      if (values[key]) {
        if (values[key] instanceof Array && values[key].length) {
          values[key].forEach((element, index) => {
            if (key === "price") {
              if (index === 0) {
                query += `downLimit=` + element + "&";
              } else {
                query += `upLimit=` + element + "&";
              }
            } else {
              query += key + `=` + element + "&";
            }
          });
        } else {
          query += key + `=` + values[key] + "&";
        }
      }
    });
    window.history.replaceState(
      null,
      "",
      "?" + query.substring(0, query.length - 1)
    );
    setSearchTerm(query.substring(0, query.length - 1));
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={
          {
            // price: priceRange,
            // cates: form.getFieldValue("cates"),
            // options: ["Pear"],
          }
        }
      >
        <Form.Item name="title">
          <Input
            size="large"
            placeholder="Tìm tên truyện, tác giả"
            prefix={<SearchOutlined />}
          />
        </Form.Item>
        {/* <Form.Item name="options">
          <Checkbox.Group options={options} onChange={onChange} />
        </Form.Item> */}
        <Form.Item name="price">
          <div>
            From: {priceRange[0]} To: {priceRange[1]}
          </div>
          <Slider
            range
            defaultValue={priceRange}
            max={MAX_PRICE}
            onChangeComplete={onChangePriceRange}
          />
        </Form.Item>
        <Form.Item name="cates">
          <Select
            mode="multiple"
            placeholder="Thể loại"
            options={
              filterOptions &&
              filterOptions?.cate?.map((item) => {
                return { value: item.categoryId, label: item.categoryName };
              })
            }
          />
        </Form.Item>
        <Form.Item name="status">
          <Select
            placeholder="Trạng thái"
            options={
              filterOptions &&
              filterOptions.status.map((item) => {
                return { value: item.value as string, label: item.name };
              })
            }
          />
        </Form.Item>
        <Button block icon={<SearchOutlined />} onClick={() => form.submit()}>
          Seach
        </Button>
      </Form>
    </>
  );
};

export default EPFilter;
