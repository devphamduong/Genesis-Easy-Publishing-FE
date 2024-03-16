import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category.interface";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Col, Menu, MenuProps, Row } from "antd";
import { ERouteEndPointForUser } from "../../../enum/route-end-point.enum";

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
  const location = useLocation();
  const [currentParams, setCurrentParams] = useState(
    ERouteEndPointForUser.DASHBOARD
  );

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      <NavLink to={ERouteEndPointForUser.DASHBOARD}>Dashboard</NavLink>,
      ERouteEndPointForUser.DASHBOARD,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.DEPOSIT}>Ví</NavLink>,
      ERouteEndPointForUser.DEPOSIT,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.CHANGE_PASSWORD}>
        Đổi mật khẩu
      </NavLink>,
      ERouteEndPointForUser.CHANGE_PASSWORD,
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
              defaultSelectedKeys={[currentParams]}
              selectedKeys={[currentParams]}
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
