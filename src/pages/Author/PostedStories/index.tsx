import { ChangeEvent, FC, useEffect, useState } from "react";
import "./PostedStories.scss";
import { Drawer, Input, Select, Table } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import EPStoryStatistics from "../../../components/EP-UI/StoryStatistics";
import { BsInfoCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  getAuthorPostedStories,
  getChartChapters,
  getChartStory,
} from "../../../services/author-api-service";
import {
  IChapterInteraction,
  IStory,
  IStoryInteraction,
} from "../../../interfaces/story.interface";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

interface IProps {}

const PAGE_SIZE = 10;

const PostedStoriesPage: FC<IProps> = (props: IProps) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);
  const [sortQuery, setSortQuery] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const account = useSelector((state: IRootState) => state.account.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStory, setCurrentStory] = useState<IStory>();
  const [dataStoryInteraction, setDataStoryInteraction] =
    useState<IStoryInteraction>();
  const [dataChaptersInteraction, setDataChaptersInteraction] = useState<
    IChapterInteraction[]
  >([]);

  useEffect(() => {
    fetchPostedStories();
  }, [currentPage, pageSize, searchText, sortQuery]);

  useEffect(() => {
    if (openDrawer && currentStory) {
      fetchChartStory();
      fetchChartChapters();
    }
  }, [currentStory, openDrawer]);

  const fetchPostedStories = async () => {
    setIsLoading(true);
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (searchText) {
      query += "&title=" + searchText;
    }
    if (sortQuery) {
      query += sortQuery;
    }
    window.history.replaceState(null, "", "?" + query);
    const res = await getAuthorPostedStories(
      `authorid=${account.userId}&` + query
    );
    if (res && res.ec === 0) {
      setTotalStories(res.dt.totalStories);
      setStories(res.dt.list);
    }
    setIsLoading(false);
  };

  const fetchChartStory = async () => {
    const res = await getChartStory(currentStory!.storyId);
    if (res && res.ec === 0) {
      const payload = {
        follow: res.dt.follow,
        like: res.dt.like,
        read: res.dt.read,
        view: res.dt.view,
        purchaseChapter: res.dt.purchaseChapter,
        purchaseStory: res.dt.purchaseStory,
        reportStory: res.dt.reportStory,
      };
      setDataStoryInteraction(payload);
    }
  };

  const fetchChartChapters = async () => {
    const res = await getChartChapters(currentStory!.storyId);
    if (res && res.ec === 0) {
      // const payload = {
      //   chapterId: res.dt.chapterId,
      //   chapterTitle: res.dt.chapterTitle,
      //   chapterNumber: res.dt.chapterNumber,
      //   purchaseChapter: res.dt.purchaseChapter,
      //   reportChapter: res.dt.reportChapter
      // };
      setDataChaptersInteraction(res.dt);
    }
  };

  const columns = [
    {
      title: "TRUYỆN",
      dataIndex: "storyTitle",
      render(value: string, record: IStory) {
        return (
          <span
            onClick={() => {
              setCurrentStory(record);
              setOpenDrawer(true);
            }}
            className="pointer custom-title-hover"
          >
            <Highlighter
              highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={value ? value.toString() : ""}
            >
              {value}
            </Highlighter>
          </span>
        );
      },
      sorter: true,
    },
    {
      title: "SỐ NGƯỜI ĐÃ MUA",
      dataIndex: "userPurchaseStory",
      sorter: true,
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "storyCreateTime",
      render(value: string) {
        return (
          <span>
            {dayjs("2022-02-01T05:52:10.323").format("DD/MM/YYYY")}{" "}
            <span className="time">
              ({dayjs("2022-02-01T05:52:10.323").fromNow()})
            </span>
          </span>
        );
      },
      sorter: true,
    },
    // {
    //   title: "",
    //   dataIndex: "math",
    // },
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = null;
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setSearchText(event.target.value);
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
    <>
      <div className="posted-stories-container">
        <div className="posted-stories-content">
          <div className="fs-6 d-flex align-items-center gap-1">
            <BsInfoCircleFill />
            <span>
              Click vào từng tên truyện để có thể xem chi tiết số liệu thống kê
              của truyện đó.
            </span>
          </div>
          <Table
            title={renderHeader}
            columns={columns}
            dataSource={stories}
            onChange={onChangePagination}
            rowKey={"storyId"}
            loading={isLoading}
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
      <Drawer
        className="drawer-posted-stories"
        title={`Số liệu thống kê của truyện "${currentStory?.storyTitle}"`}
        placement="right"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <EPStoryStatistics
          width={"65%"}
          height={"65%"}
          storyInteraction={dataStoryInteraction}
          chaptersInteraction={dataChaptersInteraction}
        />
      </Drawer>
    </>
  );
};

export default PostedStoriesPage;
