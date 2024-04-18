import { FC, useState } from "react";
import "./CommentItem.scss";
import { IComment } from "../../../interfaces/story.interface";
import { dayjsFrom } from "../../../shared/function";
import {
  Avatar,
  Button,
  Col,
  Flex,
  Form,
  List,
  Popconfirm,
  Popover,
  Row,
} from "antd";
import EPButton from "../../../components/EP-UI/Button";
import {
  MdDeleteOutline,
  MdOutlineModeEdit,
  MdOutlinedFlag,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

interface IProps {
  createComment?: boolean;
  comment?: IComment;
  handleComment: (content: string) => void;
  handleUpdateComment: (id: number, content: string, mode: string) => void;
}

const CommentItem: FC<IProps> = (props: IProps) => {
  const { createComment, comment, handleComment, handleUpdateComment } = props;
  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);
  const [isDisplayButtonComment, setIsDisplayButtonComment] =
    useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");

  const handleCommentAction = (
    option: "create" | "edit" | "delete",
    content: string,
    id: number
  ) => {
    if (option !== "delete" && content === "") {
      toast.error("Nội dung không được để trống!");
    } else {
      setCommentContent("");
      setIsDisplayButtonComment(false);
      switch (option) {
        case "create":
          handleComment(content);
          break;
        case "edit":
          setIsEditingComment(false);
          handleUpdateComment(id, content, "edit");
          break;
        case "delete":
          handleUpdateComment(id, "", "delete");
          break;
      }
    }
  };

  return (
    <div className="comment-item-container">
      <div className="comment-item-content">
        {createComment ? (
          <Flex gap={"small"} vertical className="create-comment">
            <Row>
              <Col xs={2} xl={1}>
                <Avatar icon={<UserOutlined />} />
              </Col>
              <Col xs={22} xl={23}>
                <TextArea
                  variant="filled"
                  placeholder="Bạn đang nghĩ gì?"
                  autoSize
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  onFocus={() => setIsDisplayButtonComment(true)}
                />
              </Col>
            </Row>
            {isDisplayButtonComment && (
              <Flex gap="small" justify="end">
                <Button
                  onClick={() => {
                    setCommentContent("");
                    setIsDisplayButtonComment(false);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    handleCommentAction("create", commentContent, 0)
                  }
                >
                  Bình luận
                </Button>
              </Flex>
            )}
          </Flex>
        ) : (
          comment && (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${
                      Math.random() * 11
                    }`}
                  />
                }
                title={
                  !isEditingComment ? (
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <strong>{comment.userComment.userFullname}</strong>
                        <span className="time text-small">
                          {dayjsFrom(comment.commentDate)}
                        </span>
                      </div>
                      <Popover
                        rootClassName="comment-item-actions"
                        content={
                          <div className="d-flex flex-column align-items-center gap-2">
                            {comment.commentWriter ? (
                              <>
                                <EPButton
                                  type="text"
                                  icon={<MdOutlineModeEdit className="fs-5" />}
                                  onClick={() => {
                                    setIsEditingComment(true);
                                    setCommentContent(comment.commentContent);
                                  }}
                                >
                                  Sửa
                                </EPButton>
                                <Popconfirm
                                  title="Xóa bình luận"
                                  description="Bạn có muốn xóa vĩnh viễn không?"
                                  okText="Xóa"
                                  cancelText="Hủy"
                                  onConfirm={() =>
                                    handleCommentAction(
                                      "delete",
                                      "",
                                      comment.commentId
                                    )
                                  }
                                >
                                  <EPButton
                                    type="text"
                                    icon={<MdDeleteOutline className="fs-5" />}
                                  >
                                    Xóa
                                  </EPButton>
                                </Popconfirm>
                              </>
                            ) : (
                              <EPButton
                                type="text"
                                icon={<MdOutlinedFlag className="fs-5" />}
                              >
                                Report
                              </EPButton>
                            )}
                          </div>
                        }
                        trigger={"click"}
                      >
                        <EPButton shape="circle" type="text">
                          <BsThreeDotsVertical />
                        </EPButton>
                      </Popover>
                    </div>
                  ) : (
                    comment.commentWriter && (
                      <Flex gap={"small"} vertical>
                        <Row>
                          <Col span={24}>
                            <TextArea
                              variant="filled"
                              placeholder="Bạn đang nghĩ gì?"
                              autoSize
                              value={commentContent}
                              onChange={(e) =>
                                setCommentContent(e.target.value)
                              }
                              onFocus={() => setIsDisplayButtonComment(true)}
                            />
                          </Col>
                        </Row>
                        {isDisplayButtonComment && (
                          <Flex gap="small" justify="end">
                            <Button
                              onClick={() => {
                                setCommentContent("");
                                setIsEditingComment(false);
                              }}
                            >
                              Hủy
                            </Button>
                            <Button
                              type="primary"
                              onClick={() =>
                                handleCommentAction(
                                  "edit",
                                  commentContent,
                                  comment.commentId
                                )
                              }
                            >
                              Lưu thay đổi
                            </Button>
                          </Flex>
                        )}
                      </Flex>
                    )
                  )
                }
                description={!isEditingComment && comment.commentContent}
              />
            </List.Item>
          )
        )}
      </div>
    </div>
  );
};

export default CommentItem;
