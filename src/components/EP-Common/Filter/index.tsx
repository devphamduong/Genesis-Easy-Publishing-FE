import { FC, useEffect, useState } from "react";
import "./EPFilter.scss";
import { Button, Checkbox, Form, GetProp, Input, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IFilterOptions } from "../../../interfaces/global.interface";
import { getFilterOptions } from "../../../services/common-api-service";

interface IProps {}

let MAX_PRICE = 100;

const EPFilter: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const [priceRange, setPriceRange] = useState<number[]>([0, MAX_PRICE]);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    const res = await getFilterOptions();
    if (res && res.ec === 0) {
      setPriceRange([res.dt.from, res.dt.to]);
      MAX_PRICE = res.dt.to;
      setFilterOptions(res.dt);
    }
  };

  const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };

  const onChangePriceRange = (value: number[]) => {
    setPriceRange(value);
  };

  const onChangeSearch = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onFinish = (values: any) => {
    Object.keys(values).forEach((key) => {
      const value = values[key];
      console.log(`Key: ${key}, Value: ${value}`);
    });
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="storyOrAuthor">
          <Input
            size="large"
            placeholder="Tìm tên truyện, tác giả"
            prefix={<SearchOutlined />}
          />
        </Form.Item>
        <Form.Item name="options">
          <Checkbox.Group
            options={options}
            defaultValue={["Pear"]}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item name="price">
          <div>
            From: {priceRange[0]} To: {priceRange[1]}
          </div>
          <Slider
            range
            defaultValue={priceRange}
            max={MAX_PRICE}
            onChange={onChange}
            onChangeComplete={onChangePriceRange}
          />
        </Form.Item>
        <Form.Item name="multiple">
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
        <Form.Item name="category">
          <Select
            showSearch
            placeholder="Trạng thái"
            optionFilterProp="children"
            onChange={onChangeSearch}
            onSearch={onSearch}
            filterOption={filterOption}
            options={
              filterOptions &&
              filterOptions.status.map((item) => {
                return { value: item.value as string, label: item.name };
              })
            }
          />
        </Form.Item>
        <Button icon={<SearchOutlined />} onClick={() => form.submit()}>
          Seach
        </Button>
      </Form>
    </>
  );
};

export default EPFilter;
