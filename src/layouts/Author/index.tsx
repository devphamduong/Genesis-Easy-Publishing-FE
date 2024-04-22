import React, { FC, useEffect, useState } from "react";
import "./AuthorLayout.scss";
import "../../components/Header/Header.scss";
import { ICategory } from "../../interfaces/category.interface";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { EAuthorMenuLabel } from "../../enums/menu.enum";
import { ERouteEndPointForAuthor } from "../../enums/route-end-point.enum";
import { GiBookshelf } from "react-icons/gi";
import { TbBookUpload } from "react-icons/tb";
import { GrChapterAdd } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";
import { EUserRole } from "../../enums/user.enum";
import HeaderAuthor from "./Header";
import Sidebar from "./Sidebar";

const { Content, Footer, Sider } = Layout;

interface IProps {
  categories?: ICategory[];
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    disabled,
  } as MenuItem;
}

const AuthorLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const role = useSelector((state: IRootState) => state.account?.user.role);
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentParams, setCurrentParams] = useState<string>(
    ERouteEndPointForAuthor.DASHBOARD
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}>
        {EAuthorMenuLabel.POSTED_STORY}
      </div>,
      ERouteEndPointForAuthor.POSTED_STORIES,
      <GiBookshelf
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
      />,
      [
        getItem(
          <div
            onClick={() => navigate(ERouteEndPointForAuthor.UNREVIEW_CHAPTERS)}
          >
            {EAuthorMenuLabel.UNREVIEW_CHAPTERS}
          </div>,
          ERouteEndPointForAuthor.UNREVIEW_CHAPTERS
        ),
      ]
    ),
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}>
        {EAuthorMenuLabel.WRITE_STORY}
      </div>,
      ERouteEndPointForAuthor.WRITE_STORY,
      <TbBookUpload
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}
      />
    ),
    getItem(
      <div>{EAuthorMenuLabel.WRITE_CHAPTER}</div>,
      ERouteEndPointForAuthor.WRITE_CHAPTER,
      <GrChapterAdd className="fs-5" />,
      undefined,
      true
    ),
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.REVIEW)}>
        {EAuthorMenuLabel.REVIEW_STORY}
      </div>,
      ERouteEndPointForAuthor.REVIEW,
      <VscOpenPreview
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.REVIEW)}
      />,
      [
        getItem(
          <div
            onClick={() =>
              navigate(ERouteEndPointForAuthor.CHAPTERS_NEED_TO_REVIEW)
            }
          >
            {EAuthorMenuLabel.CHAPTERS_NEED_TO_REVIEW}
          </div>,
          ERouteEndPointForAuthor.CHAPTERS_NEED_TO_REVIEW
        ),
      ]
    ),
  ];

  return (
    <>
      <Layout
        style={{ minHeight: "100vh" }}
        className="author-layout-container"
      >
        <Sider
          className="d-none d-lg-block"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            onClick={() => navigate("/")}
            className="logo-vertical p-2 text-center pointer"
            style={{ color: "#fff", fontSize: "1.25rem" }}
          >
            The Genesis
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[currentParams]}
            selectedKeys={[currentParams]}
            mode="vertical"
            items={items}
          />
        </Sider>
        <Layout>
          <HeaderAuthor setOpen={setOpenSidebar} />
          <Content style={{ margin: "0 16px" }}>
            <div
              style={
                role === EUserRole.REVIEWER
                  ? {
                      marginTop: 16,
                      padding: 24,
                      minHeight: 360,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }
                  : {}
              }
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
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />
    </>
  );
};

export default AuthorLayout;
