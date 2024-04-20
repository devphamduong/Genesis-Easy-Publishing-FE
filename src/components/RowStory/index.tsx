import { FC } from "react";
import "./RowStory.scss";
import VerticalImageHover from "../VerticalImageHover";
import { IStory } from "../../interfaces/story.interface";
import { Button, Col, Divider, Row, Typography } from "antd";
import { FaPenFancy } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";

import {
  getAuthorDetailURL,
  getCategoryDetailURL,
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
      <Row
        gutter={[{ sm: 50, md: 0, lg: 80, xl: 90, xxl: 16 }, 16]}
        className="row-default"
      >
        <Col xs={4} sm={4} md={3} lg={2}>
          <VerticalImageHover
            rank={rank}
            imageUrl={story.storyImage}
            width={imgWidth ?? 80}
            height={imgHight ?? 120}
          />
        </Col>
        <Col
          xs={19}
          sm={19}
          md={14}
          lg={15}
          xl={16}
          className="d-flex flex-column justify-content-between"
        >
          <Link
            className="link-hover name"
            to={getStoryDetailURL(story.storyId, story.storyTitle)}
          >
            <strong>{story.storyTitle}</strong>
          </Link>
          <div className="d-md-none w-50 chapters text-center py-1">
            {story.storyChapterNumber} Chương
          </div>
          <div
            className="d-flex align-items-center gap-1 author"
            onClick={() =>
              navigate(getAuthorDetailURL(story.storyAuthor.userId))
            }
          >
            <FaPenFancy />
            <strong>{story.storyAuthor.userFullname}</strong>
          </div>
          <Button
            size="small"
            className="category"
            onClick={() =>
              navigate(
                getCategoryDetailURL(
                  story.storyCategories[0].categoryId,
                  story.storyCategories[0]?.categoryName
                )
              )
            }
          >
            {story.storyCategories[0]?.categoryName}
          </Button>
        </Col>
        <Col xs={0} md={7} lg={7} xl={5}>
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
      <Row
        gutter={[{ xs: 0, lg: 80, xl: 90, xxl: 50 }, 16]}
        className="row-small"
      >
        <Col xs={4} sm={4} md={3} lg={2} xl={4}>
          <VerticalImageHover
            rank={rank}
            imageUrl={story.storyImage}
            width={imgWidth ?? 80}
            height={imgHight ?? 120}
          />
        </Col>
        <Col
          xs={20}
          sm={20}
          md={21}
          lg={22}
          xl={19}
          className="d-flex flex-column justify-content-between"
        >
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
      <div className="row-story-content text-theme">
        {!size || size === "default" ? renderRowDefault() : renderRowSmall()}
      </div>
    </div>
  );
};

export default RowStory;
