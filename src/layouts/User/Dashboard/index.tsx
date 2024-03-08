import { NavLink, Outlet } from "react-router-dom";
import { FC } from "react";
import { ICategory } from "../../../interfaces/category.interface";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Col, Menu, MenuProps, Row } from "antd";
import { RouteEndPointForUser } from "../../../constants/route-end-point.constant";

interface IProps {
  categories: ICategory[];
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const ProfileLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;

  const items: MenuItem[] = [
    getItem(
      <NavLink to={RouteEndPointForUser.USER_DASHBOARD}>Dashboard</NavLink>,
      RouteEndPointForUser.USER_DASHBOARD,
      null
    ),
    getItem(
      <NavLink to={RouteEndPointForUser.USER_DEPOSIT}>Ví</NavLink>,
      RouteEndPointForUser.USER_DEPOSIT,
      null
    ),
  ];

  return (
    <div className="user-dashboard-layout-container">
      <Header />
      <div className="user-dashboard-layout-content container py-3">
        <Row gutter={[16, 10]}>
          <Col span={5}>
            <Menu
              defaultSelectedKeys={[RouteEndPointForUser.USER_DASHBOARD]}
              mode="inline"
              items={items}
            />
          </Col>
          <Col span={19}>
            <Outlet context={categories} />
          </Col>
        </Row>
      </div>
      <Footer categories={categories} />
    </div>
  );
};

export default ProfileLayout;
