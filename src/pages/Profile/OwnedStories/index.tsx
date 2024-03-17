import { FC, useEffect, useState } from "react";
import "./OwnedStories.scss";
import { IStory } from "../../../interfaces/story.interface";
import { getStoryDetailURL } from "../../../shared/generate-navigate-url";
import { useNavigate } from "react-router-dom";
import { getPaginationOwnedStories } from "../../../services/story-api-service";
import { Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";

interface IProps {}

const PAGE_SIZE = 10;

const OwnedStoriesPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<IStory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);

  useEffect(() => {
    fetchOwnedStories();
  }, [currentPage, pageSize]);

  const fetchOwnedStories = async () => {
    const res = await getPaginationOwnedStories(currentPage, pageSize);
    if (res && res.ec === 0) {
      setStories(res.dt.list);
      setTotalStories(res.dt.totalStories);
    }
  };

  const handleChangePageChapter = (page: number, pageSize: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="d-flex gap-5 flex-wrap justify-content-evenly">
        {stories &&
          stories.length > 0 &&
          stories.map((item, index) => {
            return (
              <Card
                key={`owned-story-${item.storyId}`}
                hoverable
                style={{ width: 240 }}
                cover={<img alt={item.storyTitle} src={item.storyImage} />}
                onClick={() =>
                  navigate(getStoryDetailURL(item.storyId, item.storyTitle))
                }
              >
                <Meta
                  title={item.storyTitle}
                  description={item.storyAuthor.userFullname}
                />
              </Card>
            );
          })}
      </div>
      {stories.length > 0 && (
        <Pagination
          className="text-center mt-3"
          responsive
          current={currentPage}
          total={totalStories}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={(page: number, pageSize: number) =>
            handleChangePageChapter(page, pageSize)
          }
        />
      )}
    </>
  );
};

export default OwnedStoriesPage;
