import { FC } from "react";
import { RouteEndPointForUser } from "../../constants/route-end-point.constant";
import {
  Affix,
  Col,
  Menu,
  MenuProps,
  Row,
} from "antd";
import { NavLink, Outlet } from "react-router-dom";
import "./RankStoriesLayout.scss";
import { ICategory } from "../../interfaces/category.interface";
import Cover from "../../components/Cover";
import EPFilter from "../../components/EP-Common/Filter";

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

interface IProps {
  categories: ICategory[];
}

const RankStoriesLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;

  return (
    <div className="rank-stories-layout-container">
      <Cover
        imgUrl="https://yystatic.codeprime.net/desktop/img/tables/table-bg-14.jpg"
        title="Kim Thánh Bảng"
        subTitle="Bảng Xếp Hạng Truyện Chữ Toàn Diện Của The Genesis"
        style={{
          backgroundPositionY: "bottom",
        }}
      />
      <div className="rank-stories-layout-content container py-3">
        <Row gutter={[16, 10]}>
          <Col span={5} className="left">
            <Affix offsetTop={70}>
              <Menu
                defaultSelectedKeys={[RouteEndPointForUser.RANK_STORIES]}
                mode="inline"
                items={items}
              />
              <EPFilter/>
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
