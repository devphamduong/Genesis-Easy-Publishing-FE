import { FC, useEffect, useState } from "react";
import "./GlobalSearch.scss";
import SearchFilter from "./SearchFilter";
import { Divider, Select } from "antd";
import { IStory } from "../../../interfaces/story.interface";
import dayjs from "dayjs";
import EPTag from "../../EP-UI/Tag";
import { getGlobalSearchStories } from "../../../services/story-api-service";
import { useOutsideClick } from "../../../hooks/customHooks";
// import List from "react-virtualized/List";

interface IProps {}

const GlobalSearch: FC<IProps> = (props: IProps) => {
  const [result, setResult] = useState<IStory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTriggerSearch, setIsTriggerSearch] = useState<boolean>(false);

  useEffect(() => {
    isTriggerSearch && fetchGlobalSearchStories();
  }, [isTriggerSearch]);

  const fetchGlobalSearchStories = async () => {
    let query = "";
    if (searchText) {
      query += "search=" + searchText;
    }
    const res = await getGlobalSearchStories();
    if (res && res.ec === 0) {
      setResult(res.dt);
      setIsTriggerSearch(false);
    }
  };

  let timeout: any = null;
  const handleSearch = (newValue: string) => {
    setIsFocused(true);
    setIsExpand(true);
    setSearchText(newValue);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setIsTriggerSearch(true);
    }, 1500);
  };

  const handleBlur = () => {
    !isExpand && setIsFocused(false);
  };

  const handleFocus = () => {
    if (!searchText) {
      setIsFocused(true);
      setIsExpand(true);
    }
  };

  const ref = useOutsideClick(() => setIsExpand(false));

  return (
    <>
      <Select
        className="w-100"
        popupClassName="custom-global-search-dropdown"
        size="large"
        mode="multiple"
        showSearch
        searchValue={searchText}
        allowClear
        virtual={true}
        placeholder={"Tìm tên truyện"}
        defaultActiveFirstOption={false}
        suffixIcon={null}
        filterOption={false}
        onSearch={handleSearch}
        notFoundContent={null}
        options={result}
        open={isExpand}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        onClear={() => setResult([])}
        autoClearSearchValue={false}
        optionRender={(props) => {
          const { data } = props;
          return (
            <>
              <div className="d-flex justify-content-between">
                <span>Tác giả: {data.storyAuthor.userFullname}</span>
                <i className="time">
                  {dayjs("03-27-2024").format("DD/MM/YYYY")}
                </i>
              </div>
              <div>
                <strong>{data.storyTitle}</strong>
              </div>
              <div className="text-eclipse">
                Marriage can be a real killer. On a warm summer morning in North
                Carthage, Missouri, it is Nick and Amy Dunne’s fifth wedding
                anniversary. Presents are being wrapped and reservations are
                being made when Nick’s
              </div>
              <div>
                <EPTag color="magenta" shape="round" content="cate 1" />
                <EPTag color="magenta" shape="round" content="cate 2" />
                <EPTag color="magenta" shape="round" content="cate 3" />
              </div>
            </>
          );
        }}
        dropdownRender={(menu) => {
          return (
            <div className="d-flex" ref={ref}>
              {menu}
              <Divider type="vertical" />
              <SearchFilter />
            </div>
          );
        }}
      />
      {/* <SearchFilter /> */}
    </>
  );
};

export default GlobalSearch;
