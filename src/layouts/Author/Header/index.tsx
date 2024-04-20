import { FC, useState } from "react";
import "./HeaderAuthor.scss";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Col, Menu, MenuProps, Popover, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { EMenuKey, EMenuLabel } from "../../../enums/menu.enum";
import { ERouteEndPointForUser } from "../../../enums/route-end-point.enum";
import { logout } from "../../../services/auth-api-service";
import { logoutAction } from "../../../redux/account/accountSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopoverOpen, setIPopoverOpen] = useState<boolean>(false);
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
      getItem(<div>Trang chủ</div>, "home", null),
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
          <strong className="pointer">
            <Popover
              content={popoverMenu()}
              title={popoverTitle()}
              trigger={"click"}
              placement="bottomRight"
              open={isPopoverOpen}
              onOpenChange={(isOpen) => setIPopoverOpen(isOpen)}
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
