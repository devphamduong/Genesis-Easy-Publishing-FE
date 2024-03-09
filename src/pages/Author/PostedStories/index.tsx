import { ChangeEvent, FC, useState } from "react";
import "./PostedStories.scss";
import { Input, Select, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

interface IProps {}

const PAGE_SIZE = 10;

const PostedStoriesPage: FC<IProps> = (props: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);
  const [sortQuery, setSortQuery] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const columns = [
    {
      title: "TRUYỆN",
      dataIndex: "name",
      render(value) {
        return (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={value ? value.toString() : ""}
          >
            {value}
          </Highlighter>
        );
      },
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "MỚI XUẤT BẢN",
      dataIndex: "chinese",
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "THỜI GIAN",
      dataIndex: "math",
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: "",
      dataIndex: "math",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
    },
  ];

  const onChangePagination = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
    if (sorter && sorter.field) {
      const column = sorter.field;
      const order = sorter.order;
      if (order) {
        const sort =
          order === "ascend" ? `&sort=${column}` : `&sort=-${column}`;
        setSortQuery(sort);
      }
    }
  };

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  let timeout = null;
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchText(event.target.value);
      console.log("object");
    }, 1000);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex gap-3 justify-content-between">
        <Input
          className="w-25"
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          onChange={(e) => handleSearch(e)}
        />
        <div className="d-flex gap-3">
          <Select
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChangeSelect}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
          <Select
            size="large"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChangeSelect}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="posted-stories-container">
      <div className="posted-stories-content">
        <Table
          title={renderHeader}
          columns={columns}
          dataSource={data}
          onChange={onChangePagination}
          rowKey={"name"}
          pagination={{
            current: currentPage,
            total: totalStories,
            pageSize: pageSize,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </div>
    </div>
  );
};

export default PostedStoriesPage;
