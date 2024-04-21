import { FC, useEffect, useState } from "react";
import "./EPFilter.scss";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IFilterOptions } from "../../../interfaces/global.interface";
import { getFilterOptionsV1 } from "../../../services/common-api-service";

interface IProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  domIdForPopupContainer?: string;
}

const EPFilter: FC<IProps> = (props: IProps) => {
  const { searchTerm, setSearchTerm, domIdForPopupContainer } = props;
  const [form] = Form.useForm();
  const [maxPrice, setMaxPrice] = useState(0);
  const [filterOptions, setFilterOptions] = useState<IFilterOptions>();

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    const res = await getFilterOptionsV1();
    if (res && res.ec === 0) {
      setMaxPrice(res.dt.to);
      setFilterOptions(res.dt);
    }
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
        <Form.Item name="from">
          <InputNumber addonBefore="Từ" addonAfter="TLT" min={0} />
        </Form.Item>
        <Form.Item name="to">
          <InputNumber addonBefore="Đến" addonAfter="TLT" max={maxPrice} />
        </Form.Item>
        <Form.Item name="cates">
          <Select
            mode="multiple"
            maxTagCount="responsive"
            placeholder="Thể loại"
            allowClear
            getPopupContainer={() =>
              document.getElementById(domIdForPopupContainer || "")!
            }
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
            getPopupContainer={() =>
              document.getElementById(domIdForPopupContainer || "")!
            }
            options={
              filterOptions &&
              filterOptions.status.map((item) => {
                return { value: item.value as string, label: item.name };
              })
            }
          />
        </Form.Item>
        <Button block icon={<SearchOutlined />} onClick={() => form.submit()}>
          Tìm kiếm
        </Button>
      </Form>
    </>
  );
};

export default EPFilter;
