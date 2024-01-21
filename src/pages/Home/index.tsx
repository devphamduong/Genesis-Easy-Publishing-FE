import { Button, Card, Carousel, Col, List, Row } from "antd";
import { useState } from "react";
import "./Home.scss";

function HomePage() {
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
                categories.map((item) => {
                  return (
                    <Col span={12} key={item.name}>
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
            <div className="content-top-item-right text-center d-flex flex-column justify-content-evenly content-top-item">
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
            <List
              size="small"
              header={<strong>Truyện Mới Cập Nhật</strong>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Col>
          <Col span={19}>
            <Card size="small" title="Lựa Chọn Của Biên Tập Viên">
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
        <Row className="content-middle"></Row>
      </div>
    </div>
  );
}

export default HomePage;
