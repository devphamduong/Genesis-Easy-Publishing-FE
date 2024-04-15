import { FC, useEffect } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Drawer,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useState } from "react";
import "./Home.scss";
import { RiDoubleQuotesL } from "react-icons/ri";
import { kFormatter } from "../../shared/function";
import { ICategory } from "../../interfaces/category.interface";
import {
  getStoriesByCategory,
  getTop6Purchase,
  getTopFamous,
  getTopLatestByChapter,
  getTopNewestStories,
  getTopReadStories,
} from "../../services/story-api-service";
import { IPaginationStory, IStory } from "../../interfaces/story.interface";
import ListStories from "../../components/ListStories";
import { useNavigate, useOutletContext } from "react-router-dom";
import VerticalImageHover from "../../components/VerticalImageHover";
import {
  getAuthorDetailURL,
  getCategoryDetailURL,
  getStoryDetailURL,
} from "../../shared/generate-navigate-url";
import ListStoriesSkeleton from "../../components/ListStories/ListStoriesSkeleton";
import Loading from "../../components/Loading";
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../enums/route-end-point.enum";
const { Paragraph } = Typography;
import slide1 from "../../assets/css/images/slide1.png";
import slide2 from "../../assets/css/images/slide2.png";
import slide3 from "../../assets/css/images/slide3.png";

