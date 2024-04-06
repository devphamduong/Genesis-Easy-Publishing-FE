import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { ICategory } from "../../../interfaces/category.interface";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Col, Menu, MenuProps, Row } from "antd";
import { ERouteEndPointForUser } from "../../../enums/route-end-point.enum";
import { EMenuLabel } from "../../../enums/menu.enum";

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
  const [currentParams, setCurrentParams] = useState<string>(
    ERouteEndPointForUser.DASHBOARD
  );

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      <NavLink to={ERouteEndPointForUser.DASHBOARD}>
        {EMenuLabel.DASHBOARD}
      </NavLink>,
      ERouteEndPointForUser.DASHBOARD,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.DEPOSIT}>
        {EMenuLabel.DEPOSIT}
      </NavLink>,
      ERouteEndPointForUser.DEPOSIT,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.OWNED_STORIES}>
        {EMenuLabel.OWNED_STORIES}
      </NavLink>,
      ERouteEndPointForUser.OWNED_STORIES,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.FOLLOWING}>
        {EMenuLabel.FOLLOWING}
      </NavLink>,
      ERouteEndPointForUser.FOLLOWING,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.READ_HISTORY}>
        {EMenuLabel.READ_HISTORY}
      </NavLink>,
      ERouteEndPointForUser.READ_HISTORY,
      null
    ),
    getItem(
      <NavLink to={ERouteEndPointForUser.CHANGE_PASSWORD}>
        {EMenuLabel.CHANGE_PASSWORD}
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
