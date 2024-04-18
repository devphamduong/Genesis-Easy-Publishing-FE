import { FC, useEffect, useState } from "react";
import "./Author.scss";
import { Avatar, Badge, Card, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IAuthor, IStory } from "../../interfaces/story.interface";
import {
  getAuthorDetailById,
  getAuthorStoriesById,
} from "../../services/author-api-service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { getStoryDetailURL } from "../../shared/generate-navigate-url";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { useBreakpoint } from "../../hooks/customHooks";

interface IProps {}

const AuthorPage: FC<IProps> = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorId = searchParams.get("authorId");
  const [author, setAuthor] = useState<IAuthor>();
  const [stories, setStories] = useState<IStory[]>([]);
  const breakpoint = useBreakpoint();

  const tabs = [
    {
      label: `Truyện đã viết`,
      key: "written",
      children: <></>,
    },
    {
      label: `Truyện nổi bật`,
      key: "top_famous",
      children: <></>,
    },
    {
      label: `Truyện nhiều lượt mua`,
      key: "top_purchase",
      children: <></>,
    },
    {
      label: `Truyện mới nhất`,
      key: "top_newest_by_chapter",
      children: <></>,
    },
  ];

  useEffect(() => {
    if (authorId) {
      fetchAuthorDetail();
      fetchAuthorStories();
    }
  }, [authorId]);

  const fetchAuthorDetail = async () => {
    const res = await getAuthorDetailById(authorId!);
    if (res && res.ec === 0) {
      setAuthor(res.dt);
    }
  };

  const fetchAuthorStories = async (status: string = "written") => {
    const res = await getAuthorStoriesById(authorId!, status);
    if (res && res.ec === 0) {
      setStories(res.dt);
    }
  };

  const handleChangeTab = (status) => {
    fetchAuthorStories(status);
  };

  return (
    <div className="author-container py-3">
      <div className="author-content container mb-3">
        <div className="top d-flex align-items-center gap-2 mb-3">
          <div className="avatar">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={author?.authorImage}
            />
          </div>
          <div className="name">
            <span>Tác giả: </span> <strong>{author?.authorName}</strong>
          </div>
        </div>
        <div className="bottom">
          <Card
            size="small"
            title={`Giới thiệu về tác giả ${author?.authorName}`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: author?.authorDescriptionHtml ?? "",
              }}
            />
          </Card>
        </div>
      </div>
      <div className="author-stories-content container d-sm-flex">
        <Tabs
          tabPosition={breakpoint === "xs" ? "top" : "left"}
          items={tabs}
          onChange={(e) => handleChangeTab(e)}
        />
        <div className="d-flex gap-5 flex-wrap">
          {stories &&
            stories.length > 0 &&
            stories.map((item, index) => {
              return (
                <Badge.Ribbon text={item.storyPrice + " TLT"} color="red">
                  <Card
                    key={`author-story-${item.storyId}`}
                    hoverable
                    style={{ width: 180 }}
                    cover={<img alt={item.storyTitle} src={item.storyImage} />}
                    onClick={() =>
                      navigate(getStoryDetailURL(item.storyId, item.storyTitle))
                    }
                  >
                    <Meta
                      title={item.storyTitle}
                      description={
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="d-flex align-items-center">
                            <AiOutlineLike />
                            <span>{item.storyInteraction?.like}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <FaRegHeart />
                            <span>{item.storyInteraction?.follow}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <GrView />
                            <span>{item.storyInteraction?.view}</span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Badge.Ribbon>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
