import { FC, useEffect, useState } from "react";
import "./ChaptersNeedToReview.scss";
import { Table, TableColumnsType, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { IChapter } from "../../../../interfaces/story.interface";
import { getChaptersNeedToReview } from "../../../../services/review-api-service";
import dayjs from "dayjs";
import { dayjsFrom } from "../../../../shared/function";
import {
  EChapterStatusKey,
  EChapterStatusLabel,
} from "../../../../enums/story.enum";
import EPButton from "../../../../components/EP-UI/Button";
import { getReviewAChapterURL } from "../../../../shared/generate-navigate-url";
import { MdOutlineRateReview } from "react-icons/md";
import { deleteChapter } from "../../../../services/author-api-service";
import { toast } from "react-toastify";

interface IProps {}

const PAGE_SIZE = 10;

const ChaptersNeedToReviewPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalChapters, setTotalChapters] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchChaptersNeedToReview();
  }, [currentPage, pageSize]);

  const fetchChaptersNeedToReview = async () => {
    setIsLoading(true);
    const res = await getChaptersNeedToReview(currentPage, pageSize);
    if (res && res.ec === 0) {
      setTotalChapters(res.dt.total);
      setChapters(res.dt.list);
    }
    setIsLoading(false);
  };

  const onChangePagination = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }
  };

  const handleDeleteChapter = async (id: number | string) => {
    const res = await deleteChapter(id);
    if (res && res.ec === 0) {
      toast.success(res.em);
      fetchChaptersNeedToReview();
    } else {
      toast.error(res.em);
    }
  };

  const columns: TableColumnsType<IChapter> = [
    {
      title: "TRUYỆN",
      dataIndex: "key",
      render(value: string, record) {
        return record.storyTitle;
      },
    },
    {
      title: "TẬP",
      dataIndex: "total",
      render(value: string, record) {
        return (
          <span>
            Tập {record.volumeNumber}: {record.volumeTitle}
          </span>
        );
      },
    },
    {
      title: "CHƯƠNG",
      dataIndex: "total",
      render(value: string, record) {
        return (
          <span>
            Chương {record.chapterNumber}: {record.chapterTitle}
          </span>
        );
      },
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      render(value: string, record) {
        return (
          <span>
            {record.status === EChapterStatusKey.QUALIFIED
              ? EChapterStatusLabel[EChapterStatusKey[record.status]]
              : record.status === EChapterStatusKey.NOT_QUALIFY
              ? "Chưa được review"
              : "Chưa đủ điều kiện"}
          </span>
        );
      },
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "createTime",
      render(value: string, record) {
        return (
          <span>
            {dayjs(record.createTime).format("DD/MM/YYYY")}{" "}
            <span className="time">({dayjsFrom(record.createTime)})</span>
          </span>
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render(value, record) {
        return (
          <Tooltip title="Review">
            <EPButton
              icon={<MdOutlineRateReview className="fs-5" />}
              onClick={() =>
                navigate(getReviewAChapterURL(record.storyId, record.chapterId))
              }
            />
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="chapters-need-to-review-container">
      <div className="chapters-need-to-review-content">
        <Table
          columns={columns}
          dataSource={chapters}
          onChange={onChangePagination}
          rowKey={"storyId"}
          loading={isLoading}
          pagination={{
            current: currentPage,
            total: totalChapters,
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

export default ChaptersNeedToReviewPage;
