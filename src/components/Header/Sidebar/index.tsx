import { Button, Drawer, Flex, Typography } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { EMenuLabel } from "../../../enums/menu.enum";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../../enums/route-end-point.enum";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
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
  const navigate = useNavigate();

  return (
    <Drawer
      className="side-bar"
      title={
        <Link className="navbar-brand text-center" to={"/"}>
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
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForUser.DASHBOARD)}
            >
              {EMenuLabel.PROFILE}
            </Button>
            <Button
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForUser.DEPOSIT)}
            >
              {EMenuLabel.DEPOSIT}
            </Button>
            <Button
              type="text"
              block
              onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
            >
              {EMenuLabel.MANAGE}
            </Button>
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
