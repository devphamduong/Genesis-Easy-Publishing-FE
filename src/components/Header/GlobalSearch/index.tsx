import { FC, useEffect, useState } from "react";
import "./GlobalSearch.scss";
import SearchFilter from "./SearchFilter";
import { Col, Divider, Dropdown, Flex, Input, Result, Row, Select } from "antd";
import { IStory } from "../../../interfaces/story.interface";
import dayjs from "dayjs";
import EPTag from "../../EP-UI/Tag";
import { getGlobalSearchStories } from "../../../services/story-api-service";
import { useBreakpoint, useOutsideClick } from "../../../hooks/customHooks";
import VerticalImageHover from "../../VerticalImageHover";
import { Link } from "react-router-dom";
import {
  getAuthorDetailURL,
  getStoryDetailURL,
} from "../../../shared/generate-navigate-url";
import ResultSkeleton from "./ResultSkeleton";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";

interface IProps {}

const GlobalSearch: FC<IProps> = (props: IProps) => {
  const [result, setResult] = useState<IStory[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const ref = useOutsideClick(isExpand, () => isExpand && setIsExpand(false));
  const breakpoint = useBreakpoint();
  const isDarkTheme = useSelector(
    (state: IRootState) => state.account.isDarkTheme
  );

  useEffect(() => {
    fetchGlobalSearchStories();
  }, [searchText, searchFilter]);

  const fetchGlobalSearchStories = async () => {
    setIsLoading(true);
    let query = "";
    if (searchText) {
      query += "search=" + searchText + "&";
    }
    if (searchFilter) {
      query += searchFilter;
    }
    const res = await getGlobalSearchStories(query);
    if (res && res.ec === 0) {
      setResult(res.dt);
    }
    setIsLoading(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = null;
  const handleSearch = (newValue: string) => {
    setIsFocused(true);
    setIsExpand(true);
    setSearchText(newValue);
    clearTimeout(timeout);
    timeout = setTimeout(() => {}, 1500);
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
          <Col sm={6} md={5} lg={5} xl={4} xxl={3}>
            <VerticalImageHover
              imageUrl={`${
                import.meta.env.VITE_BACKEND_URL
              }Assets/images/story/${item.storyImage}`}
            />
          </Col>
          <Col sm={24} md={19} lg={19}>
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
          <div
            className={`d-flex gap-2 ${isDarkTheme ? "dark" : "light"}-theme`}
            data-theme="123"
            key={`menu-search-global`}
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <Flex vertical gap={8} className="loading-skeleton">
                <ResultSkeleton />
              </Flex>
            ) : !isLoading && result.length > 0 ? (
              menu
            ) : (
              <Flex align="center" justify="center" className="no-matching">
                <Result
                  status="404"
                  title="Không có kết quả nào được tìm thấy"
                  subTitle="Hãy thử điều chỉnh cụm từ tìm kiếm hoặc bộ lọc của bạn để xem thêm kết quả."
                />
              </Flex>
            )}
            <Divider type="vertical" className="d-none d-lg-block" />
            <div className="d-none d-lg-block filter">
              <SearchFilter
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
            </div>
          </div>
        )}
        open={isExpand}
        getPopupContainer={() => ref.current}
        overlayClassName={`custom-global-search-dropdown ${breakpoint}`}
      >
        <Input
          variant="filled"
          size="large"
          placeholder="Tìm tên truyện"
          value={searchText}
          onFocus={() => handleFocus()}
          onChange={(e) => {
            setIsFocused(true);
            setIsExpand(true);
            setSearchText(e.target.value);
          }}
        />
      </Dropdown>
    </div>
  );
};

export default GlobalSearch;
