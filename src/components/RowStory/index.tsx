import { FC } from "react";
import "./RowStory.scss";
import VerticalImageHover from "../VerticalImageHover";
import { IStory } from "../../interfaces/story.interface";
import { Button, Col, Divider, Row, Typography } from "antd";
import { FaPenFancy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../shared/function";
import { ClockCircleOutlined } from "@ant-design/icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
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
          <strong
            onClick={() =>
              navigate(`/story/${story.storyId}/${slugify(story.storyTitle)}`)
            }
            className="name"
          >
            {story.storyTitle}
          </strong>
          <Text ellipsis={true} className="description">
            <span>{story.storyDescription}</span>
          </Text>
          <div className="d-flex align-items-center gap-1 author">
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
      <Row gutter={[16, 16]}>
        <Col span={4}>
          <VerticalImageHover
            rank={rank}
            imageUrl={story.storyImage}
            width={imgWidth ?? 80}
            height={imgHight ?? 120}
          />
        </Col>
        <Col span={20} className="d-flex flex-column justify-content-between">
          <strong
            onClick={() =>
              navigate(`/story/${story.storyId}/${slugify(story.storyTitle)}`)
            }
            className="name"
          >
            {story.storyTitle}
          </strong>
          <Text ellipsis={true} className="description">
            <span>{story.storyDescription}</span>
          </Text>
          <div className="d-flex align-items-center justify-content-between gap-1 author-chapters">
            <div>
              <FaPenFancy />
              <strong>{story.storyAuthor.userFullname}</strong>
            </div>
            <div className={`chapters chapters-small text-center px-1 py-1`}>
              {story.storyChapterNumber} Chương
            </div>
          </div>
          {displayUpdatedAt && (
            <div>
              <ClockCircleOutlined />
              <span> {dayjs("2024-02-17T13:00:00").fromNow()}</span>
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
