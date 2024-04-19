import { UserOutlined } from "@ant-design/icons";
import {
  Affix,
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Flex,
  Menu,
  MenuProps,
  Popover,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { getPaginationStoriesFollowing } from "../../services/story-api-service";
import { IStory } from "../../interfaces/story.interface";
import RowStory from "../RowStory";
import GlobalSearch from "./GlobalSearch";
import { IoIosMenu } from "react-icons/io";
import Sidebar from "./Sidebar";
import { getStoryDetailURL } from "../../shared/generate-navigate-url";
import { AiOutlineLike } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa6";
import Meta from "antd/es/card/Meta";

interface IProps {}

const Header: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const account = useSelector((state: IRootState) => state.account?.user);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [followingStories, setFollowingStories] = useState<IStory[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  useEffect(() => {
    openDrawer && fetchStoriesFollowing();
  }, [openDrawer]);

  const fetchStoriesFollowing = async () => {
    const res = await getPaginationStoriesFollowing(1, 10);
    if (res && res.ec === 0) {
      setFollowingStories(res.dt.list);
    }
  };

  const popoverTitle = () => {
    return (
      <div className="d-flex align-items-center justify-content-between">
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
      toast.success(res.em);
      navigate("/");
    }
    setIsPopoverOpen(false);
  };

  return (
    <>
      <Affix>
        <div className="navbar header-container">
          <div className="container-fluid px-xl-5">
            <Row align={"middle"} justify={"space-between"} className="w-100">
              <Col xs={5} xl={4}>
                <Link className="logo-brand text-theme fs-2" to={"/"}>
                  The Genesis
                </Link>
              </Col>
              <Col xs={12} md={14}>
                <Row align={"middle"} justify={"space-between"}>
                  <Col xs={0} sm={15} lg={15}>
                    <GlobalSearch />
                  </Col>
                  {!isAuthenticated ? (
                    <Col
                      xs={24}
                      sm={7}
                      lg={5}
                      className="d-flex d-sm-block justify-content-end justify-content-sm-between"
                    >
                      <Button
                        type="primary"
                        onClick={() => navigate("/auth/login")}
                      >
                        Đăng nhập
                      </Button>
                    </Col>
                  ) : (
                    <>
                      <Col
                        xs={0}
                        className="d-md-block account-info text-theme"
                      >
                        <div>Xin chào {account.username ?? "friend"}</div>
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
                      <Col
                        xs={24}
                        sm={7}
                        md={0}
                        className="d-flex justify-content-end d-md-none"
                      >
                        <EPButton
                          type="primary"
                          icon={<IoIosMenu />}
                          onClick={() => setOpenSidebar(true)}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </Affix>
      <Sidebar
        open={openSidebar}
        setOpen={setOpenSidebar}
        tlt={account.tlt}
        handleLogout={handleLogout}
      />
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
        <div className="d-flex flex-wrap gap-3">
          {followingStories &&
            followingStories.length > 0 &&
            followingStories.map((item) => {
              return (
                <Badge.Ribbon
                  key={`card-story-${item.storyId}`}
                  text={item.storyPrice + " TLT"}
                  color="red"
                >
                  <Card
                    key={`following-story-${item.storyId}`}
                    hoverable
                    style={{ width: 180 }}
                    cover={<img alt={item.storyTitle} src={item.storyImage} />}
                    onClick={() =>
                      navigate(getStoryDetailURL(item.storyId, item.storyTitle))
                    }
                  >
                    <Meta
                      title={item.storyTitle}
                      description={
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center">
                            <AiOutlineLike />
                            <span>{item.storyInteraction?.like}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaRegHeart />
                            <span>{item.storyInteraction?.follow}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <GrView />
                            <span>{item.storyInteraction?.view}</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              );
            })}
        </div>
      </Drawer>
    </>
  );
};

export default Header;
