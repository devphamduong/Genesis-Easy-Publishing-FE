import { FC, useEffect, useState } from "react";
import "./SearchFilter.scss";
import { Avatar, InputNumber, Select, Slider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IAuthor } from "../../../../interfaces/story.interface";
import { getFilterOptionsV2 } from "../../../../services/common-api-service";
import EPFilter from "../../../EP-Common/Filter";
import { IFilterOptions } from "../../../../interfaces/global.interface";
import { EStoryStatusKey } from "../../../../enums/story.enum";

interface IProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

interface IFilterForm {
  authorId: number | string;
  from: number;
  to: number;
  status: EStoryStatusKey;
  cates: string[];
}

const SearchFilter: FC<IProps> = (props: IProps) => {
  const { searchFilter, setSearchFilter } = props;
  const [filters, setFilters] = useState<IFilterOptions>();
  const [filterValues, setFilterValues] = useState<Partial<IFilterForm>>({
    status: EStoryStatusKey.NOT_COMPLETED,
  });
  const [priceRange, setPriceRange] = useState<{
    from: number;
    to: number;
  }>({
    from: 0,
    to: 0,
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    buildQuery();
  }, [filterValues]);

  const fetchFilterOptions = async () => {
    const res = await getFilterOptionsV2();
    if (res && res.ec === 0) {
      setFilters(res.dt);
      setPriceRange({ from: res.dt.from, to: res.dt.to });
      handleSetValue({
        authorId: res.dt.author[0].authorId,
        from: res.dt.from,
        to: res.dt.to,
        status: EStoryStatusKey.NOT_COMPLETED,
      });
    }
  };

  const options = filters
    ? filters?.author.map((item) => {
        return { value: item.authorId + "", label: item.authorName };
      })
    : [];

  const handleChangeFilter = (key, value) => {
    handleSetValue({ [key]: value });
  };

  const buildQuery = () => {
    let query = "";
    Object.keys(filterValues).forEach((key, index) => {
      if (filterValues[key] || filterValues[key] === 0) {
        if (
          filterValues[key] instanceof Array &&
          filterValues[key].length > 0
        ) {
          filterValues[key].forEach((element, index) => {
            query += key + `=` + element + "&";
          });
        } else {
          query += key + `=` + filterValues[key] + "&";
        }
      }
    });
    setSearchFilter(query.substring(0, query.length - 1));
  };

  const handleSetValue = (value: Partial<IFilterForm>) => {
    setFilterValues((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  return (
    <div className="search-filter-container">
      <div className="search-filter-content d-flex flex-column gap-3">
        {filters?.author && filters?.author.length > 0 && (
          <Select
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleChangeFilter("authorId", e)}
            defaultValue={options[0]?.value}
            allowClear
            className="custom-author-search-dropdown"
            options={options}
            labelRender={(props) => {
              const { label, value } = props;
              return (
                <div className="d-flex align-items-center gap-2">
                  <Avatar size="large" icon={<UserOutlined />} />
                  <div className="d-flex flex-column">
                    <strong className="text-eclipse">{label}</strong>
                    <span className="text-eclipse">{label}</span>
                  </div>
                </div>
              );
            }}
            optionRender={(props) => {
              const { data } = props;
              return (
                <>
                  <div className="d-flex align-items-center gap-2">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div className="d-flex flex-column">
                      <strong className="text-eclipse">{data.label}</strong>
                      <span className="text-eclipse">{data.label}</span>
                    </div>
                  </div>
                </>
              );
            }}
          />
        )}
        <div>
          <InputNumber
            addonBefore="Từ"
            addonAfter="TLT"
            min={0}
            value={filterValues.from}
            onChange={(e) => handleChangeFilter("from", e)}
          />
          <InputNumber
            addonBefore="Đến"
            addonAfter="TLT"
            max={priceRange.to}
            value={filterValues.to}
            onChange={(e) => handleChangeFilter("to", e)}
          />
        </div>
        <Select
          mode="multiple"
          allowClear
          maxTagCount="responsive"
          placeholder="Thể loại"
          onChange={(e) => handleChangeFilter("cates", e)}
          options={
            filters &&
            filters?.cate?.map((item) => {
              return { value: item.categoryId, label: item.categoryName };
            })
          }
        />
        <Select
          placeholder="Trạng thái"
          defaultValue={EStoryStatusKey.NOT_COMPLETED}
          onChange={(e) => handleChangeFilter("status", e)}
          options={
            filters &&
            filters.status.map((item) => {
              return { value: item.value as string, label: item.name };
            })
          }
        />
      </div>
      <button onClick={() => buildQuery()}>submit</button>
    </div>
  );
};

export default SearchFilter;
