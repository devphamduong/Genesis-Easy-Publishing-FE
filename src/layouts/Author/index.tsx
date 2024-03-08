import React, { FC, useState } from "react";
import "./AuthorLayout.scss";
import { ICategory } from "../../interfaces/category.interface";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

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

const AuthorLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuItem[] = [
    getItem(
      <div onClick={() => navigate("/author/write-story")}>Thống kê</div>,
      "1",
      <PieChartOutlined onClick={() => navigate("/author/write-story")} />
    ),
    getItem(
      <div onClick={() => navigate("/author/write-story")}>Tạo truyện mới</div>,
      "2",
      <PieChartOutlined onClick={() => navigate("/author/write-story")} />
    ),
    getItem(
      <div onClick={() => navigate("/author/write-chapter")}>
        Viết chương truyện
      </div>,
      "3",
      <DesktopOutlined onClick={() => navigate("/author/write-chapter")} />
    ),
    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                marginTop: 16,
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet context={categories} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            <strong className="copy-right">
              The Genesis ©{new Date().getFullYear()}. Created by SWP490 G14.
            </strong>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AuthorLayout;
