import { FC } from "react";
import "./ListStories.scss";
import { Button, Col, List, Row, Tooltip, Typography } from "antd";
import { IStory } from "../../interfaces/home/home.interface";
import { FaArrowRightLong } from "react-icons/fa6";
const { Text } = Typography;

interface IProps {
  showDetailFirstStory?: true;
  displayRankAndCategory?: true;
  title: string;
  category?: string;
  stories: IStory[];
}

const ListStories: FC<IProps> = (props: IProps) => {
  const {
    showDetailFirstStory,
    title,
    stories,
    category,
    displayRankAndCategory,
  } = props;

  const renderItemStory = (item: IStory, index: number) => {
    return (
      <Row className="w-100" align={"middle"} justify={"space-between"}>
        {!displayRankAndCategory && (
          <Col span={2}>
            <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
              <span>{index + 1}</span>
            </div>
          </Col>
        )}
        <Col span={19}>
          <Text ellipsis={true} className="name">
            <span>{item.storyTitle}</span>
          </Text>
        </Col>
        {displayRankAndCategory ? (
          <Col span={2}>
            <div className="chapters">{item.storyAuthor.userFullname}</div>
          </Col>
        ) : (
          <Col span={2}>
            <div className="chapters">{item.storyChapterNumber}</div>
          </Col>
        )}
      </Row>
    );
  };

  const renderItemWithDetailFirstStory = (item: IStory, index: number) => {
    return (
      <Row className="w-100" align={"top"} justify={"space-between"}>
        <Col span={2}>
          <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
            <span>{index + 1}</span>
          </div>
        </Col>
        <Col span={16} className="d-flex flex-column">
          <strong className="name">{item.storyTitle}</strong>
          <div className="chapters">{item.storyChapterNumber} Chương</div>
          <div>
            <span className="author">{item.storyAuthor.userFullname}</span>
          </div>
          <div className="category">
            <Button size={"small"}>{category}</Button>
          </div>
        </Col>
        <Col span={5}>
          <div className="image-hover">
            <img
              src="https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg"
              alt=""
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
            <strong>{title}</strong>
            {displayRankAndCategory === true ||
            showDetailFirstStory === !showDetailFirstStory ? (
              <Tooltip title="Danh sách đầy đủ">
                <div className="d-none icon-go-to">
                  <FaArrowRightLong />
                </div>
              </Tooltip>
            ) : (
              <div className="d-none icon-go-to">
                <FaArrowRightLong />
              </div>
            )}
          </div>
        }
        bordered
        dataSource={stories}
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
