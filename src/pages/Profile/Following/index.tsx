import { FC, useEffect, useState } from "react";
import "./Following.scss";
import { Button, Table, TableProps } from "antd";
import {
  followStory,
  getPaginationStoriesFollowing,
} from "../../../services/story-api-service";
import { IStory } from "../../../interfaces/story.interface";
import { dayjsFrom } from "../../../shared/function";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getStoryReadURL } from "../../../shared/generate-navigate-url";

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

  const handleStoryInteraction = async (id: number | string) => {
    const res = await followStory(id);
    if (res && res.ec === 0) {
      const newArr = followingStories.filter((item) => item.storyId !== id);
      setFollowingStories(newArr);
    } else {
      toast.error(res.em);
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Tên truyện",
      dataIndex: "storyTitle",
      key: "storyTitle",
      render: (text, record: IStory) => (
        <>
          <div>{text}</div>
          <Button
            icon={<AiOutlineClose />}
            size="small"
            type="dashed"
            className="d-flex align-items-center"
            danger
            onClick={() => handleStoryInteraction(record.storyId)}
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
            <Link
              className="link-hover"
              to={getStoryReadURL(
                record.storyId,
                record.storyTitle,
                record.storyReadChapter?.chapterNumber
              )}
            >
              Chương {record.storyReadChapter?.chapterNumber}
            </Link>
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
            <Link
              className="link-hover"
              to={getStoryReadURL(
                record.storyId,
                record.storyTitle,
                record.storyLatestChapter?.chapterNumber
              )}
            >
              Chương {record.storyLatestChapter?.chapterNumber}
            </Link>
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
            responsive: true,
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
