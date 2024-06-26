import { FC } from "react";
import "./ListStories.scss";
import { Button, Col, List, Row, Tooltip, Typography } from "antd";
import { IStory } from "../../interfaces/story.interface";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { kFormatter } from "../../shared/function";
import EPBook3D from "../EP-UI/Book3D";
import {
  getAuthorDetailURL,
  getCategoryDetailURL,
  getStoryDetailURL,
} from "../../shared/generate-navigate-url";
const { Text } = Typography;

interface IProps {
  showDetailFirstStory?: boolean;
  showMore?: boolean;
  displayRank?: boolean;
  displayCategory?: boolean;
  displayRead?: boolean;
  displayChapter?: boolean;
  title: string;
  urlToNavigate?: string;
  stories: IStory[];
}

const ListStories: FC<IProps> = (props: IProps) => {
  const {
    showDetailFirstStory,
    title,
    stories,
    displayRank,
    displayCategory,
    urlToNavigate,
    displayRead,
    displayChapter,
    showMore,
  } = props;
  const navigate = useNavigate();

  const renderItemStory = (item: IStory, index: number) => {
    return (
      <Row className="w-100" align={"middle"} justify={"space-between"}>
        {displayRank === true && (
          <Col xl={3} xxl={2}>
            <div
              className={`rank ${index + 1 <= 3 ? `top top-${index + 1}` : ""}`}
            >
              <span>{index + 1}</span>
            </div>
          </Col>
        )}
        <Col span={19}>
          <div className="d-flex flex-column">
            <Text ellipsis={true} className="w-100">
              <span
                onClick={() =>
                  navigate(getStoryDetailURL(item.storyId, item.storyTitle))
                }
                className="name"
              >
                {item.storyTitle}
              </span>
            </Text>
            {displayCategory && (
              <span
                className="author"
                style={{ width: "fit-content" }}
                onClick={() =>
                  navigate(getAuthorDetailURL(item.storyAuthor.userId))
                }
              >
                {item.storyAuthor.userFullname}
              </span>
            )}
          </div>
        </Col>
        {displayCategory && (
          <Col span={5}>
            <div className="category text-end">
              {item.storyCategories[0].categoryName}
            </div>
          </Col>
        )}
        {displayRead && (
          <Col span={2}>
            <div className="read text-end">
              {kFormatter(item.storyInteraction?.read ?? NaN)}
            </div>
          </Col>
        )}
        {displayChapter && (
          <Col span={2}>
            <div className="chapters text-end">
              {kFormatter(item.storyChapterNumber)}
            </div>
          </Col>
        )}
      </Row>
    );
  };

  const renderItemWithDetailFirstStory = (item: IStory, index: number) => {
    return (
      <Row className="w-100" align={"top"} justify={"space-between"}>
        <Col xl={3} xxl={2}>
          <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
            <span>{index + 1}</span>
          </div>
        </Col>
        <Col span={15} className="d-flex flex-column">
          <strong
            onClick={() =>
              navigate(getStoryDetailURL(item.storyId, item.storyTitle))
            }
            className="name"
          >
            {item.storyTitle}
          </strong>
          <div className="chapters">
            {kFormatter(item.storyChapterNumber)} Chương
          </div>
          <div>
            <span
              className="author"
              onClick={() =>
                navigate(getAuthorDetailURL(item.storyAuthor.userId))
              }
            >
              {item.storyAuthor.userFullname}
            </span>
          </div>
          <div>
            <Button
              size={"small"}
              onClick={() =>
                navigate(
                  getCategoryDetailURL(
                    item.storyCategories[0]?.categoryId,
                    item.storyCategories[0]?.categoryName
                  )
                )
              }
            >
              {item.storyCategories[0]?.categoryName}
            </Button>
          </div>
        </Col>
        <Col span={5}>
          <div className="image-hover">
            <EPBook3D
              storyId={item.storyId}
              title={item.storyTitle}
              imgUrl={`${import.meta.env.VITE_BACKEND_URL}Assets/images/story/${
                item.storyImage
              }`}
              width={60}
              height={90}
            />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <div className="list-story-container">
      <List
        size="small"
        header={
          <div className="header d-flex justify-content-between align-items-center">
            <strong className="title">{title}</strong>
            {showMore && (
              <Tooltip title="Danh sách đầy đủ">
                <Link to={urlToNavigate!} className="d-none icon-go-to">
                  <FaArrowRightLong />
                </Link>
              </Tooltip>
            )}
          </div>
        }
        bordered
        dataSource={stories.slice(0, 10)}
        renderItem={(item, index) => (
          <List.Item
            key={`story-item-${item.storyId}-${item.storyTitle}`}
            className="story-item"
          >
            {showDetailFirstStory && index === 0
              ? renderItemWithDetailFirstStory(item, index)
              : renderItemStory(item, index)}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListStories;
