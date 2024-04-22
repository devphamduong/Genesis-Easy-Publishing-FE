import { FC, useState } from "react";
import "./HeaderAuthor.scss";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Menu,
  MenuProps,
  Popover,
  Row,
  Switch,
} from "antd";
import { MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import { EMenuKey, EMenuLabel } from "../../../enums/menu.enum";
import { ERouteEndPointForUser } from "../../../enums/route-end-point.enum";
import { logout } from "../../../services/auth-api-service";
import {
  changeThemeAction,
  logoutAction,
} from "../../../redux/account/accountSlice";
import { toast } from "react-toastify";
import EPButton from "../../../components/EP-UI/Button";
import { IoIosMenu } from "react-icons/io";
import { useBreakpoint } from "../../../hooks/customHooks";

interface IProps {
  setOpen: (value: boolean) => void;
}

const HeaderAuthor: FC<IProps> = (props: IProps) => {
  const { setOpen } = props;
  const account = useSelector((state: IRootState) => state.account?.user);
  const isDarkTheme = useSelector(
    (state: IRootState) => state.account.isDarkTheme
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const breakpoint = useBreakpoint();

  const popoverTitle = () => {
    return (
      <div className="d-flex align-items-center gap-2">
        <Avatar
          size="large"
          icon={<UserOutlined />}
          src={`${import.meta.env.VITE_BACKEND_URL}Assets/images/avatar/${
            account.userImage
          }`}
        />
        <div>{account.username ?? ""}</div>
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
      getItem(<div>Trang chủ</div>, "home", null),
      getItem(<div>{EMenuLabel.PROFILE}</div>, EMenuKey.PROFILE, null),
      getItem(<div>{EMenuLabel.DEPOSIT}</div>, EMenuKey.DEPOSIT, null),
      getItem(
        <Flex align="center" justify="space-between">
          Giao diện
          <Switch
            className="me-2"
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            value={isDarkTheme}
            onChange={(e) => dispatch(changeThemeAction(e))}
          />
        </Flex>,
        "theme",
        null
      ),
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
      switch (key) {
        case "home":
          handleNavigateAndClose("/");
          break;
        case EMenuKey.PROFILE:
          handleNavigateAndClose(ERouteEndPointForUser.DASHBOARD);
          break;
        case EMenuKey.DEPOSIT:
          handleNavigateAndClose(ERouteEndPointForUser.DEPOSIT);
          break;
      }
    };

    const handleNavigateAndClose = (endpoint: string) => {
      navigate(endpoint);
      setIsPopoverOpen(false);
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
    <div className="header-container container-fluid px-5 text-theme">
      <Row
        justify={
          breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md"
            ? "space-between"
            : "end"
        }
        align={"middle"}
      >
        <Col xs={5} lg={0} className="d-lg-none">
          <EPButton
            type="primary"
            icon={<IoIosMenu />}
            onClick={() => setOpen(true)}
          />
        </Col>
        <Col>
          <div>Xin chào {account.username}</div>
          <div>
            Bạn đang có: <strong>{account.tlt}</strong> TLT
          </div>
          <strong className="pointer">
            <Popover
              content={popoverMenu()}
              title={popoverTitle()}
              trigger={"click"}
              placement="bottomRight"
              open={isPopoverOpen}
              onOpenChange={(isOpen) => setIsPopoverOpen(isOpen)}
            >
              Tài khoản
            </Popover>
          </strong>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderAuthor;
