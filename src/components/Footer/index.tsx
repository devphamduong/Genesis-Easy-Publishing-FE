import { Col, Row } from "antd";

import { FC } from "react";
import "./Footer.scss";
import { ICategory } from "../../interfaces/category.interface";

interface IProps {
  categories: ICategory[];
}

const Footer: FC<IProps> = (props: IProps) => {
  const { categories } = props;

  return (
    <div className="footer-container text-start">
      <Row className="container gap-3">
        <Col span={24}>
          <Row gutter={[0, { md: 16 }]} justify={"space-between"}>
            <Col md={24} lg={9}>
              <div className="description">
                Chào mừng bạn đến với{" "}
                <strong>
                  The Genesis - Thế Giới Truyện Tiên Hiệp Huyền Ảo
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
            <Col xs={24} md={24} lg={13}>
              <Row gutter={[{ md: 16 }, 0]}>
                <Col xs={12} md={8} className="text-start">
                  {categories &&
                    categories.length > 0 &&
                    categories.slice(0, 8)?.map((item, index) => {
                      return (
                        <div key={`footer-category-${item.categoryId}`}>
                          <span className="category link-hover pointer">
                            Truyện {item.categoryName}
                          </span>
                        </div>
                      );
                    })}
                </Col>
                <Col xs={12} md={8} className="text-start">
                  {categories &&
                    categories.length > 0 &&
                    categories.slice(9, 17)?.map((item, index) => {
                      return (
                        <div key={`footer-category-${item.categoryId}`}>
                          <span className="category link-hover pointer">
                            Truyện {item.categoryName}
                          </span>
                        </div>
                      );
                    })}
                </Col>
                <Col xs={12} md={8} className="text-start">
                  {categories &&
                    categories.length > 0 &&
                    categories.slice(18, 25)?.map((item, index) => {
                      return (
                        <div key={`footer-category-${item.categoryId}`}>
                          <span className="category link-hover pointer">
                            Truyện {item.categoryName}
                          </span>
                        </div>
                      );
                    })}
                </Col>
              </Row>
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
