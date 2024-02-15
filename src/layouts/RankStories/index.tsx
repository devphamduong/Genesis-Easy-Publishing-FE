import { FC, useState } from "react";
import { RouteEndPointForUser } from "../../constants/route-end-point.constant";
import {
  Affix,
  Button,
  Checkbox,
  Col,
  GetProp,
  Input,
  Menu,
  MenuProps,
  Row,
  Select,
  Slider,
} from "antd";
import { NavLink, Outlet } from "react-router-dom";
import "./RankStoriesLayout.scss";
import { ICategory } from "../../interfaces/category.interface";
import { SearchOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <NavLink to={""}>Bảng xếp hạng</NavLink>,
    RouteEndPointForUser.RANK_STORIES,
    null
  ),
  { type: "divider" },

  getItem(
    <NavLink to={RouteEndPointForUser.MOST_READ_IN_WEEK}>
      Đọc nhiều trong tuần
    </NavLink>,
    RouteEndPointForUser.MOST_READ_IN_WEEK,
    null
  ),
  getItem(
    <NavLink to={RouteEndPointForUser.MOST_VIP_STORIES_READ}>
      Truyện VIP nhiều người đọc
    </NavLink>,
    RouteEndPointForUser.MOST_VIP_STORIES_READ,
    null
  ),
  getItem(
    <NavLink to={RouteEndPointForUser.TOP_FULL_STORIES}>
      Top truyện full
    </NavLink>,
    RouteEndPointForUser.TOP_FULL_STORIES,
    null
  ),
  { type: "divider" },

  getItem(
    <NavLink to={RouteEndPointForUser.STORIES_WITH_MOST_FAN}>
      Truyện nhiều fan
    </NavLink>,
    RouteEndPointForUser.STORIES_WITH_MOST_FAN,
    null
  ),
];

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
];

interface IProps {
  categories: ICategory[];
}

const RankStoriesLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);

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

  return (
    <div className="rank-stories-layout-container">
      <div className="banner d-flex flex-column align-items-center justify-content-center">
        <div className="title">
          <strong>Kim Thánh Bảng</strong>
        </div>
        <div className="sub-title">
          <strong>Bảng Xếp Hạng Truyện Chữ Toàn Diện Của The Genesis</strong>
        </div>
      </div>
      <div className="rank-stories-layout-content container py-3">
        <Row gutter={[16, 10]}>
          <Col span={5} className="left">
            <Affix offsetTop={70}>
              <Menu
                defaultSelectedKeys={[RouteEndPointForUser.RANK_STORIES]}
                mode="inline"
                items={items}
              />
              <Input
                size="large"
                placeholder="Tìm tên truyện, tác giả"
                prefix={<SearchOutlined />}
              />
              <Checkbox.Group
                options={options}
                defaultValue={["Pear"]}
                onChange={onChange}
              />
              <div>
                From: {priceRange[0]} To: {priceRange[1]}
              </div>
              <Slider
                range
                defaultValue={priceRange}
                max={100}
                onChange={onChange}
                onChangeComplete={onChangePriceRange}
              />
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChangeSearch}
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
              <Button icon={<SearchOutlined />}>Seach</Button>
            </Affix>
          </Col>
          <Col span={19} className="right">
            <Outlet context={categories} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RankStoriesLayout;
