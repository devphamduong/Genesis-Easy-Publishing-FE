import { FC, useEffect, useState } from "react";
import { RouteEndPointForUser } from "../../constants/route-end-point.constant";
import { Affix, Col, Menu, MenuProps, Row } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
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
    <Link to={RouteEndPointForUser.RANK_STORIES}>Bảng xếp hạng</Link>,
    RouteEndPointForUser.RANK_STORIES,
    null
  ),
  { type: "divider" },

  getItem(
    <Link to={RouteEndPointForUser.MOST_READ_IN_WEEK}>
      Đọc nhiều trong tuần
    </Link>,
    RouteEndPointForUser.MOST_READ_IN_WEEK,
    null
  ),
  getItem(
    <Link to={RouteEndPointForUser.MOST_VIP_STORIES_READ}>
      Truyện VIP nhiều người đọc
    </Link>,
    RouteEndPointForUser.MOST_VIP_STORIES_READ,
    null
  ),
  getItem(
    <Link to={RouteEndPointForUser.TOP_FULL_STORIES}>Top truyện full</Link>,
    RouteEndPointForUser.TOP_FULL_STORIES,
    null
  ),
  { type: "divider" },

  getItem(
    <Link to={RouteEndPointForUser.STORIES_WITH_MOST_FAN}>
      Truyện nhiều fan
    </Link>,
    RouteEndPointForUser.STORIES_WITH_MOST_FAN,
    null
  ),
];

interface IProps {
  categories: ICategory[];
}

const RankStoriesLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const location = useLocation();
  const [currentParams, setCurrentParams] = useState(
    RouteEndPointForUser.RANK_STORIES
  );

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

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
                defaultSelectedKeys={[currentParams]}
                selectedKeys={[currentParams]}
                mode="inline"
                items={items}
              />
              <EPFilter />
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