const HomePage: FC = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const categories: ICategory[] = useOutletContext();
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [famousStories, setFamousStories] = useState<IPaginationStory>();
  const [newestStories, setNewestStories] = useState<IPaginationStory>();
  const [topReadStories, setTopReadStories] = useState<IPaginationStory>();
  const [latestByChapter, setLatestByChapter] = useState<IPaginationStory>();
  const [storiesByCategory, setStoriesByCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchTop6PurchaseStories();
    fetchTopFamous();
    fetchStoriesByCategory();
    fetchTopNewestStories();
    fetchTopReadStories();
    fetchStoriesLatestByChapter();
  }, []);

  const fetchTop6PurchaseStories = async () => {
    const res = await getTop6Purchase();
    if (res && res.ec === 0) {
      setStories(res.dt);
    }
  };

  const fetchTopFamous = async () => {
    const res = await getTopFamous();
    if (res && res.ec === 0) {
      setFamousStories(res.dt);
    }
  };

  const fetchStoriesLatestByChapter = async () => {
    const res = await getTopLatestByChapter();
    if (res && res.ec === 0) {
      setLatestByChapter(res.dt);
    }
  };

  const fetchStoriesByCategory = async () => {
    const res = await getStoriesByCategory();
    if (res && res.ec === 0) {
      setStoriesByCategory(res.dt);
    }
  };

  const fetchTopNewestStories = async () => {
    const res = await getTopNewestStories();
    if (res && res.ec === 0) {
      setNewestStories(res.dt);
    }
  };

  const fetchTopReadStories = async () => {
    const res = await getTopReadStories();
    if (res && res.ec === 0) {
      setTopReadStories(res.dt);
    }
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "300px",
    lineHeight: "160px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <>
      <div className="home-container container py-3">
        <div className="home-content">
          <Row gutter={[16, 16]} className="content-top">
            <Col span={5} className="content-top-item">
              <Row
                justify={"start"}
                align={"middle"}
                className="content-top-item rounded-3 content-top-item-left py-2 position-relative"
              >
                {categories && categories.length > 0 ? (
                  categories?.slice(0, 14).map((item, index) => {
                    return (
                      <Col
                        span={12}
                        key={`cate-${item.categoryId}-${item.categoryName}`}
                        onClick={() =>
                          navigate(
                            getCategoryDetailURL(
                              item.categoryId,
                              item.categoryName
                            )
                          )
                        }
                      >
                        <div className="d-flex align-items-center px-2 category gap-2">
                          <div className="icon">{item.icon ?? "O"}</div>
                          <div>
                            <strong className="name">
                              {item.categoryName}
                            </strong>
                            <div className="amount">
                              {kFormatter(item.storiesNumber!)}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <Col span={24} className="d-flex justify-content-center">
                    <Loading />
                  </Col>
                )}
                <div className="more-icon position-absolute bottom-0 end-0">
                  <PiDotsThreeCircleLight
                    className="pointer"
                    onClick={() => setIsOpenDrawer(true)}
                  />
                </div>
              </Row>
            </Col>
            <Col span={14} className="content-top-item content-top-item-middle">
              <Carousel autoplay className="content-top-item">
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${slide1})`,
                      ...contentStyle,
                    }}
                  ></div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${slide2})`,
                      ...contentStyle,
                    }}
                  ></div>
                </div>
                <div>
                  <div
                    style={{
                      backgroundImage: `url(${slide3})`,
                      ...contentStyle,
                    }}
                  ></div>
                </div>
              </Carousel>
            </Col>
            <Col span={5}>
              <div className="content-top-item-right text-center d-flex flex-column justify-content-evenly content-top-item px-3 py-2">
                <h4>Bạn muốn đăng truyện lên The Genesis?</h4>
                <div>
                  Chúng tôi sẵn sàng hỗ trợ bạn bất cứ lúc nào. Hãy nhấn vào lựa
                  chọn bên dưới.
                </div>
                <Button size="large" type="primary">
                  Hướng dẫn đăng truyện
                </Button>
                <Button
                  size="large"
                  type="primary"
                  onClick={() =>
                    navigate(ERouteEndPointForAuthor.POSTED_STORIES)
                  }
                >
                  Trung tâm xuất bản
                </Button>
                {!isAuthenticated && <i>(Cần đăng nhập để xem thông tin)</i>}
              </div>
            </Col>
            <Col span={5}>
              <Row gutter={[16, 16]}>
                <Col className="w-100">
                  {newestStories?.list && newestStories?.list?.length > 0 ? (
                    <ListStories
                      displayCategory
                      title="Truyện Mới Cập Nhật"
                      stories={[...(newestStories?.list ?? [])]}
                    />
                  ) : (
                    <ListStoriesSkeleton />
                  )}
                </Col>
                <Col className="w-100">
                  {topReadStories?.list && topReadStories?.list?.length > 0 ? (
                    <ListStories
                      displayRead
                      title="Sáng Tác Nhiều Người Đọc"
                      stories={[...(topReadStories?.list ?? [])]}
                    />
                  ) : (
                    <ListStoriesSkeleton />
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={19}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card size="small" title="Lựa Chọn Của Biên Tập Viên">
                    <Row gutter={[30, 16]} className="story-container w-100">
                      {stories && stories.length > 0
                        ? stories?.map((item, index) => {
                            return (
                              <Col
                                span={12}
                                className="d-flex story-item"
                                key={`story-${item.storyId}-${item.storyTitle}`}
                              >
                                <Row>
                                  <Col span={4}>
                                    <VerticalImageHover
                                      imageUrl={item.storyImage}
                                    />
                                  </Col>
                                  <Col span={20}>
                                    <div className="px-2">
                                      <div>
                                        <strong
                                          className="name-text"
                                          onClick={() =>
                                            navigate(
                                              getStoryDetailURL(
                                                item.storyId,
                                                item.storyTitle
                                              )
                                            )
                                          }
                                        >
                                          {item.storyTitle}
                                        </strong>
                                      </div>
                                      <div>
                                        <span
                                          className="author-text"
                                          onClick={() =>
                                            navigate(
                                              getAuthorDetailURL(
                                                item.storyAuthor.userId
                                              )
                                            )
                                          }
                                        >
                                          {item.storyAuthor.userFullname}
                                        </span>
                                      </div>
                                      <div className="d-flex gap-1">
                                        <span className="chapters">
                                          {kFormatter(item.storyChapterNumber)}
                                          <span className="text-small">
                                            {" "}
                                            Chương
                                          </span>
                                        </span>
                                        <span className="read">
                                          {item.storyInteraction?.read}
                                          <span className="text-small">
                                            {" "}
                                            Đọc
                                          </span>
                                        </span>
                                      </div>
                                      <div className="description">
                                        <Paragraph ellipsis={{ rows: 8 }}>
                                          <RiDoubleQuotesL />{" "}
                                          <span>{item.storyDescription}</span>
                                        </Paragraph>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            );
                          })
                        : Array.from({ length: 4 }).map((item, index) => {
                            return (
                              <Col span={12} className="d-flex" key={index}>
                                <Row className="w-100">
                                  <Col span={4}>
                                    <Skeleton.Image
                                      active
                                      style={{
                                        width: 80,
                                        height: 120,
                                      }}
                                    />
                                  </Col>
                                  <Col span={20}>
                                    <div className="px-2">
                                      <Skeleton
                                        paragraph={{ rows: 6 }}
                                        active
                                      />
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            );
                          })}
                    </Row>
                  </Card>
                </Col>
                <Col span={8}>
                  {famousStories?.list && famousStories?.list?.length > 0 ? (
                    <ListStories
                      urlToNavigate={ERouteEndPointForUser.RANK_STORIES}
                      showDetailFirstStory
                      displayRank
                      displayChapter
                      title="Kim Thánh Bảng"
                      stories={[...(famousStories?.list ?? [])]}
                    />
                  ) : (
                    <ListStoriesSkeleton />
                  )}
                </Col>
                <Col span={8}>
                  {famousStories?.list && famousStories?.list?.length > 0 ? (
                    <ListStories
                      urlToNavigate={ERouteEndPointForUser.MOST_READ_IN_WEEK}
                      showDetailFirstStory
                      displayRank
                      displayChapter
                      title="Đọc nhiều trong tuần"
                      stories={[...(topReadStories?.list ?? [])]}
                    />
                  ) : (
                    <ListStoriesSkeleton />
                  )}
                </Col>
                <Col span={8}>
                  {famousStories?.list && famousStories?.list?.length > 0 ? (
                    <ListStories
                      urlToNavigate={
                        ERouteEndPointForUser.STORIES_LATEST_BY_CHAPTER
                      }
                      showDetailFirstStory
                      displayRank
                      displayChapter
                      title="Truyện theo chương mới nhất"
                      stories={[...(latestByChapter?.list ?? [])]}
                    />
                  ) : (
                    <ListStoriesSkeleton />
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div className="premium-cover text-center p-3">
                PREMIUM MEMBER
              </div>
            </Col>
            {storiesByCategory && storiesByCategory.length > 0
              ? storiesByCategory.slice(0, 8)?.map((item, index) => {
                  return (
                    <Col span={6} key={`category-item-${item.categoryId}`}>
                      <ListStories
                        displayRank
                        displayRead
                        urlToNavigate={getCategoryDetailURL(
                          item.categoryId,
                          item.categoryName
                        )}
                        title={item.categoryName}
                        stories={[...(item?.stories ?? [])]}
                      />
                    </Col>
                  );
                })
              : Array.from({ length: 4 }).map((item, index) => (
                  <Col span={6} key={index}>
                    <ListStoriesSkeleton />
                  </Col>
                ))}
            <Col span={24}>
              <div className="premium-cover text-center p-3">
                HƯỚNG DẪN ĐĂNG TRUYỆN
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Drawer
        className="drawer-category-full"
        title={null}
        placement={"top"}
        closable={false}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        key={"top"}
      >
        <Card>
          {categories.map((item) => {
            return (
              <Card.Grid
                key={`category-full-${item.categoryId}`}
                className="pointer"
                style={{ width: "16.6666667%", padding: 10 }}
                onClick={() =>
                  navigate(
                    getCategoryDetailURL(item.categoryId, item.categoryName)
                  )
                }
              >
                <div className="d-flex align-items-center px-2 category gap-2">
                  <div className="icon">{item.icon ?? "O"}</div>
                  <div>
                    <strong className="name">{item.categoryName}</strong>
                    <div className="amount">
                      {kFormatter(item.storiesNumber!)}
                    </div>
                  </div>
                </div>
              </Card.Grid>
            );
          })}
        </Card>
      </Drawer>
    </>
  );
};

export default HomePage;
