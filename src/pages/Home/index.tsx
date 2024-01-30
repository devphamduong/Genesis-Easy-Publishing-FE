import { FC, useEffect } from "react";
import { Button, Card, Carousel, Col, List, Row, Typography } from "antd";
import { useState } from "react";
import "./Home.scss";
import { RiDoubleQuotesL } from "react-icons/ri";
import { kFormatter } from "../../shared/function";
import { ICategory } from "../../interfaces/category.interface";
import {
  getStoriesByCategory,
  getTop6Purchase,
  getTopFamous,
  getTopNewestStories,
  getTopReadStories,
} from "../../services/story-api.service";
import { IPaginationStory, IStory } from "../../interfaces/story.interface";
import ListStories from "../../components/ListStories";
import { useOutletContext } from "react-router-dom";
import VerticalImageHover from "../../components/VerticalImageHover";
const { Paragraph } = Typography;

const HomePage: FC = (props) => {
  const categories: ICategory[] = useOutletContext();
  const [stories, setStories] = useState<IStory[]>([]);
  const [famousStories, setFamousStories] = useState<IPaginationStory>();
  const [newestStories, setNewestStories] = useState<IPaginationStory>();
  const [topReadStories, setTopReadStories] = useState<IPaginationStory>();
  const [storiesByCategory, setStoriesByCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchTop6PurchaseStories();
    fetchTopFamous();
    fetchStoriesByCategory();
    fetchTopNewestStories();
    fetchTopReadStories();
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
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="home-container container py-3">
      <div className="home-content">
        <Row gutter={[16, 16]} className="content-top">
          <Col span={5} className="content-top-item">
            <Row
              justify={"start"}
              align={"middle"}
              className="content-top-item content-top-item-left py-2"
            >
              {categories &&
                categories?.slice(0, 14).map((item, index) => {
                  return (
                    <Col
                      span={12}
                      key={`cate-${item.categoryId}-${item.categoryName}`}
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
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col span={14} className="content-top-item content-top-item-middle">
            <Carousel autoplay className="content-top-item">
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
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
              <Button size="large" type="primary">
                Trung tâm xuất bản
              </Button>
              <i>(Cần đăng nhập để xem thông tin)</i>
            </div>
          </Col>
          <Col span={5}>
            <Row gutter={[16, 16]}>
              <Col className="w-100">
                <ListStories
                  displayCategory
                  title="Truyện Mới Cập Nhật"
                  stories={[...(newestStories?.listStories ?? [])]}
                />
              </Col>
              <Col className="w-100">
                <ListStories
                  displayRead
                  title="Sáng Tác Nhiều Người Đọc"
                  stories={[...(topReadStories?.listStories ?? [])]}
                />
              </Col>
            </Row>
          </Col>
          <Col span={19}>
            <Row gutter={[16, 16]}>
              <Col>
                <Card size="small" title="Lựa Chọn Của Biên Tập Viên">
                  <Row gutter={[30, 16]} className="story-container w-100">
                    {stories &&
                      stories?.map((item, index) => {
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
                                    <strong className="name-text">
                                      {item.storyTitle}
                                    </strong>
                                  </div>
                                  <div>
                                    <span className="author-text">
                                      {item.storyAuthor.userFullname}
                                    </span>
                                  </div>
                                  <div className="d-flex gap-1">
                                    <span className="chapters">
                                      {item.storyChapterNumber}
                                      <span className="text-small">
                                        {" "}
                                        Chương
                                      </span>
                                    </span>
                                    <span className="read">
                                      {item.read}
                                      <span className="text-small"> Đọc</span>
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
                      })}
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <ListStories
                  urlToNavigate="rank-stories"
                  showDetailFirstStory
                  displayRank
                  displayChapter
                  title="Kim Thánh Bảnh"
                  stories={[...(famousStories?.listStories ?? [])]}
                />
              </Col>
              <Col span={8}>
                <ListStories
                  urlToNavigate="rank-stories"
                  showDetailFirstStory
                  displayRank
                  displayChapter
                  title="Truyện Dịch Miễn Phí"
                  stories={[...(famousStories?.listStories ?? [])]}
                />
              </Col>
              <Col span={8}>
                <ListStories
                  urlToNavigate="rank-stories"
                  showDetailFirstStory
                  displayRank
                  displayChapter
                  title="Truyện Mới Trình Làng"
                  stories={[...(famousStories?.listStories ?? [])]}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className="premium-cover text-center p-3">PREMIUM MEMBER</div>
          </Col>
          {categories &&
            categories.length > 0 &&
            storiesByCategory.slice(0, 8)?.map((item, index) => {
              return (
                <Col span={6} key={`category-item-${item.categoryId}`}>
                  <ListStories
                    displayRank
                    displayRead
                    title={item.categoryName}
                    stories={[...(item?.stories ?? [])]}
                  />
                </Col>
              );
            })}
          <Col span={24}>
            <div className="premium-cover text-center p-3">
              HƯỚNG DẪN ĐĂNG TRUYỆN
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
