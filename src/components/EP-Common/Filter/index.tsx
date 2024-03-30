import { FC, useEffect, useState } from "react";
import "./EPFilter.scss";
import { Button, Checkbox, Form, GetProp, Input, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IFilterOptions } from "../../../interfaces/global.interface";
import { getFilterOptionsV1 } from "../../../services/common-api-service";
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
  const [priceRange, setPriceRange] = useState<number[]>();
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    const res = await getFilterOptionsV1();
    if (res && res.ec === 0) {
      setPriceRange([res.dt.from, res.dt.to]);
      MAX_PRICE = res.dt.to;
      form.setFieldValue("price", [res.dt.from, res.dt.to]);
      setFilterOptions(res.dt);
    }
  };

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
                query += `from=` + element + "&";
              } else {
                query += `to=` + element + "&";
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
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title">
          <Input
            size="large"
            placeholder="Tìm tên truyện, tác giả"
            prefix={<SearchOutlined />}
          />
        </Form.Item>
        <Form.Item name="price">
          <div>
            From: {priceRange && priceRange[0]} To:{" "}
            {priceRange && priceRange[1]}
          </div>
          <Slider
            range
            defaultValue={priceRange}
            max={priceRange && priceRange[1]}
            onChangeComplete={onChangePriceRange}
          />
        </Form.Item>
        <Form.Item name="cates">
          <Select
            mode="multiple"
            maxTagCount="responsive"
            placeholder="Thể loại"
            allowClear
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
