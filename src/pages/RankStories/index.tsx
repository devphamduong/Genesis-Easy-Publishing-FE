import { FC, useEffect, useState } from "react";
import "./RankStories.scss";
import { Spin } from "antd";
import { useOutletContext } from "react-router-dom";
import {
  getFilteredStories,
  getTopFamous,
} from "../../services/story-api-service";
import { IStory } from "../../interfaces/story.interface";
import RowStory from "../../components/RowStory";
import EPNoResultFound from "../../components/EP-UI/NoResultFound";

interface IProps {}

const RankStories: FC<IProps> = (props: IProps) => {
  const [searchTerm, setSearchTerm] = useOutletContext();
  const [famousStories, setFamousStories] = useState<IStory[]>([]);
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
      setFamousStories(res.dt.list);
    }
    setIsLoading(false);
  };

  const fetchTopFamous = async () => {
    setIsLoading(true);
    const res = await getTopFamous();
    if (res && res.ec === 0) {
      setFamousStories(res.dt.list);
    }
    setIsLoading(false);
  };

  return (
    <div className="rank-stories-container">
      <div className="rank-stories-content">
        <div className="bottom">
          <Spin spinning={isLoading}>
            {famousStories &&
              famousStories.length > 0 &&
              famousStories?.map((item, index) => (
                <RowStory
                  key={`famous-story-${item.storyId}`}
                  story={item}
                  rank={index + 1}
                />
              ))}
          </Spin>
          {searchTerm && !famousStories.length && <EPNoResultFound />}
        </div>
      </div>
    </div>
  );
};

export default RankStories;
