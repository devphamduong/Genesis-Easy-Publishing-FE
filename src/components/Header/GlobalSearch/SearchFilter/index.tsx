import { FC } from "react";
import "./SearchFilter.scss";
import { Avatar, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface IProps {}

const SearchFilter: FC<IProps> = (props: IProps) => {
  const handleChange = (value: string) => {};

  return (
    <div>
      <Select
        defaultValue="lucy"
        className="custom-author-search-dropdown"
        onChange={handleChange}
        options={[
          { value: "jack", label: "Jack" },
          { value: "lucy", label: "Lucy" },
          { value: "Yiminghe", label: "yiminghe" },
        ]}
        labelRender={(props) => {
          const { label, value } = props;
          return (
            <div className="d-flex align-items-center gap-2">
              <Avatar size="large" icon={<UserOutlined />} />
              <div className="d-flex flex-column">
                <strong className="text-eclipse">{label}</strong>
                <span className="text-eclipse">{label}</span>
              </div>
            </div>
          );
        }}
        optionRender={(props) => {
          const { data } = props;
          return (
            <>
              <div className="d-flex align-items-center gap-2">
                <Avatar size="large" icon={<UserOutlined />} />
                <div className="d-flex flex-column">
                  <strong className="text-eclipse">{data.label}</strong>
                  <span className="text-eclipse">{data.label}</span>
                </div>
              </div>
            </>
          );
        }}
      />
      <p>Giá</p>
      <p>Thể loại</p>
      <p>Hoàn thành or chưa hoàn thành</p>
    </div>
  );
};

export default SearchFilter;
