import { FC } from "react";
import { Button, Card, Carousel, Col, List, Row } from "antd";
import { useState } from "react";
import "./Home.scss";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

const HomePage: FC = (props) => {
  const [categories, setCategories] = useState([
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
    { icon: "O", name: "Huyền", amount: 1234 },
  ]);
  const [books, setBooks] = useState([
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg",
      name: "Mạt Thế: Ta Có Kho Vật Tư Vô Hạn",
      author: "Hận Niên Thiếu Vô Tri",
      chapters: 1009,
      read: 76998,
      description:
        "Trần Lạc – Quân vương hư không dựa vào năng lực không ai bì kịp sống sót trong tận thế, khi mà nhân loại đã hoàn toàn diệt vong, thế giới chỉ còn lại quái vật. Hắn không còn ý niệm sống sót, quyết định tự đào hố chôn mình. Ai dè hắn vậy mà trọng sinh vào thời điểm một tháng trước tận thế, dị năng không gian của kiếp trước cũng đi theo hắn quay về quá khứ. Không nói nhiều, trước cứ trữ một tỷ vật tư rồi tính tiếp.",
    },
  ]);

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

  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <div className="home-container">
      <div className="home-content">
        <Row gutter={[16, 16]} className="content-top">
          <Col span={5} className="content-top-item">
            <Row
              justify={"center"}
              className="content-top-item content-top-item-left"
            >
              {categories &&
                categories.map((item, index) => {
                  return (
                    <Col span={12} key={`cate-${item.name}`}>
                      <div className="d-flex align-items-center px-2">
                        <div>{item.icon}</div>
                        <div>
                          <strong>{item.name}</strong>
                          <div>{item.amount}</div>
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
              <Col>
                <List
                  size="small"
                  header={<strong>Truyện Mới Cập Nhật</strong>}
                  bordered
                  dataSource={data}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
              <Col>
                <List
                  size="small"
                  header={<strong>Truyện Mới Cập Nhật</strong>}
                  bordered
                  dataSource={data}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Col>
          <Col span={19}>
            <Row gutter={[16, 16]}>
              <Col>
                <Card size="small" title="Lựa Chọn Của Biên Tập Viên">
                  <Row gutter={[30, 30]} className="book-container">
                    {books &&
                      books.map((item, index) => {
                        return (
                          <Col
                            span={12}
                            className="d-flex book-item gap-2"
                            key={`book-${item.name}`}
                          >
                            <div className="image">
                              <div
                                className="image-hover"
                                style={{
                                  backgroundImage: `url("${item.image}")`,
                                }}
                              ></div>
                            </div>
                            <div>
                              <div>
                                <strong className="name-text">
                                  {item.name}
                                </strong>
                              </div>
                              <div className="author-text">{item.author}</div>
                              <div className="d-flex gap-1">
                                <span className="chapters">
                                  {item.chapters}
                                  <span className="text-small"> Chương</span>
                                </span>
                                <span className="read">
                                  {item.read}
                                  <span className="text-small"> Đọc</span>
                                </span>
                              </div>
                              <div className="description">
                                <RiDoubleQuotesL />
                                <span>{item.description}</span>
                                <RiDoubleQuotesR />
                              </div>
                            </div>
                          </Col>
                        );
                      })}
                  </Row>
                </Card>
              </Col>
              <Col>
                <List
                  size="small"
                  header={<strong>Truyện Mới Cập Nhật</strong>}
                  bordered
                  dataSource={data}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="content-middle"></Row>
      </div>
    </div>
  );
};

export default HomePage;
