import { FC } from "react";
import "./RowStory.scss";
import VerticalImageHover from "../VerticalImageHover";
import { IStory } from "../../interfaces/story.interface";
import { Button, Col, Divider, Row, Skeleton, Typography } from "antd";
import { FaPenFancy } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";

import {
  getAuthorDetailURL,
  getStoryDetailURL,
} from "../../shared/generate-navigate-url";
import { dayjsFrom } from "../../shared/function";
const { Text } = Typography;

interface IProps {
  story: IStory;
  rank?: number;
  size?: "small" | "default";
  imgWidth?: number;
  imgHight?: number;
  displayUpdatedAt?: boolean;
}

const RowStory: FC<IProps> = (props: IProps) => {
  const { story, rank, imgWidth, imgHight, size, displayUpdatedAt } = props;
  const navigate = useNavigate();

  const renderRowDefault = () => {
    return (
      <Row gutter={[16, 16]}>
        <Col span={2}>
          <VerticalImageHover
            rank={rank}
            imageUrl={story.storyImage}
            width={imgWidth ?? 80}
            height={imgHight ?? 120}
          />
        </Col>
        <Col span={19} className="d-flex flex-column justify-content-between">
          <Link
            className="link-hover name"
            to={getStoryDetailURL(story.storyId, story.storyTitle)}
          >
            <strong>{story.storyTitle}</strong>
          </Link>
          <Text ellipsis={true} className="description">
            <span>{story.storyDescription}</span>
          </Text>
          <div
            className="d-flex align-items-center gap-1 author"
            onClick={() =>
              navigate(getAuthorDetailURL(story.storyAuthor.userId))
            }
          >
            <FaPenFancy />
            <strong>{story.storyAuthor.userFullname}</strong>
          </div>
          <Button size="small" className="category">
            {story.storyCategories[0]?.categoryName}
          </Button>
        </Col>
        <Col span={3}>
          <div className="chapters text-center py-1">
            {story.storyChapterNumber} Chương
          </div>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
    );
  };

  const renderRowSmall = () => {
    return (
      <Row gutter={[50, 16]}>
        <Col span={4}>
          <VerticalImageHover
            rank={rank}
            imageUrl={story.storyImage}
            width={imgWidth ?? 80}
            height={imgHight ?? 120}
          />
        </Col>
        <Col span={20} className="d-flex flex-column justify-content-between">
          <Link
            className="link-hover name"
            to={getStoryDetailURL(story.storyId, story.storyTitle)}
          >
            <strong>{story.storyTitle}</strong>
          </Link>
          <Text ellipsis={true} className="description">
            <span>{story.storyDescription}</span>
          </Text>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="d-flex align-items-center justify-content-between gap-1 author-chapters"
              onClick={() =>
                navigate(getAuthorDetailURL(story.storyAuthor.userId))
              }
            >
              <FaPenFancy />
              <strong>{story.storyAuthor.userFullname}</strong>
            </div>
            <div className={`chapters chapters-small text-center px-1 py-1`}>
              {story.storyChapterNumber} Chương
            </div>
          </div>
          {displayUpdatedAt && (
            <div className="time">
              <ClockCircleOutlined />
              <span> {dayjsFrom(story.storyCreateTime)}</span>
            </div>
          )}
        </Col>
      </Row>
    );
  };

  return (
    <div className="row-story-container">
      <div className="row-story-content">
        {!size || size === "default" ? renderRowDefault() : renderRowSmall()}
      </div>
    </div>
  );
};

export default RowStory;
