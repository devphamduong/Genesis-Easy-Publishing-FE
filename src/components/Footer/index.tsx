import { Col, Row } from "antd";

import { FC } from "react";
import "./Footer.scss";

interface IProps {}

const Footer: FC<IProps> = (props: IProps) => {
  return (
    <div className="footer-container text-start">
      <Row className="container gap-3">
        <Col span={24}>
          <Row justify={"space-between"}>
            <Col span={9}>
              <div className="description">
                Chào mừng bạn đến với{" "}
                <strong>
                  Chào mừng bạn đến với The Genesis - Thế Giới Truyện Tiên Hiệp
                  Huyền Ảo
                </strong>
                . The Genesis (hay gọi tắt "EP") là một nền tảng nội dung số
                trên internet, nơi thành viên có thể tự do xuất bản những nội
                dung tiếng Việt như: Tiểu thuyết, light novel, truyện ngắn hoặc
                thơ văn khác. Với những chức năng được cải tiến liên tục, The
                Genesis sẽ mang lại cho Genesis sẽ mang lại cho{" "}
                <strong>
                  Tác giả sáng tác truyện, Dịch giả đăng truyện và Người đọc
                  truyện online
                </strong>{" "}
                Genesis sẽ mang lại cho những trải nghiệm tuyệt vời nhất.
              </div>
            </Col>
            <Col span={4} className="text-center">
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
            </Col>
            <Col span={4} className="text-center">
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
            </Col>
            <Col span={4} className="text-center">
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
              <div>
                <span className="category">Truyện Huyền Nhuyễn</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <strong className="copy-right">
            The Genesis ©{new Date().getFullYear()}. Created by SWP490 G14.
          </strong>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
