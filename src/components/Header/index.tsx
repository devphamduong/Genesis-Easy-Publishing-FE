import {
  AppstoreOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Avatar,
  Button,
  Col,
  Drawer,
  Input,
  Menu,
  MenuProps,
  Popover,
  Row,
} from "antd";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutAction } from "../../redux/account/accountSlice";
import { logout } from "../../services/auth-api-service";
import { IRootState } from "../../redux/store";
import { EMenuKey, EMenuLabel } from "../../enums/menu.enum";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../enums/route-end-point.enum";
import EPButton from "../EP-UI/Button";
import { PiBookmarks } from "react-icons/pi";
import { kFormatter } from "../../shared/function";
interface IProps {}

const Header: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const account = useSelector((state: IRootState) => state.account?.user);
  const [current, setCurrent] = useState<string>("mail");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const items: MenuProps["items"] = [
    {
      label: <NavLink to={"/"}>Truyện chất lượng cao</NavLink>,
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: <NavLink to={"/"}>Truyện mới đăng</NavLink>,
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: <NavLink to={"/vl"}>Truyện đề xuất</NavLink>,
      key: "alipay",
    },
  ];
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const popoverTitle = () => {
    return (
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <Avatar size="large" icon={<UserOutlined />} />
          <div>{account.username ?? "vcl"}</div>
        </div>
        <EPButton
          icon={<PiBookmarks />}
          onClick={() => {
            setIsPopoverOpen(false);
            setOpenDrawer(true);
          }}
        >
          Theo dõi
        </EPButton>
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
      getItem(<div>{EMenuLabel.PROFILE}</div>, EMenuKey.PROFILE, null),
      getItem(<div>{EMenuLabel.DEPOSIT}</div>, EMenuKey.DEPOSIT, null),
      getItem(<div>{EMenuLabel.MANAGE}</div>, EMenuKey.MANAGE, null),
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
      setIsPopoverOpen(false);
      switch (key) {
        case EMenuKey.PROFILE:
          navigate(ERouteEndPointForUser.DASHBOARD);
          break;
        case EMenuKey.DEPOSIT:
          navigate(ERouteEndPointForUser.DEPOSIT);
          break;
        case EMenuKey.MANAGE:
          navigate(ERouteEndPointForAuthor.POSTED_STORIES);
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
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Affix>
        <div className="navbar header-container">
          <div className="container-fluid px-5">
            <Row align={"middle"} className="w-100">
              <Col span={13}>
                <Row align={"middle"}>
                  <Col span={4}>
                    <Link className="navbar-brand" to={"/"}>
                      The Genesis
                    </Link>
                  </Col>
                  <Col span={20}>
                    <Menu
                      style={{ backgroundColor: "transparent" }}
                      onClick={(e) => setCurrent(e.key)}
                      selectedKeys={[current]}
                      mode="horizontal"
                      items={items}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={11}>
                <Row align={"middle"} justify={"space-between"}>
                  <Col span={12}>
                    <Input
                      variant="borderless"
                      size="large"
                      placeholder="Tìm tên truyện, tác giả"
                      prefix={<SearchOutlined />}
                    />
                  </Col>
                  {!isAuthenticated ? (
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => navigate("/auth/login")}
                      >
                        Login
                      </Button>
                    </Col>
                  ) : (
                    <Col className="d-flex align-items-center gap-5">
                      <div>
                        <div>Hi {account.username ?? "friend"}</div>
                        <strong className="pointer">
                          <Popover
                            content={popoverMenu()}
                            title={popoverTitle()}
                            trigger={"click"}
                            placement="bottomRight"
                            open={isPopoverOpen}
                            onOpenChange={(isOpen) => setIsPopoverOpen(isOpen)}
                          >
                            My Account
                          </Popover>
                        </strong>
                      </div>
                      <span>
                        Bạn đang có: {kFormatter(account.tlt)}{" "}
                        <strong>TLT</strong>
                      </span>
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Affix>
      <Drawer
        className="drawer-header"
        title="Truyện đang theo dõi"
        placement={"right"}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        extra={
          <Button
            type="primary"
            onClick={() => navigate(ERouteEndPointForUser.FOLLOWING)}
          >
            Xem đầy đủ
          </Button>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default Header;
