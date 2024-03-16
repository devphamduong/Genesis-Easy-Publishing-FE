import { FC, useEffect, useState } from "react";
import "./Author.scss";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IAuthor, IStory } from "../../interfaces/story.interface";
import {
  getAuthorDetailById,
  getAuthorStoriesById,
} from "../../services/author-api-service";
import { useNavigate, useSearchParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { getStoryDetailURL } from "../../shared/generate-navigate-url";

interface IProps {}

const AuthorPage: FC<IProps> = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const authorId = searchParams.get("authorId");
  const [author, setAuthor] = useState<IAuthor>();
  const [stories, setStories] = useState<IStory[]>([]);

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

  const fetchAuthorStories = async () => {
    const res = await getAuthorStoriesById(authorId!);
    if (res && res.ec === 0) {
      setStories(res.dt);
    }
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
      <div className="author-stories-content container">
        <p>Danh Sách Truyện Của Tác Giả {author?.authorName}</p>
        <div className="mt-3 d-flex gap-5 flex-wrap justify-content-evenly">
          {stories &&
            stories.length > 0 &&
            stories.map((item, index) => {
              return (
                <Card
                  key={`author-story-${item.storyId}`}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={item.storyTitle} src={item.storyImage} />}
                  onClick={() =>
                    navigate(getStoryDetailURL(item.storyId, item.storyTitle))
                  }
                >
                  <Meta
                    title={item.storyTitle}
                    description="www.instagram.com"
                  />
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
