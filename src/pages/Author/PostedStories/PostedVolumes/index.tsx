import { FC, useEffect, useState } from "react";
import "./PostedVolumes.scss";
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import {
  addVolume,
  deleteChapter,
  getStoryVolume,
  updateVolume,
} from "../../../../services/author-api-service";
import dayjs from "dayjs";
import EPButton from "../../../../components/EP-UI/Button";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getEditChapterURL,
  getReviewDetailAChapterURL,
} from "../../../../shared/generate-navigate-url";
import { dayjsFrom, slugify } from "../../../../shared/function";
import { v4 as uuidv4 } from "uuid";
import { LuFileEdit } from "react-icons/lu";
import { toast } from "react-toastify";
import { PiQuestion } from "react-icons/pi";
import {
  EChapterStatusKey,
  EChapterStatusLabel,
} from "../../../../enums/story.enum";

interface IProps {
  storyId: number | string;
}

const PAGE_SIZE = 10;

interface DataType {
  key: number;
  id: number;
  name: string;
  number: string;
  createTime: string;
  total: number;
  type: "volume" | "chapter";
  status: number;
  children?: DataType[];
}

const PostedVolumes: FC<IProps> = (props: IProps) => {
  const { storyId } = props;
  const navigate = useNavigate();
  const [volumes, setVolumes] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalVolumes, setTotalVolumes] = useState<number>(0);
  const [sortQuery, setSortQuery] = useState<string>("");
  const account = useSelector((state: IRootState) => state.account.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [volumeTitle, setVolumeTitle] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [volumeId, setVolumeId] = useState<number | string>();

  useEffect(() => {
    fetchStoryVolume();
  }, [storyId, currentPage, pageSize, sortQuery]);

  const fetchStoryVolume = async () => {
    setIsLoading(true);
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (sortQuery) {
      query += sortQuery;
    }
    const res = await getStoryVolume(
      storyId
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
              type: "chapter",
              status: itemC.status,
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
          <span>
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
            {record.type === "chapter" ? (
              <>
                <Tooltip title="Sửa chương">
                  <EPButton
                    icon={<LuFileEdit className="fs-5" />}
                    onClick={() =>
                      navigate(
                        getEditChapterURL(
                          storyId,
                          record.id,
                          slugify(record.name)
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
                        navigate(getReviewDetailAChapterURL(storyId, record.id))
                      }
                    />
                  </Tooltip>
                )}
              </>
            ) : (
              <Tooltip title="Sửa tiêu đề">
                <EPButton
                  icon={<LuFileEdit className="fs-5" />}
                  onClick={() => {
                    setVolumeTitle(record.name);
                    setVolumeId(record.id);
                    setIsEditMode(true);
                    setIsModalOpen(true);
                  }}
                />
              </Tooltip>
            )}
            {record.type === "chapter" && (
              <Popconfirm
                title="Xóa chương"
                description="Bạn có muốn xóa chương này không?"
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => handleDeleteChapter(record.id)}
              >
                <EPButton danger icon={<MdDeleteOutline className="fs-5" />} />
              </Popconfirm>
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

  const renderHeader = () => {
    return (
      <div className="d-flex gap-3 justify-content-between">
        <div className="d-flex gap-3">
          <Button onClick={() => setIsModalOpen(true)}>Thêm tập mới</Button>
        </div>
      </div>
    );
  };

  const handleDeleteChapter = async (id: number | string) => {
    const res = await deleteChapter(id);
    if (res && res.ec === 0) {
      toast.success(res.em);
      fetchStoryVolume();
    } else {
      toast.error(res.em);
    }
  };

  const handleVolumeActions = async () => {
    if (!volumeTitle) {
      toast.error("Tên không được để trống");
      return;
    }
    let res;
    if (isEditMode) {
      res = await updateVolume({
        volumeId: volumeId!,
        volumeTitle,
      });
    } else {
      res = await addVolume({
        storyId: storyId,
        volumeTitle,
      });
    }
    if (res && res.ec === 0) {
      toast.success(res.em);
      setIsModalOpen(false);
      setVolumeTitle("");
      isEditMode && setIsEditMode(false);
      fetchStoryVolume();
    } else {
      toast.error(res.em);
    }
  };

  return (
    <>
      <div className="posted-volumes-container">
        <div className="posted-volumes-content">
          <Table
            title={renderHeader}
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
      <Modal
        title="Tạo tập mới cho truyện"
        open={isModalOpen}
        okText={isEditMode ? "Lưu thay đổi" : "Tạo"}
        cancelText="Hủy"
        onOk={() => handleVolumeActions()}
        onCancel={() => {
          setIsModalOpen(false);
          setVolumeTitle("");
        }}
      >
        <Input
          placeholder="Tên của tập"
          value={volumeTitle}
          onChange={(e) => setVolumeTitle(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default PostedVolumes;
