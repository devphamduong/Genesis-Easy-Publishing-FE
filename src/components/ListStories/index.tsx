import { FC } from "react";
import "./ListStories.scss";
import { Button, Col, List, Row, Tooltip, Typography } from "antd";
import { IStory } from "../../interfaces/story.interface";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { kFormatter, slugify } from "../../shared/function";
const { Text } = Typography;

interface IProps {
  showDetailFirstStory?: true;
  displayRank?: boolean | true;
  displayCategory?: boolean | true;
  displayRead?: boolean | true;
  displayChapter?: boolean | true;
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
  } = props;
  const navigate = useNavigate();

  const renderItemStory = (item: IStory, index: number) => {
    return (
      <Row className="w-100" align={"middle"} justify={"space-between"}>
        {displayRank === true && (
          <Col span={2}>
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
                  navigate(`story/${item.storyId}/${slugify(item.storyTitle)}`)
                }
                className="name"
              >
                {item.storyTitle}
              </span>
            </Text>
            {displayCategory && (
              <span className="author" style={{ width: "fit-content" }}>
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
            <div className="read text-end">{kFormatter(item.read)}</div>
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
        <Col span={2}>
          <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
            <span>{index + 1}</span>
          </div>
        </Col>
        <Col span={16} className="d-flex flex-column">
          <strong
            onClick={() =>
              navigate(`/story/${item.storyId}/${slugify(item.storyTitle)}`)
            }
            className="name"
          >
            {item.storyTitle}
          </strong>
          <div className="chapters">
            {kFormatter(item.storyChapterNumber)} Chương
          </div>
          <div>
            <span className="author">{item.storyAuthor.userFullname}</span>
          </div>
          <div>
            <Button size={"small"}>
              {item.storyCategories[0].categoryName}
            </Button>
          </div>
        </Col>
        <Col span={5}>
          <div className="image-hover">
            <img
              src={`${item.storyImage}`}
              alt={item.storyTitle}
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
            {displayCategory ||
            showDetailFirstStory === !showDetailFirstStory ? (
              <Tooltip title="Danh sách đầy đủ">
                <NavLink to={urlToNavigate!} className="d-none icon-go-to">
                  <FaArrowRightLong />
                </NavLink>
              </Tooltip>
            ) : (
              <NavLink to={urlToNavigate!} className="d-none icon-go-to">
                <FaArrowRightLong />
              </NavLink>
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
