import { FC, useEffect, useState } from "react";
import "./DetailStory.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  List,
  Pagination,
  Row,
  Space,
  Table,
  TableProps,
  Tabs,
  TabsProps,
  Tooltip,
} from "antd";
import VerticalImageHover from "../../components/VerticalImageHover";
import EPTag from "../../components/EP-UI/Tag";
import { kFormatter } from "../../shared/function";
import {
  ClockCircleOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import RowStory from "../../components/RowStory";
import { PiBook } from "react-icons/pi";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { GiSelfLove } from "react-icons/gi";
import EPModalReport from "../../components/EP-UI/Modal/Report";
import {
  IAuthor,
  IChapter,
  IComment,
  IStory,
} from "../../interfaces/story.interface";
import {
  followStory,
  getPaginationChaptersByStoryId,
  getPaginationCommentsByStoryId,
  getRelatedStoriesById,
  getStoryDetailById,
  likeStory,
} from "../../services/story-api.service";
import { getAuthorById } from "../../services/author-api.service";
import { Typography } from "antd";
import {
  getStoryDetailURL,
  getStoryReadURL,
} from "../../shared/generate-navigate-url";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
dayjs.extend(relativeTime);

const { Paragraph, Text } = Typography;

interface IProps {}

enum ETabsName {
  DESCRIPTION = "Giới thiệu",
  CHAPTER = "Chương",
  COMMENT = "Bình luận",
}

enum ETabsKey {
  DESCRIPTION = "description",
  CHAPTER = "chapter",
  COMMENT = "comment",
}

enum EInteractionKey {
  LIKE = "like",
  FOLLOW = "follow",
}

const PAGE_SIZE_CHAPTER = 10;
const PAGE_SIZE_COMMENT = 10;

let PRICE: number = 0;
let SALE_PERCENT: number = 0;
let NEW_PRICE: number | string = 0;

const DetailStoryPage: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const navigate = useNavigate();
  const [story, setStory] = useState<IStory>();
  const [author, setAuthor] = useState<IAuthor>();
  const [relatedStories, setRelatedStories] = useState<IStory[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(ETabsKey.DESCRIPTION);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [currentPageChapter, setCurrentPageChapter] = useState<number>(1);
  const [totalChapter, setTotalChapter] = useState<number>(0);
  const [pageSizeChapter, setPageSizeChapter] =
    useState<number>(PAGE_SIZE_CHAPTER);
  const [comments, setComments] = useState<IComment[]>([]);
  const [currentPageComment, setCurrentPageComment] = useState<number>(1);
  const [totalComment, setTotalComment] = useState<number>(0);
  const [pageSizeComment, setPageSizeComment] =
    useState<number>(PAGE_SIZE_COMMENT);

  const itemTabs: TabsProps["items"] = [
    {
      key: ETabsKey.DESCRIPTION,
      label: ETabsName.DESCRIPTION,
      children: <>{}</>,
    },
    {
      key: ETabsKey.CHAPTER,
      label: ETabsName.CHAPTER,
      children: <>{}</>,
    },
    {
      key: ETabsKey.COMMENT,
      label: (
        <div className="d-flex align-items-center gap-1">
          <span>{ETabsName.COMMENT}</span>
          <Badge count={1000} overflowCount={999} color="#4497f8"></Badge>
        </div>
      ),
      children: <></>,
    },
  ];

  useEffect(() => {
    if (id) {
      fetchStoryById(id);
      fetchRelatedStoriesById(id);
      fetchAuthorById(id);
    }
  }, [id]);

  useEffect(() => {
    fetchPaginationChapters();
  }, [currentPageChapter, pageSizeChapter]);

  useEffect(() => {
    fetchPaginationComments();
  }, [currentPageComment, pageSizeComment]);

  const fetchStoryById = async (id: number | string) => {
    const res = await getStoryDetailById(id);
    if (res && res.ec === 0) {
      setStory(res.dt);
      PRICE = res.dt.storyPrice;
      SALE_PERCENT = res.dt.storySale;
      NEW_PRICE = (PRICE - (SALE_PERCENT / 100) * PRICE).toFixed(2);
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

  const fetchPaginationChapters = async () => {
    const res = await getPaginationChaptersByStoryId(
      id!,
      currentPageChapter,
      pageSizeChapter
    );
    if (res && res.ec === 0) {
      setChapters(res.dt.list);
      setTotalChapter(res.dt.total);
    }
  };

  const fetchPaginationComments = async () => {
    const res = await getPaginationCommentsByStoryId(
      id!,
      currentPageComment,
      pageSizeComment
    );
    if (res && res.ec === 0) {
      setComments(res.dt.list);
      setTotalComment(res.dt.total);
    }
  };

  const handleChangePageChapter = (
    page: number,
    pageSize: number,
    type: ETabsKey
  ) => {
    if (type === ETabsKey.CHAPTER) {
      setCurrentPageChapter(page);
    } else {
      setCurrentPageComment(page);
    }
  };

  const renderTableChapter = () => {
    const columns: TableProps["columns"] = [
      {
        title: "No.",
        dataIndex: "key",
        key: "key",
        render(value, record, index) {
          return (
            <span>
              {(currentPageChapter - 1) * pageSizeChapter + index + 1}
            </span>
          );
        },
      },
      {
        title: "Chương Số",
        dataIndex: "chapterNumber",
        key: "chapterNumber",
        render(chapterNumber, record: IChapter, index) {
          return (
            <Link to={getStoryReadURL(id!, slug!, record.chapterNumber)}>
              Chương số {chapterNumber}
            </Link>
          );
        },
      },
      {
        title: "Tựa Chương",
        dataIndex: "chapterTitle",
        key: "chapterTitle",
        render(chapterTitle, record: IChapter, index) {
          return (
            <Link to={getStoryReadURL(id!, slug!, record.chapterNumber)}>
              {chapterTitle}
            </Link>
          );
        },
      },
      {
        title: <ClockCircleOutlined />,
        key: "createTime",
        dataIndex: "createTime",
        render: (createTime) => (
          <>
            <span>{dayjs(createTime).fromNow()}</span>
          </>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={chapters}
        rowKey={(record) => record.chapterId}
        pagination={{
          responsive: true,
          current: currentPageChapter,
          total: totalChapter,
          pageSize: pageSizeChapter,
          showSizeChanger: false,
          onChange: (page: number, pageSize: number) =>
            handleChangePageChapter(page, pageSize, ETabsKey.CHAPTER),
        }}
      />
    );
  };

  const renderListComment = () => {
    return (
      <>
        <List
          dataSource={comments}
          renderItem={(item, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <div className="d-flex align-items-center justify-content-between">
                    <strong>{item.userComment.userFullname}</strong>
                    <span className="time text-small">
                      {dayjs(item.commentDate).fromNow()}
                    </span>
                  </div>
                }
                description={item.commentContent}
              />
            </List.Item>
          )}
        />
        <Pagination
          className="text-end"
          responsive
          current={currentPageComment}
          total={totalComment}
          pageSize={pageSizeComment}
          showSizeChanger={false}
          onChange={(page: number, pageSize: number) =>
            handleChangePageChapter(page, pageSize, ETabsKey.COMMENT)
          }
        />
      </>
    );
  };

  const handleReadStory = () => {
    navigate(getStoryReadURL(id!, slug!, 1));
  };

  const handleStoryInteraction = async (option: EInteractionKey) => {
    let res;
    if (option === EInteractionKey.LIKE) {
      res = await likeStory(id!);
    }
    if (option === EInteractionKey.FOLLOW) {
      res = await followStory(id!);
    }
    if (res && res.ec === 0) {
      option === EInteractionKey.LIKE
        ? setStory((prevState) => ({
            ...prevState!,
            userLike: !prevState!.userLike,
          }))
        : setStory((prevState) => ({
            ...prevState!,
            userFollow: !prevState!.userFollow,
          }));
    }
  };

  return (
    <>
      <div className="detail-story-container">
        <div className="detail-story-content container py-3">
          <Row align={"middle"} className="top mb-3">
            <Col span={12}>
              <Row gutter={[12, 10]}>
                <Col span={6}>
                  <VerticalImageHover
                    height={240}
                    imageUrl={story?.storyImage ?? ""}
                  ></VerticalImageHover>
                </Col>
                <Col
                  span={18}
                  className="d-flex flex-column justify-content-between"
                >
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
                      {!story?.userOwned && (
                        <Button size="large">Mua Trọn Bộ</Button>
                      )}
                      <Space.Compact block size="large">
                        {isAuthenticated ? (
                          <>
                            <Tooltip title="Like">
                              <Button
                                className="fs-5 d-flex align-items-center justify-content-center icon-like"
                                onClick={() =>
                                  handleStoryInteraction(EInteractionKey.LIKE)
                                }
                                icon={
                                  story?.userLike ? (
                                    <AiFillLike />
                                  ) : (
                                    <AiOutlineLike />
                                  )
                                }
                              />
                            </Tooltip>
                            <Tooltip title="Follow">
                              <Button
                                className="fs-5 d-flex align-items-center justify-content-center icon-follow"
                                onClick={() =>
                                  handleStoryInteraction(EInteractionKey.FOLLOW)
                                }
                                icon={
                                  story?.userFollow ? (
                                    <FaHeart />
                                  ) : (
                                    <FaRegHeart />
                                  )
                                }
                              />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Like">
                              <Button
                                className="fs-5 d-flex align-items-center justify-content-center icon-like"
                                icon={<AiOutlineLike />}
                              />
                            </Tooltip>
                            <Tooltip title="Follow">
                              <Button
                                className="fs-5 d-flex align-items-center justify-content-center icon-follow"
                                icon={<FaRegHeart />}
                              />
                            </Tooltip>
                          </>
                        )}
                        <Tooltip title="Report">
                          <Button
                            className="fs-5 d-flex align-items-center justify-content-center"
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
            <Col span={5} className="price">
              <table>
                <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <Text strong delete={story && story?.storySale < 0}>
                        {story?.storyPrice ?? 0}
                      </Text>
                    </td>
                  </tr>
                  {story && story?.storySale > 0 && (
                    <>
                      <tr>
                        <td>
                          <Text type="danger">Special!:</Text>
                        </td>
                        <td>
                          <Text type="danger">
                            <strong>{NEW_PRICE}</strong>
                          </Text>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Text>Bạn tiết kiệm được:</Text>
                        </td>
                        <td>
                          <p>
                            {(PRICE - (NEW_PRICE as number)).toFixed(2)} (
                            <strong>{story?.storySale}%</strong>)
                          </p>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <div></div>
              <div></div>
            </Col>
          </Row>
          <div className="bottom">
            <Tabs
              defaultActiveKey={currentTab}
              type="card"
              items={itemTabs}
              onChange={(key: string) => setCurrentTab(key)}
            />
            <Row gutter={[16, 10]}>
              <Col span={19}>
                {currentTab === ETabsKey.DESCRIPTION ? (
                  <div>{story?.storyDescription}</div>
                ) : currentTab === ETabsKey.CHAPTER ? (
                  renderTableChapter()
                ) : (
                  renderListComment()
                )}
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
                  <Link
                    className="link-hover"
                    to={
                      author
                        ? getStoryDetailURL(
                            author?.authorNewestStory.storyId,
                            author?.authorNewestStory.storyTitle
                          )
                        : ""
                    }
                  >
                    <h6>{author?.authorNewestStory.storyTitle}</h6>
                  </Link>
                  <Paragraph ellipsis={{ rows: 3 }}>
                    {author?.authorNewestStory.storyDescription}
                  </Paragraph>
                  <Button type="primary">Xem ngay</Button>
                </div>
              </Col>
              {story?.storyChapters && story.storyChapters.length > 0 && (
                <Col span={19}>
                  <Divider />
                  <div className="d-flex gap-5 ">
                    <strong>Mới Cập Nhật</strong>
                    <div className="d-flex flex-column gap-2 w-75">
                      {story?.storyChapters.map((item, index) => {
                        return (
                          <div
                            key={`newest-chapter-${item.chapterId}`}
                            className="d-flex align-items-center justify-content-between"
                          >
                            <Link
                              className="link-hover fs-6"
                              to={getStoryReadURL(
                                id!,
                                slug!,
                                item.chapterNumber
                              )}
                            >
                              <strong>Chương {item.chapterNumber}</strong>:{" "}
                              {item.chapterTitle}{" "}
                            </Link>
                            <span className="time">
                              {dayjs(item.createTime).fromNow()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <Divider />
                </Col>
              )}
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

export default DetailStoryPage;
