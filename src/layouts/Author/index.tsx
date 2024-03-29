import React, { FC, useEffect, useState } from "react";
import "./AuthorLayout.scss";
import "../../components/Header/Header.scss";
import { ICategory } from "../../interfaces/category.interface";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Col, Layout, Menu, Popover, Row, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { logoutAction } from "../../redux/account/accountSlice";
import { toast } from "react-toastify";
import { logout } from "../../services/auth-api-service";
import { EMenuKey, EMenuLabel } from "../../enums/menu.enum";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../enums/route-end-point.enum";
import { GiBookshelf } from "react-icons/gi";
import { TbBookUpload } from "react-icons/tb";
import { GrChapterAdd } from "react-icons/gr";
import { VscOpenPreview } from "react-icons/vsc";

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

const HeaderAuthor = (props: IProps) => {
  const account = useSelector((state: IRootState) => state.account?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopoverOpen, setIPopoverOpen] = useState<boolean>(false);

  const popoverTitle = () => {
    return (
      <div className="d-flex align-items-center gap-2">
        <Avatar size="large" icon={<UserOutlined />} />
        <div>{account.username ?? "vcl"}</div>
      </div>
    );
  };

  const popoverMenu = () => {
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
      getItem(<div>Home</div>, "home", null),
      getItem(<div>{EMenuLabel.PROFILE}</div>, EMenuKey.PROFILE, null),
      getItem(<div>{EMenuLabel.DEPOSIT}</div>, EMenuKey.DEPOSIT, null),
      getItem(
        <Button block onClick={() => handleLogout()}>
          Đăng xuất
        </Button>,
        "logout",
        null
      ),
    ];

    const onClick: MenuProps["onClick"] = (e) => {
      const { key } = e;
      setIPopoverOpen(false);
      switch (key) {
        case "home":
          navigate("/");
          break;
        case EMenuKey.PROFILE:
          navigate(ERouteEndPointForUser.DASHBOARD);
          break;
        case EMenuKey.DEPOSIT:
          navigate(ERouteEndPointForUser.DEPOSIT);
          break;
      }
    };

    return (
      <Menu
        className="custom-header-menu"
        style={{ width: 256, border: "none" }}
        mode="inline"
        items={items}
        onClick={onClick}
      />
    );
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res && res.ec === 0) {
      dispatch(logoutAction());
      toast.success("Logout successfully");
      navigate("/");
    }
    setIPopoverOpen(false);
  };

  return (
    <div className="header-container container-fluid px-5">
      <Row justify={"end"}>
        <Col>
          <div>Hi {account.username}</div>
          <strong className="pointer">
            <Popover
              content={popoverMenu()}
              title={popoverTitle()}
              trigger={"click"}
              placement="bottomRight"
              open={isPopoverOpen}
              onOpenChange={(isOpen) => setIPopoverOpen(isOpen)}
            >
              My Account
            </Popover>
          </strong>
        </Col>
      </Row>
    </div>
  );
};

const AuthorLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [currentParams, setCurrentParams] = useState<string>(
    ERouteEndPointForAuthor.DASHBOARD
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}>
        {EMenuLabel.AUTHOR_POSTED_STORY}
      </div>,
      ERouteEndPointForAuthor.POSTED_STORIES,
      <GiBookshelf
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
      />
    ),
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}>
        {EMenuLabel.AUTHOR_WRITE_STORY}
      </div>,
      ERouteEndPointForAuthor.WRITE_STORY,
      <TbBookUpload
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}
      />
    ),
    getItem(
      <div>{EMenuLabel.AUTHOR_WRITE_CHAPTER}</div>,
      ERouteEndPointForAuthor.WRITE_CHAPTER,
      <GrChapterAdd className="fs-5" />,
      undefined,
      true
    ),
    getItem(
      <div onClick={() => navigate(ERouteEndPointForAuthor.REVIEW_STORY)}>
        {EMenuLabel.AUTHOR_REVIEW_STORY}
      </div>,
      ERouteEndPointForAuthor.REVIEW_STORY,
      <VscOpenPreview
        className="fs-5"
        onClick={() => navigate(ERouteEndPointForAuthor.REVIEW_STORY)}
      />
    ),
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
            defaultSelectedKeys={[currentParams]}
            selectedKeys={[currentParams]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <HeaderAuthor />
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
