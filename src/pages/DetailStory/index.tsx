import { FC } from "react";
import "./DetailStory.scss";
import { useParams } from "react-router-dom";
import { Button, Col, Divider, Rate, Row, Space, Tag, Tooltip } from "antd";
import VerticalImageHover from "../../components/VerticalImageHover";
import EPTag from "../../components/EP/Tag";
import { kFormatter } from "../../shared/function";
import {
  CommentOutlined,
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  StarOutlined,
} from "@ant-design/icons";

interface IProps {}

const DetailStory: FC<IProps> = (props: IProps) => {
  const { id } = useParams();

  return (
    <div className="detail-story-container">
      <div className="detail-story-content container py-3">
        <Row className="detail-story">
          <Col span={21}>
            <Row gutter={[12, 10]}>
              <Col span={4}>
                <VerticalImageHover
                  height={240}
                  imageUrl="https://st.nhattruyento.com/data/comics/227/di-the-ta-quan.jpg"
                ></VerticalImageHover>
              </Col>
              <Col className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column gap-2">
                  <div className="title">
                    <strong>Trạm Thu Nhận Tai Ách (Dịch)</strong>
                  </div>
                  <div className="author">Huyễn Mộng Liệp Nhân</div>
                  <div className="category">
                    <Space size={[0, 8]} wrap>
                      <EPTag
                        color="magenta"
                        shape="round"
                        size="large"
                        content="Dị năng"
                      ></EPTag>
                      <EPTag
                        color="red"
                        shape="round"
                        size="large"
                        content="Hoàn thành"
                      ></EPTag>
                      <EPTag
                        color="volcano"
                        shape="round"
                        size="large"
                        content="Free"
                      ></EPTag>
                      <EPTag
                        color="orange"
                        shape="round"
                        size="large"
                        content="VLXX"
                      ></EPTag>
                    </Space>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <Space split={<Divider type="vertical" />}>
                    <div>
                      {kFormatter(1159000)}{" "}
                      <span className="text-small"> Chương</span>
                    </div>
                    <div>
                      {kFormatter(1159000)}
                      <span className="text-small"> Lượt đọc</span>
                    </div>
                    <div>
                      {kFormatter(1159000)}
                      <span className="text-small"> Lượt thích</span>
                    </div>
                  </Space>
                  <Space>
                    <Button type="primary" size="large">
                      Đọc Từ Đầu
                    </Button>
                    <Button size="large">Mua Chương VIP</Button>
                    <Space.Compact block size="large">
                      <Tooltip title="Like">
                        <Button icon={<LikeOutlined />} />
                      </Tooltip>
                      <Tooltip title="Heart">
                        <Button icon={<HeartOutlined />} />
                      </Tooltip>
                      <Tooltip title="Share">
                        <Button icon={<ShareAltOutlined />} />
                      </Tooltip>
                    </Space.Compact>
                  </Space>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <Rate allowHalf defaultValue={2.5} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailStory;
