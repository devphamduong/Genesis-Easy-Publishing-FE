import { FC, useEffect, useState } from "react";
import "./GlobalSearch.scss";
import SearchFilter from "./SearchFilter";
import { Col, Divider, Dropdown, Input, Row, Select } from "antd";
import { IStory } from "../../../interfaces/story.interface";
import dayjs from "dayjs";
import EPTag from "../../EP-UI/Tag";
import { getGlobalSearchStories } from "../../../services/story-api-service";
import { useOutsideClick } from "../../../hooks/customHooks";
import VerticalImageHover from "../../VerticalImageHover";
import { Link } from "react-router-dom";
import {
  getAuthorDetailURL,
  getStoryDetailURL,
} from "../../../shared/generate-navigate-url";

interface IProps {}

const GlobalSearch: FC<IProps> = (props: IProps) => {
  const [result, setResult] = useState<IStory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const [isTriggerSearch, setIsTriggerSearch] = useState<boolean>(false);
  const ref = useOutsideClick(isExpand, () => isExpand && setIsExpand(false));

  useEffect(() => {
    isTriggerSearch && fetchGlobalSearchStories();
  }, [isTriggerSearch, searchFilter]);

  const fetchGlobalSearchStories = async () => {
    let query = "";
    if (searchText) {
      query += "search=" + searchText;
    }
    if (searchFilter) {
      query += searchFilter;
    }
    const res = await getGlobalSearchStories(query);
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
    if (searchText) {
      setIsFocused(true);
      setIsExpand(true);
    }
  };

  const items = result.map((item) => {
    return {
      key: item.storyId + "",
      label: (
        <Row gutter={[10, 10]}>
          <Col span={3}>
            <VerticalImageHover imageUrl={item.storyImage} />
          </Col>
          <Col span={21}>
            <div className="d-flex justify-content-between">
              <span>
                Tác giả:{" "}
                <Link
                  to={getAuthorDetailURL(item.storyAuthor.userId)}
                  className="link-hover"
                >
                  {item.storyAuthor.userFullname}
                </Link>
              </span>
              <i className="time">
                {dayjs(item.storyCreateTime).format("DD/MM/YYYY")}
              </i>
            </div>
            <div>
              <strong>
                <Link
                  to={getStoryDetailURL(item.storyId, item.storyTitle)}
                  className="link-hover"
                >
                  {item.storyTitle}
                </Link>
              </strong>
            </div>
            <div className="text-eclipse">{item.storyDescription}</div>
            <div className="d-flex flex-wrap gap-1">
              {item.storyCategories.length > 0 &&
                item.storyCategories.map((item) => {
                  return (
                    <EPTag
                      key={`filter-option-${item.categoryId}`}
                      color="magenta"
                      shape="round"
                      content={item.categoryName}
                    />
                  );
                })}
            </div>
          </Col>
        </Row>
      ),
    };
  });

  return (
    <div ref={ref}>
      <Dropdown
        menu={{ items }}
        dropdownRender={(menu) => (
          <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
            {menu}
            <Divider type="vertical" />
            <SearchFilter
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
          </div>
        )}
        open={isExpand}
        overlayClassName="custom-global-search-dropdown"
      >
        <Input
          variant="filled"
          size="large"
          placeholder="Tìm tên truyện"
          value={searchText}
          onFocus={() => handleFocus()}
          // onBlur={() => handleBlur()}
          onChange={(e) => {
            setIsFocused(true);
            setIsExpand(true);
            setSearchText(e.target.value);
            setIsTriggerSearch(true);
          }}
        />
      </Dropdown>
      {/* <Select
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
      /> */}
      {/* <SearchFilter /> */}
    </div>
  );
};

export default GlobalSearch;
