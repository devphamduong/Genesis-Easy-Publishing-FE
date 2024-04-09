import { FC, useEffect, useState } from "react";
import "./PostedVolumes.scss";
import { Table, TableColumnsType, Tooltip } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getVolumeList } from "../../../../services/review-api-service";
import { dayjsFrom } from "../../../../shared/function";
import {
  EChapterStatusKey,
  EChapterStatusLabel,
} from "../../../../enums/story.enum";
import {
  getReviewAChapterURL,
  getReviewDetailAChapterURL,
} from "../../../../shared/generate-navigate-url";
import EPButton from "../../../../components/EP-UI/Button";
import { PiQuestion } from "react-icons/pi";

interface IProps {}

const PAGE_SIZE = 10;

interface DataType {
  key: number;
  id: number;
  name: string;
  number: string;
  createTime: string;
  total: number;
  type: "volume" | "chapter";
  status: number | null;
  children?: DataType[];
}

const PostedVolumes: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [volumes, setVolumes] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalVolumes, setTotalVolumes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStoryVolume();
  }, [currentPage, pageSize]);

  const fetchStoryVolume = async () => {
    setIsLoading(true);
    const res = await getVolumeList(
      6
      // `authorid=${account.userId}&` + query
    );
    if (res && res.ec === 0) {
      // setTotalStories(res.dt.totalStories);
      // setVolumes(res.dt.list);
      const data = res.dt.map((itemV) => {
        return {
          key: uuidv4(),
          id: itemV.volumeId,
          name: itemV.volumeTitle,
          number: "Tập " + itemV.volumeNumber + ": ",
          createTime: itemV.createTime,
          total: itemV.chapters.length,
          type: "volume",
          children: itemV.chapters.map((itemC) => {
            return {
              key: uuidv4(),
              id: itemC.chapterId,
              name: itemC.chapterTitle,
              number: "Chương " + itemC.chapterNumber + ": ",
              createTime: itemC.createTime,
              total: 0,
              status: itemC.status,
              type: "chapter",
            } as DataType;
          }),
        } as DataType;
      });
      setVolumes(data);
    }
    setIsLoading(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "TẬP & TÊN",
      dataIndex: "key",
      render(value: string, record) {
        return (
          <span
            onClick={() =>
              record.type === "chapter" &&
              record.status === EChapterStatusKey.NOT_QUALIFY &&
              navigate(getReviewAChapterURL(17, record.id))
            }
            className={
              record.type === "chapter" &&
              record.status === EChapterStatusKey.NOT_QUALIFY
                ? `pointer custom-title-hover`
                : ""
            }
          >
            {record.number} {record.name}
          </span>
        );
      },
    },
    {
      title: "SỐ CHƯƠNG",
      dataIndex: "total",
      render(value: string, record) {
        if (record.total) return <span>{record.total}</span>;
      },
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "status",
      render(value: string, record) {
        if (record.type === "chapter")
          return (
            <span>
              {EChapterStatusLabel[EChapterStatusKey[record.status as number]]}
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
            {record.type === "chapter" && record.status === null && (
              <>
                <Tooltip title="Xem lý do">
                  <EPButton
                    icon={<PiQuestion className="fs-5" />}
                    onClick={() =>
                      navigate(getReviewDetailAChapterURL(6, record.id))
                    }
                  />
                </Tooltip>
              </>
            )}
          </div>
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

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className="posted-volumes-container">
        <div className="posted-volumes-content">
          <Table
            columns={columns}
            dataSource={volumes}
            onChange={onChangePagination}
            rowKey={"key"}
            loading={isLoading}
            // pagination={{
            //   current: currentPage,
            //   total: totalStories,
            //   pageSize: pageSize,
            //   showSizeChanger: true,
            //   showTotal: (total, range) =>
            //     `${range[0]}-${range[1]} of ${total} items`,
            // }}
          />
        </div>
      </div>
    </>
  );
};

export default PostedVolumes;
