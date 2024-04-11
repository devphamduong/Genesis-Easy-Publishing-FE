import { FC, useEffect, useState } from "react";
import "./Review.scss";
import { Table } from "antd";
import { getStoriesReview } from "../../../services/review-api-service";
import { IStory } from "../../../interfaces/story.interface";
import dayjs from "dayjs";
import { dayjsFrom } from "../../../shared/function";
import { BsInfoCircleFill } from "react-icons/bs";
import { EStoryStatusKey, EStoryStatusLabel } from "../../../enums/story.enum";
import PostedVolumes from "./PostedVolumes";
import AuthorDrawer from "../PostedStories/AuthorDrawer";

interface IProps {}

const PAGE_SIZE = 10;

const ReviewPage: FC<IProps> = (props: IProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [stories, setStories] = useState<IStory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStory, setCurrentStory] = useState<IStory>();

  useEffect(() => {
    fetchStoriesForReview();
  }, [currentPage, pageSize]);

  const fetchStoriesForReview = async () => {
    setIsLoading(true);
    const res = await getStoriesReview(currentPage, pageSize);
    if (res && res.ec === 0) {
      setTotalStories(res.dt.total);
      setStories(res.dt.list);
    }
    setIsLoading(false);
  };

  const columns = [
    {
      title: "TRUYỆN",
      dataIndex: "storyTitle",
      render(value: string, record: IStory) {
        return (
          <span
            // onClick={() => {
            //   setCurrentStory(record);
            //   setOpenDrawer(true);
            // }}
            className="pointer custom-title-hover"
            onClick={() => {
              setCurrentStory(record);
              setOpenDrawer(true);
            }}
          >
            {value}
          </span>
        );
      },
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "storyStatus",
      render(value: string, record: IStory) {
        return (
          <span>{EStoryStatusLabel[EStoryStatusKey[record.storyStatus]]}</span>
        );
      },
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "storyCreateTime",
      render(value: string, record: IStory) {
        return (
          <span>
            {dayjs(record.storyCreateTime).format("DD/MM/YYYY")}{" "}
            <span className="time">({dayjsFrom(record.storyCreateTime)})</span>
          </span>
        );
      },
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
  };

  return (
    <>
      <div className="stories-review-container">
        <div className="stories-review-content">
          <div className="fs-6 d-flex align-items-center gap-1">
            <BsInfoCircleFill />
            <span>Click vào từng tên truyện để có thể tiến hành review.</span>
          </div>
          <Table
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
          <AuthorDrawer
            className="drawer-review-stories"
            title={`Tất cả tập và chương của truyện "${currentStory?.storyTitle}" có thể review`}
            placement="right"
            onClose={() => {
              setOpenDrawer(false);
            }}
            open={openDrawer}
          >
            {currentStory && <PostedVolumes storyId={currentStory.storyId} />}
          </AuthorDrawer>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
