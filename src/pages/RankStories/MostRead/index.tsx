import { FC, useEffect, useState } from "react";
import "./MostRead.scss";
import EPNoResultFound from "../../../components/EP-UI/NoResultFound";
import { IStory } from "../../../interfaces/story.interface";
import { useOutletContext } from "react-router-dom";
import { Spin } from "antd";
import RowStory from "../../../components/RowStory";
import {
  getFilteredStories,
  getTopReadStories,
} from "../../../services/story-api-service";

interface IProps {}

const MostRead: FC<IProps> = (props: IProps) => {
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
    const res = await getTopReadStories();
    if (res && res.ec === 0) {
      setStories(res.dt.list);
    }
    setIsLoading(false);
  };

  return (
    <div className="most-read-container">
      <div className="most-read-content">
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

export default MostRead;
