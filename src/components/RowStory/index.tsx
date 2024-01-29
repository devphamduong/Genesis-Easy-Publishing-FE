import { FC } from "react";
import "./RowStory.scss";
import VerticalImageHover from "../VerticalImageHover";
import { IStory } from "../../interfaces/home/home.interface";
import { Button, Col, Divider, Row, Typography } from "antd";
import { FaPenFancy } from "react-icons/fa6";
const { Text } = Typography;

interface IProps {
  story: IStory;
  rank?: number;
}

const RowStory: FC<IProps> = (props: IProps) => {
  const { story, rank } = props;

  return (
    <div className="row-story-container">
      <div className="row-story-content">
        <Row justify={"space-between"}>
          <Col span={2}>
            <VerticalImageHover rank={rank} imageUrl={story.storyImage} />
          </Col>
          <Col span={18} className="d-flex flex-column justify-content-between">
            <strong className="name">{story.storyTitle}</strong>
            <Text ellipsis={true} className="description">
              <span>{story.storyDescription}</span>
            </Text>
            <div className="d-flex align-items-center gap-1 author">
              <FaPenFancy />
              <strong>{story.storyAuthor.userFullname}</strong>
            </div>
            <Button size="small" className="category">
              {/* {story.storyCategories[0].categoryName} */}
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
      </div>
    </div>
  );
};

export default RowStory;
