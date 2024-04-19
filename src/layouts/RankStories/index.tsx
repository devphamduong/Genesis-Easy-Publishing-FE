import { FC, useEffect, useState } from "react";
import { ERouteEndPointForUser } from "../../enums/route-end-point.enum";
import { Affix, Col, Menu, MenuProps, Row } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./RankStoriesLayout.scss";
import { ICategory } from "../../interfaces/category.interface";
import EPFilter from "../../components/EP-Common/Filter";
import EPCover from "../../components/EP-UI/Cover";
import { useBreakpoint } from "../../hooks/customHooks";

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
  getItem(
    <Link to={ERouteEndPointForUser.RANK_STORIES}>Bảng xếp hạng</Link>,
    ERouteEndPointForUser.RANK_STORIES,
    null
  ),
  { type: "divider" },

  getItem(
    <Link to={ERouteEndPointForUser.MOST_READ}>Truyện được đọc nhiều</Link>,
    ERouteEndPointForUser.MOST_READ,
    null
  ),
  // getItem(
  //   <Link to={ERouteEndPointForUser.MOST_VIP_STORIES_READ}>
  //     Truyện VIP nhiều người đọc
  //   </Link>,
  //   ERouteEndPointForUser.MOST_VIP_STORIES_READ,
  //   null
  // ),
  getItem(
    <Link to={ERouteEndPointForUser.STORIES_LATEST_BY_CHAPTER}>
      Truyện theo chương mới nhất
    </Link>,
    ERouteEndPointForUser.STORIES_LATEST_BY_CHAPTER,
    null
  ),
  // { type: "divider" },

  // getItem(
  //   <Link to={ERouteEndPointForUser.STORIES_WITH_MOST_FAN}>
  //     Truyện nhiều fan
  //   </Link>,
  //   ERouteEndPointForUser.STORIES_WITH_MOST_FAN,
  //   null
  // ),
];

interface IProps {
  categories: ICategory[];
}

const RankStoriesLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentParams, setCurrentParams] = useState<string>(
    ERouteEndPointForUser.RANK_STORIES
  );
  const breakpoint = useBreakpoint();

  useEffect(() => {
    setCurrentParams(location.pathname);
  }, [location.pathname]);

  const menuAndFilterTpl = () => {
    return (
      <>
        <Menu
          defaultSelectedKeys={[currentParams]}
          selectedKeys={[currentParams]}
          mode={
            breakpoint === "lg" || breakpoint === "xl" || breakpoint === "xxl"
              ? "inline"
              : "horizontal"
          }
          items={items}
        />
        <EPFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </>
    );
  };

  return (
    <div className="rank-stories-layout-container">
      <EPCover
        imgUrl="https://yystatic.codeprime.net/desktop/img/tables/table-bg-14.jpg"
        title="Kim Thánh Bảng"
        subTitle="Bảng Xếp Hạng Truyện Chữ Toàn Diện Của The Genesis"
        style={{
          backgroundPositionY: "bottom",
        }}
      />
      <div className="rank-stories-layout-content container py-3">
        <Row gutter={[16, 10]}>
          <Col xs={24} lg={5} className="left">
            {breakpoint === "xs" ||
            breakpoint === "sm" ||
            breakpoint === "md" ? (
              menuAndFilterTpl()
            ) : (
              <Affix offsetTop={70}>{menuAndFilterTpl()}</Affix>
            )}
          </Col>
          <Col xs={24} lg={19} className="right">
            <Outlet context={[searchTerm, setSearchTerm]} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RankStoriesLayout;
