import { FC, useEffect, useState } from "react";
import "./RankStories.scss";
import { Col, Row, Spin, Tabs, TabsProps } from "antd";
import { useOutletContext } from "react-router-dom";
import { ICategory } from "../../interfaces/category.interface";
import { getTopFamous } from "../../services/story-api.service";
import { IStory } from "../../interfaces/home/home.interface";
import RowStory from "../../components/RowStory";

interface IProps {}

const RankStories: FC<IProps> = (props: IProps) => {
  const categories: ICategory[] = useOutletContext();
  const [currentCategoriesId, setCurrentCategoriesId] = useState<string>("all");
  const [famousStories, setFamousStories] = useState<IStory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTopFamous();
  }, []);

  const fetchTopFamous = async () => {
    setIsLoading(true);
    const res = await getTopFamous();
    if (res && res.ec === 0) {
      setFamousStories(res.dt);
    }
    setIsLoading(false);
  };

  const onChange = (key: string) => {
    setCurrentCategoriesId(key);
  };

  const itemTabs: TabsProps["items"] = [
    {
      key: "all",
      label: "Tất cả thể loại",
      children: <></>,
    },
    ...categories?.map((item, index) => {
      return {
        key: "" + item.categoryId,
        label: item.categoryName,
        children: <></>,
      };
    }),
  ];

  return (
    <div className="rank-stories-container">
      <div className="rank-stories-content">
        <div className="top">
          <Tabs
            defaultActiveKey={currentCategoriesId}
            items={itemTabs}
            onChange={onChange}
          />
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default RankStories;
