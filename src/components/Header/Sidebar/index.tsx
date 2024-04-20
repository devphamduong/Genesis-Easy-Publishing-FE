import { Button, Drawer, Flex, Switch, Typography } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { EMenuLabel } from "../../../enums/menu.enum";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../../enums/route-end-point.enum";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { changeThemeAction } from "../../../redux/account/accountSlice";
const { Text } = Typography;

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  tlt: number;
  handleLogout: () => void;
}

const Sidebar: FC<IProps> = (props: IProps) => {
  const { open, setOpen, tlt, handleLogout } = props;
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const isDarkTheme = useSelector(
    (state: IRootState) => state.account.isDarkTheme
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Drawer
      className="side-bar"
      title={
        <Link className="navbar-brand text-center fs-4" to={"/"}>
          The Genesis
        </Link>
      }
      placement={"left"}
      onClose={() => setOpen(false)}
      open={open}
      key={"left"}
    >
      <Flex vertical align="start" gap={10}>
        {isAuthenticated ? (
          <>
            <Button
              className="text-start"
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForUser.DASHBOARD)}
            >
              {EMenuLabel.PROFILE}
            </Button>
            <Button
              className="text-start"
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForUser.DEPOSIT)}
            >
              {EMenuLabel.DEPOSIT}
            </Button>
            <Button
              className="text-start"
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
            >
              {EMenuLabel.MANAGE}
            </Button>
            <Flex align="center" justify="space-between" className="w-100">
              <Text>Giao diện</Text>
              <Switch
                className="me-2"
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                value={isDarkTheme}
                onChange={(e) => dispatch(changeThemeAction(e))}
              />
            </Flex>
            <Text className="tlt-amount">
              Bạn đang có: <strong>{tlt}</strong> TLT
            </Text>
            <Button block onClick={() => handleLogout()}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <Button type="primary" block onClick={() => navigate("/auth/login")}>
            Đăng nhập
          </Button>
        )}
      </Flex>
    </Drawer>
  );
};

export default Sidebar;
