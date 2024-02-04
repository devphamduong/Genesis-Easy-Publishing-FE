import { FC, useState } from "react";
import "./DetailStory.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Rate,
  Row,
  Space,
  Tabs,
  TabsProps,
  Tag,
  Tooltip,
} from "antd";
import VerticalImageHover from "../../components/VerticalImageHover";
import EPTag from "../../components/EP/Tag";
import { kFormatter } from "../../shared/function";
import {
  CommentOutlined,
  HeartOutlined,
  LikeOutlined,
  ShareAltOutlined,
  StarOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import RowStory from "../../components/RowStory";
import { PiBook, PiBookThin } from "react-icons/pi";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { GiBlackBook, GiSelfLove } from "react-icons/gi";
import { LuBookCopy } from "react-icons/lu";
import { BiBook } from "react-icons/bi";
import EPModalReport from "../../components/EP/Modal/Report";

interface IProps {}

const DetailStory: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("introduce");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const itemTabs: TabsProps["items"] = [
    {
      key: "introduce",
      label: "Giới Thiệu",
      children: <></>,
    },
    {
      key: "chapter",
      label: "Chương",
      children: <></>,
    },
    {
      key: "comment",
      label: (
        <div className="d-flex align-items-center gap-1">
          <span>Bình Luận</span>
          <Badge count={1000} overflowCount={999} color="#4497f8"></Badge>
        </div>
      ),
      children: <></>,
    },
  ];

  const handleReadStory = () => {
    navigate(`/story/read/${id}/${slug}.chapter-1`);
  };

  return (
    <>
      <div className="detail-story-container">
        <div className="detail-story-content container py-3">
          <Row className="top mb-3">
            <Col span={21}>
              <Row gutter={[12, 10]}>
                <Col span={4}>
                  <VerticalImageHover
                    height={240}
                    imageUrl="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554086139l/19288043.jpg"
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
                      <Button
                        type="primary"
                        size="large"
                        onClick={() => handleReadStory()}
                      >
                        Đọc Từ Đầu
                      </Button>
                      <Button size="large">Mua Trọn Bộ</Button>
                      <Space.Compact block size="large">
                        <Tooltip title="Like">
                          <Button icon={<LikeOutlined />} />
                        </Tooltip>
                        <Tooltip title="Heart">
                          <Button icon={<HeartOutlined />} />
                        </Tooltip>
                        <Tooltip title="Report">
                          <Button
                            icon={<WarningOutlined />}
                            onClick={() => setIsModalOpen(true)}
                          />
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
          <div className="bottom">
            <Tabs defaultActiveKey={currentTab} type="card" items={itemTabs} />
            <Row gutter={[16, 10]}>
              <Col span={19}>
                <div>
                  Thám tử 'bình thường' Ôn Văn tự cảm thấy đầu óc mình có bệnh,
                  sau khi từ bệnh viện tâm thần tỉnh lại thì phát hiện tay phải
                  của mình liên kết với một không gian thần bí tên là 'Trạm Thu
                  Nhận Tai Ách', anh có thể bỏ quái vật mình bắt được vào không
                  gian này, đồng thời cũng có được năng lực của chúng! Bắt
                  vampire, có được cảm quan siêu mạnh và năng lực thôi miên; Bắt
                  oan hồn, có thể tàng hình và xuyên tường; Bắt hồ ly tinh, có
                  thể quyến rũ người khác giới; Bắt tinh tinh lông quăn, chỉ số
                  IQ lập tức logout... Vì thu hoạch được càng nhiều năng lực
                  mạnh hơn, Ôn Văn bắt đầu thử bắt quái vật, cũng vì thế mà bước
                  chân vào thế giới siêu năng kỳ ảo, thấy được hiện thực ẩn sau
                  tấm màn che giấu... ... PS: Linh cảm bộ truyện này tới từ thần
                  thoại Cthulhu và SCP Cơ Kim Hội, phong cách hài hước thú vị,
                  hoan nghênh mọi người ghé xem. Chúc bạn có những giây phút vui
                  vẻ khi đọc truyện Trạm Thu Nhận Tai Ách (Dịch)!
                </div>
              </Col>
              <Col
                span={5}
                className="author-info d-flex flex-column align-items-center gap-3 py-4"
              >
                <div>
                  <Avatar size={120} icon={<UserOutlined />} />
                </div>
                <strong>Huyễn Mộng Liệp Nhân</strong>
                <div>
                  <Space split={<Divider type="vertical" />}>
                    <div className="d-flex flex-column align-items-center gap-1">
                      <PiBook className="icon-info" />
                      <span className="text-small">3 Truyện</span>
                    </div>
                    <div className="d-flex flex-column align-items-center gap-1">
                      <BsReverseLayoutTextWindowReverse className="icon-info" />
                      <span className="text-small">{kFormatter(1999)} Chữ</span>
                    </div>
                    <div className="d-flex flex-column align-items-center gap-1">
                      <GiSelfLove className="icon-info" />
                      <span className="text-small">24 Yêu Thích</span>
                    </div>
                  </Space>
                </div>
                <Divider />
              </Col>
              <Col span={19}>
                <strong>Có Thể Bạn Cũng Muốn Đọc</strong>
                <Divider />
                <RowStory
                  story={{
                    storyId: 17,
                    storyTitle: "D\u1ECB Th\u1EBF T\u00E0 Qu\u00E2n",
                    storyImage:
                      "https://st.nhattruyento.com/data/comics/227/di-the-ta-quan.jpg",
                    storyDescription: "vcl",
                    storyCategories: [
                      {
                        categoryId: "1",
                        categoryName: "vcl",
                      },
                    ],
                    storyAuthor: {
                      userId: 1,
                      userFullname: "Duy Pham",
                    },
                    storyChapterNumber: 7,
                    read: 208,
                    userCount: 6,
                    userPurchaseChapter: 15,
                  }}
                />
                <RowStory
                  story={{
                    storyId: 17,
                    storyTitle: "D\u1ECB Th\u1EBF T\u00E0 Qu\u00E2n",
                    storyImage:
                      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1554086139l/19288043.jpg",
                    storyDescription: "vcl",
                    storyCategories: [
                      {
                        categoryId: "1",
                        categoryName: "vcl",
                      },
                    ],
                    storyAuthor: {
                      userId: 1,
                      userFullname: "Duy Pham",
                    },
                    storyChapterNumber: 7,
                    read: 208,
                    userCount: 6,
                    userPurchaseChapter: 15,
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <EPModalReport
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default DetailStory;
