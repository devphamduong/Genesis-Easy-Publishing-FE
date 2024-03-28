import { FC, useState } from "react";
import "./GlobalSearch.scss";
import SearchFilter from "./SearchFilter";
import { Divider, Select } from "antd";
import { IStory } from "../../../interfaces/story.interface";
import dayjs from "dayjs";
import EPTag from "../../EP-UI/Tag";

interface IProps {}

const GlobalSearch: FC<IProps> = (props: IProps) => {
  const [result, setResult] = useState<
    { storyId: number; storyTitle: string }[]
  >([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  let timeout: any = null;
  const handleSearch = (newValue: string) => {
    setIsFocused(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchText(newValue);
      setResult([
        {
          storyId: 1,
          storyTitle: "Dị Thế Tà Quân",
        },
        {
          storyId: 2,
          storyTitle: "Gone Girl",
        },
      ]);
    }, 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

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
        open={true}
        onFocus={() => !!searchText && setIsFocused(true)}
        onBlur={() => handleBlur()}
        autoClearSearchValue={false}
        optionRender={(props) => {
          const { data } = props;
          return (
            <>
              <div className="d-flex justify-content-between">
                <span>Tác giả: DuongPC</span>
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
            <div className="d-flex">
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
