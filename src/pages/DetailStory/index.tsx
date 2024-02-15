import { FC, useEffect, useState } from "react";
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
import EPTag from "../../components/EP-UI/Tag";
import { kFormatter } from "../../shared/function";
import {
  HeartOutlined,
  LikeOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import RowStory from "../../components/RowStory";
import { PiBook } from "react-icons/pi";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { GiSelfLove } from "react-icons/gi";
import EPModalReport from "../../components/EP-UI/Modal/Report";
import { IAuthor, IStory } from "../../interfaces/story.interface";
import {
  getRelatedStoriesById,
  getStoryDetailById,
} from "../../services/story-api.service";
import { getAuthorById } from "../../services/author-api.service";
import { Typography } from "antd";

const { Paragraph } = Typography;

interface IProps {}

const DetailStory: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<IStory>();
  const [author, setAuthor] = useState<IAuthor>();
  const [relatedStories, setRelatedStories] = useState<IStory[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("introduce");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      fetchStoryById(id);
      fetchRelatedStoriesById(id);
      fetchAuthorById(id);
    }
  }, [id]);

  const fetchStoryById = async (id: number | string) => {
    const res = await getStoryDetailById(id);
    if (res && res.ec === 0) {
      setStory(res.dt);
    }
  };

  const fetchAuthorById = async (id: number | string) => {
    const res = await getAuthorById(id);
    if (res && res.ec === 0) {
      setAuthor(res.dt);
    }
  };

  const fetchRelatedStoriesById = async (id: number | string) => {
    const res = await getRelatedStoriesById(id);
    if (res && res.ec === 0) {
      setRelatedStories(res.dt);
    }
  };

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
                    imageUrl={story?.storyImage ?? ""}
                  ></VerticalImageHover>
                </Col>
                <Col className="d-flex flex-column justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <div className="title">
                      <strong>{story?.storyTitle}</strong>
                    </div>
                    <span className="author">
                      {story?.storyAuthor.userFullname}
                    </span>
                    <div className="category">
                      <Space size={[0, 8]} wrap>
                        {story?.storyCategories &&
                          story.storyCategories.length > 0 &&
                          story.storyCategories.map((item, index) => {
                            return (
                              <EPTag
                                key={`category-${item.categoryId}`}
                                color="magenta"
                                shape="round"
                                size="large"
                                content={item.categoryName}
                              ></EPTag>
                            );
                          })}
                      </Space>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <Space split={<Divider type="vertical" />}>
                      <div>
                        {kFormatter(story?.storyChapterNumber ?? 0)}{" "}
                        <span className="text-small"> Chương</span>
                      </div>
                      <div>
                        {kFormatter(story?.storyInteraction?.read ?? 0)}
                        <span className="text-small"> Lượt đọc</span>
                      </div>
                      <div>
                        {kFormatter(story?.storyInteraction?.like ?? 0)}
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
                <div>{story?.storyDescription}</div>
              </Col>
              <Col
                span={5}
                className="author-info d-flex flex-column align-items-center gap-3 py-4 text-center"
              >
                <div>
                  <Avatar
                    size={120}
                    src={author?.authorImage}
                    icon={<UserOutlined />}
                  />
                </div>
                <strong>{author?.authorName}</strong>
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
                <div className="d-flex flex-column align-items-center gap-2">
                  <span>Tác phẩm mới nhất</span>
                  <VerticalImageHover
                    height={120}
                    width={80}
                    imageUrl={author?.authorNewestStory.storyImage ?? ""}
                  ></VerticalImageHover>
                  <h6>{author?.authorNewestStory.storyTitle}</h6>
                  <Paragraph ellipsis={{ rows: 3 }}>
                    {author?.authorNewestStory.storyDescription}
                  </Paragraph>
                  <Button type="primary">Xem ngay</Button>
                </div>
              </Col>
              <Col span={19}>
                <strong>Có Thể Bạn Cũng Muốn Đọc</strong>
                <Divider />
                {relatedStories &&
                  relatedStories.length > 0 &&
                  relatedStories.map((item, index) => {
                    return (
                      <RowStory
                        key={`related-story-${item.storyId}`}
                        story={item}
                      />
                    );
                  })}
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
