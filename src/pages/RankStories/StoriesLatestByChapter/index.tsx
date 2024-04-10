import { FC, useEffect, useState } from "react";
import "./StoriesLatestByChapter.scss";
import { useOutletContext } from "react-router-dom";
import { IStory } from "../../../interfaces/story.interface";
import RowStory from "../../../components/RowStory";
import { Spin } from "antd";
import EPNoResultFound from "../../../components/EP-UI/NoResultFound";
import {
  getFilteredStories,
  getTopFamous,
  getTopLatestByChapter,
} from "../../../services/story-api-service";

interface IProps {}

const StoriesLatestByChapter: FC<IProps> = (props: IProps) => {
  const [searchTerm, setSearchTerm] = useOutletContext() as [
    string,
    (value: string) => void
  ];
  const [stories, setStories] = useState<IStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTopFamous();
  }, []);

  useEffect(() => {
    fetchFilteredStories();
  }, [searchTerm]);

  const fetchFilteredStories = async () => {
    let query = "";
    if (searchTerm) {
      query += searchTerm;
    }
    setIsLoading(true);
    const res = await getFilteredStories(query);
    if (res && res.ec === 0) {
      setStories(res.dt.list);
    }
    setIsLoading(false);
  };

  const fetchTopFamous = async () => {
    setIsLoading(true);
    const res = await getTopLatestByChapter();
    if (res && res.ec === 0) {
      setStories(res.dt.list);
    }
    setIsLoading(false);
  };

  return (
    <div className="latest-by-chapter-container">
      <div className="latest-by-chapter-content">
        <div className="bottom">
          <Spin spinning={isLoading}>
            {stories &&
              stories.length > 0 &&
              stories?.map((item, index) => (
                <RowStory
                  key={`famous-story-${item.storyId}`}
                  story={item}
                  rank={index + 1}
                />
              ))}
          </Spin>
          {searchTerm && !stories.length && <EPNoResultFound />}
        </div>
      </div>
    </div>
  );
};

export default StoriesLatestByChapter;
