import { FC, useEffect } from "react";
import { Button, Card, Carousel, Col, List, Row, Typography } from "antd";
import { useState } from "react";
import "./Home.scss";
import { RiDoubleQuotesL } from "react-icons/ri";
import { kFormatter } from "../../shared/function";
import { getAllCategories } from "../../services/category-api.service";
import { ICategory } from "../../interfaces/category.interface";
import { getTop6Purchase } from "../../services/story-api.service";
import { IStory } from "../../interfaces/home/home.interface";
import ListStories from "../../components/ListStories";
const { Paragraph } = Typography;

const HomePage: FC = (props) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [books, setBooks] = useState<IStory[]>([]);
  const [threeCategories, setThreeCategories] = useState({
    top: {
      books: [
        {
          name: "Cẩu Tại Yêu Võ Loạn Thế Tu Tiên (Bản Dịch)",
          chapters: 1670,
          author: "Văn Sao Công",
        },
        {
          name: "Cẩu Tại Yêu Võ Loạn Thế Tu Tiên (Bản Dịch)",
          chapters: 1670,
          author: "Văn Sao Công",
        },
        {
          name: "Cẩu Tại Yêu Võ Loạn Thế Tu Tiên (Bản Dịch)",
          chapters: 1670,
          author: "Văn Sao Công",
        },
      ],
    },
    free: {
      books: [
        {
          name: "Khai Cuộc Nữ Đế Làm Chính Cung (Dịch)",
          chapters: 71,
          author: "Kình Bạo Tiểu Long Hà",
        },
        {
          name: "Khai Cuộc Nữ Đế Làm Chính Cung (Dịch)",
          chapters: 71,
          author: "Kình Bạo Tiểu Long Hà",
        },
        {
          name: "Khai Cuộc Nữ Đế Làm Chính Cung (Dịch)",
          chapters: 71,
          author: "Kình Bạo Tiểu Long Hà",
        },
      ],
    },
    new: {
      books: [
        {
          name: "Hổ Khen Tôi Vuốt Lông Giỏi",
          chapters: 522,
          author: "Huyền Tam Thiên",
        },
        {
          name: "Hổ Khen Tôi Vuốt Lông Giỏi",
          chapters: 522,
          author: "Huyền Tam Thiên",
        },
        {
          name: "Hổ Khen Tôi Vuốt Lông Giỏi",
          chapters: 522,
          author: "Huyền Tam Thiên",
        },
      ],
    },
  });

  useEffect(() => {
    fetchAllCategories();
    fetchTop6Purchase();
  }, []);

  const fetchAllCategories = async () => {
    const res = await getAllCategories();
    if (res && res.ec === 0) {
      setCategories(res.dt);
    }
  };

  const fetchTop6Purchase = async () => {
    const res = await getTop6Purchase();
    if (res && res.ec === 0) {
      setBooks(res.dt);
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
  const gridStyle: React.CSSProperties = {
    width: "50%",
    textAlign: "center",
    padding: 2,
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <Row gutter={[16, 16]} className="content-top">
          <Col span={5} className="content-top-item">
            <Row
              justify={"start"}
              align={"middle"}
              className="content-top-item content-top-item-left py-2"
            >
              {categories &&
                categories.map((item, index) => {
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
                            {kFormatter(item.stories.length)}
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
                  displayRankAndCategory
                  title="Truyện Mới Cập Nhật"
                  books={[...threeCategories.top.books]}
                />
              </Col>
              <Col className="w-100">
                <ListStories
                  displayRankAndCategory
                  title="Sáng Tác Nhiều Người Đọc"
                  books={[...threeCategories.top.books]}
                />
              </Col>
            </Row>
          </Col>
          <Col span={19}>
            <Row gutter={[16, 16]}>
              <Col>
                <Card size="small" title="Lựa Chọn Của Biên Tập Viên">
                  <Row gutter={[30, 30]} className="story-container">
                    {books &&
                      books.map((item, index) => {
                        return (
                          <Col
                            span={12}
                            className="d-flex story-item"
                            key={`story-${item.storyId}-${item.storyTitle}`}
                          >
                            <Row>
                              <Col span={4}>
                                <div className="image">
                                  <div
                                    className="image-hover"
                                    style={{
                                      backgroundImage: `url("${item.storyImage}")`,
                                    }}
                                  ></div>
                                </div>
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
                  showDetailFirstStory
                  title="Kim Thánh Bảnh"
                  books={[...threeCategories.top.books]}
                />
              </Col>
              <Col span={8}>
                <ListStories
                  showDetailFirstStory
                  title="Truyện Dịch Miễn Phí"
                  books={[...threeCategories.free.books]}
                />
              </Col>
              <Col span={8}>
                <ListStories
                  showDetailFirstStory
                  title="Truyện Mới Trình Làng"
                  books={[...threeCategories.new.books]}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div className="premium-cover text-center p-3">PREMIUM MEMBER</div>
          </Col>
          {categories &&
            categories.length > 0 &&
            categories.slice(0, 8).map((item, index) => {
              return (
                <Col span={6} key={`category-item-${item.categoryId}`}>
                  <ListStories
                    title={item.categoryName}
                    category={item.categoryName}
                    stories={[...item.stories]}
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
