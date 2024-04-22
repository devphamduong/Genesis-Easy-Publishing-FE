import { FC, useEffect, useState } from "react";
import "./UnreviewChapters.scss";
import { Popconfirm, Table, TableColumnsType, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { IChapter } from "../../../../interfaces/story.interface";
import { getUnreviewChapters } from "../../../../services/review-api-service";
import dayjs from "dayjs";
import { dayjsFrom, slugify } from "../../../../shared/function";
import {
  EChapterStatusKey,
  EChapterStatusLabel,
} from "../../../../enums/story.enum";
import EPButton from "../../../../components/EP-UI/Button";
import { LuFileEdit } from "react-icons/lu";
import {
  getEditChapterURL,
  getReviewDetailAChapterURL,
} from "../../../../shared/generate-navigate-url";
import { PiQuestion } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { deleteChapter } from "../../../../services/author-api-service";
import { toast } from "react-toastify";

interface IProps {}

const PAGE_SIZE = 10;

const UnreviewChaptersPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalChapters, setTotalChapters] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUnreviewChapters();
  }, [currentPage, pageSize]);

  const fetchUnreviewChapters = async () => {
    setIsLoading(true);
    const res = await getUnreviewChapters(currentPage, pageSize);
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
      fetchUnreviewChapters();
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
          <div className="d-flex gap-2">
            <Tooltip title="Sửa chương">
              <EPButton
                icon={<LuFileEdit className="fs-5" />}
                onClick={() =>
                  navigate(
                    getEditChapterURL(
                      record.storyId,
                      record.chapterId,
                      slugify(record.chapterTitle)
                    )
                  )
                }
              />
            </Tooltip>
            {record.status === null && (
              <Tooltip title="Xem lý do">
                <EPButton
                  icon={<PiQuestion className="fs-5" />}
                  onClick={() =>
                    navigate(
                      getReviewDetailAChapterURL(
                        record.storyId,
                        record.chapterId
                      )
                    )
                  }
                />
              </Tooltip>
            )}
            <Popconfirm
              title="Xóa chương"
              description="Bạn có muốn xóa chương này không?"
              okText="Xóa"
              cancelText="Hủy"
              onConfirm={() => handleDeleteChapter(record.chapterId)}
            >
              <EPButton danger icon={<MdDeleteOutline className="fs-5" />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="unreview-chapters-container">
      <div className="unreview-chapters-content">
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

export default UnreviewChaptersPage;
