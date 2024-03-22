import { FC, useEffect, useState } from "react";
import "./Following.scss";
import { Button, Table, TableProps } from "antd";
import { getPaginationStoriesFollowing } from "../../../services/story-api-service";
import { IStory } from "../../../interfaces/story.interface";
import { dayjsFrom } from "../../../shared/function";
import { AiOutlineClose } from "react-icons/ai";

interface IProps {}

const PAGE_SIZE = 10;

const FollowingPage: FC<IProps> = (props: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followingStories, setFollowingStories] = useState<IStory[]>([]);

  useEffect(() => {
    fetchStoriesFollowing();
  }, [currentPage, pageSize]);

  const fetchStoriesFollowing = async () => {
    const res = await getPaginationStoriesFollowing(currentPage, pageSize);
    if (res && res.ec === 0) {
      setFollowingStories(res.dt.list);
      setTotalStories(res.dt.totalStories);
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Tên truyện",
      dataIndex: "storyTitle",
      key: "storyTitle",
      render: (text) => (
        <>
          <div>{text}</div>
          <Button
            icon={<AiOutlineClose />}
            size="small"
            type="dashed"
            className="d-flex align-items-center"
            danger
          >
            Bỏ theo dõi
          </Button>
        </>
      ),
    },
    {
      title: "Xem gần nhất",
      dataIndex: ["storyReadChapter", "chapterNumber"],
      key: "storyReadChapter",
      render(value, record: IStory, index) {
        return (
          <>
            <div>Chương {record.storyReadChapter?.chapterNumber}</div>
            <div className="time">
              {record.storyReadChapter &&
                dayjsFrom(record.storyReadChapter?.createTime)}
            </div>
          </>
        );
      },
    },
    {
      title: "Chap mới nhất",
      dataIndex: ["storyLatestChapter", "chapterNumber"],
      key: "storyLatestChapter",
      render(value, record: IStory, index) {
        return (
          <>
            <div>Chương {record.storyLatestChapter?.chapterNumber}</div>
            <div className="time">
              {record.storyLatestChapter &&
                dayjsFrom(record.storyLatestChapter?.createTime)}
            </div>
          </>
        );
      },
    },
  ];

  const onChangePagination = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
  };

  return (
    <div className="following-page-container">
      <div className="following-page-content">
        <Table
          rowKey={"storyId"}
          onChange={onChangePagination}
          loading={isLoading}
          columns={columns}
          dataSource={followingStories}
          pagination={{
            current: currentPage,
            total: totalStories,
            pageSize: pageSize,
          }}
        />
      </div>
    </div>
  );
};

export default FollowingPage;
