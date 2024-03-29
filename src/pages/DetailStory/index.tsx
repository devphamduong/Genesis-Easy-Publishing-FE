import { FC, useEffect, useState } from "react";
import "./DetailStory.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  App,
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Flex,
  Input,
  List,
  Pagination,
  Popconfirm,
  Popover,
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
import { dayjsFrom, kFormatter } from "../../shared/function";
import {
  ClockCircleOutlined,
  ExclamationCircleFilled,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import RowStory from "../../components/RowStory";
import { PiBook } from "react-icons/pi";
import {
  BsReverseLayoutTextWindowReverse,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { GiSelfLove } from "react-icons/gi";
import {
  IAuthor,
  IChapter,
  IComment,
  IStory,
} from "../../interfaces/story.interface";
import {
  commentStory,
  followStory,
  getPaginationChaptersByStoryId,
  getPaginationCommentsByStoryId,
  getRelatedStoriesById,
  getStoryDetailById,
  likeStory,
  updateComment,
} from "../../services/story-api-service";
import { getAuthorById } from "../../services/author-api-service";
import { Typography } from "antd";
import {
  getAuthorDetailURL,
  getStoryDetailURL,
  getStoryReadURL,
} from "../../shared/generate-navigate-url";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import EPModalReport from "../../components/EP-Common/Modal/Report";
import { FcVip } from "react-icons/fc";
import { buyStory } from "../../services/transaction-api-service";
import { updateAccountBalance } from "../../redux/account/accountSlice";
import { EUpdateBalanceAction } from "../../enums/transaction.enum";
import { IUpdateBalanceAction } from "../../interfaces/transaction.interface";
import {
  MdDeleteOutline,
  MdOutlineModeEdit,
  MdOutlinedFlag,
} from "react-icons/md";
import EPButton from "../../components/EP-UI/Button";
import CommentItem from "./CommentItem";
const { TextArea } = Input;

const { Paragraph, Text } = Typography;

interface IProps {}

enum ETabsLabel {
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
  const { modal } = App.useApp();
  const dispatch = useDispatch();
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
      label: ETabsLabel.DESCRIPTION,
      children: <>{}</>,
    },
    {
      key: ETabsKey.CHAPTER,
      label: ETabsLabel.CHAPTER,
      children: <>{}</>,
    },
    {
      key: ETabsKey.COMMENT,
      label: (
        <div className="d-flex align-items-center gap-1">
          <span>{ETabsLabel.COMMENT}</span>
          <Badge
            count={totalComment}
            overflowCount={999}
            color="#4497f8"
          ></Badge>
        </div>
      ),
      children: <></>,
    },
  ];

  useEffect(() => {
    if (id) {
      fetchStoryById();
      fetchRelatedStoriesById(id);
      fetchAuthorById(id);
    }
  }, [id]);

  useEffect(() => {
    currentTab === ETabsKey.CHAPTER && fetchPaginationChapters();
  }, [currentTab, currentPageChapter, pageSizeChapter]);

  useEffect(() => {
    currentTab === ETabsKey.COMMENT && fetchPaginationComments();
  }, [currentTab, currentPageComment, pageSizeComment]);

  const fetchStoryById = async () => {
    const res = await getStoryDetailById(id!);
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

  const renderDescription = (description: string) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      />
    );
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
            <Link
              to={getStoryReadURL(id!, slug!, record.chapterNumber)}
              className="d-flex gap-2 align-items-center"
            >
              {record.chapterPrice > 0 && <FcVip className="fs-5" />}
              <span>Chương số {chapterNumber}</span>
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
            <span className="time">{dayjsFrom(createTime)}</span>
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

  const handleComment = async (content: string) => {
    if (id) {
      const res = await commentStory({
        storyId: id,
        commentContent: content,
      });
      if (res && res.ec === 0) {
        fetchPaginationComments();
      } else {
        toast.error(res.em);
      }
    }
  };

  const handleUpdateComment = async (
    id: number,
    content: string,
    mode: string
  ) => {
    const res = await updateComment(id, {
      commentContent: mode === "edit" ? content : "",
    });
    if (res && res.ec === 0) {
      fetchPaginationComments();
    } else {
      toast.error(res.em);
    }
  };

  const renderListComment = () => {
    return (
      <>
        <CommentItem
          createComment
          handleComment={handleComment}
          handleUpdateComment={handleUpdateComment}
        />
        <List
          className="mt-3"
          dataSource={comments}
          renderItem={(item, index) => (
            <CommentItem
              key={index}
              comment={item}
              handleComment={handleComment}
              handleUpdateComment={handleUpdateComment}
            />
          )}
        />
        {comments.length > 0 && (
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
        )}
      </>
    );
  };

  const handleReadStory = () => {
    if (!isAuthenticated) {
      toast.error("Hãy đăng nhập để dùng chức năng này");
      return;
    }
    navigate(getStoryReadURL(id!, slug!, 1));
  };

  const handleStoryInteraction = async (option: EInteractionKey) => {
    let res;
    switch (option) {
      case EInteractionKey.LIKE:
        res = await likeStory(id!);
        break;
      case EInteractionKey.FOLLOW:
        res = await followStory(id!);
        break;
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
    } else {
      toast.error(res.em);
    }
  };

  const showConfirmBuyStory = async (
    storyId: number | string,
    price: number
  ) => {
    modal.confirm({
      title: (
        <span>
          Mua trọn bộ <strong>{price}</strong> TLT
        </span>
      ),
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc không?",
      okText: "Mua",
      cancelText: "Bỏ qua",
      onOk() {
        handleBuyStory(storyId, price);
      },
      onCancel() {},
    });
  };

  const handleBuyStory = async (id: number | string, price: number) => {
    const res = await buyStory(id);
    if (res && res.ec === 0) {
      toast.success(res.em);
      fetchStoryById();
      dispatch(
        updateAccountBalance({
          updateAction: EUpdateBalanceAction.BUY,
          amount: price,
        } as IUpdateBalanceAction)
      );
    } else {
      toast.error(res.em);
    }
  };

  return (
    <>
      <div className="detail-story-container">
        <div className="detail-story-content container py-3">
          {/* <Badge.Ribbon text="Hippies" color="cyan"> */}
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
                    <span
                      className="author"
                      onClick={() =>
                        navigate(getAuthorDetailURL(story?.storyAuthor.userId))
                      }
                    >
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
                      {((!story?.userOwned && !story?.authorOwned) ||
                        !isAuthenticated) && (
                        <Button
                          size="large"
                          onClick={() =>
                            showConfirmBuyStory(
                              story!.storyId,
                              NEW_PRICE as number
                            )
                          }
                        >
                          Mua Trọn Bộ
                        </Button>
                      )}
                      <Space.Compact block size="large">
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
                                story?.userFollow ? <FaHeart /> : <FaRegHeart />
                              }
                            />
                          </Tooltip>
                        </>
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
          {/* </Badge.Ribbon> */}
          <div className="bottom">
            <Tabs
              defaultActiveKey={currentTab}
              type="card"
              items={itemTabs}
              onChange={(key: string) => setCurrentTab(key)}
            />
            <Row gutter={[16, 10]}>
              <Col span={19}>
                {currentTab === ETabsKey.DESCRIPTION
                  ? renderDescription(story?.storyDescription ?? "")
                  : currentTab === ETabsKey.CHAPTER
                  ? renderTableChapter()
                  : renderListComment()}
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
                              {dayjsFrom(item.createTime)}
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
        storyId={story?.storyId}
      />
    </>
  );
};

export default DetailStoryPage;
