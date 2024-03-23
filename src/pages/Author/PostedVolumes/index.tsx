import { FC, useEffect, useState } from "react";
import "./PostedVolumes.scss";
import { Popconfirm, Select, Table, TableColumnsType, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import {
  deleteChapter,
  getStoryVolume,
} from "../../../services/author-api-service";
import { IChapter, IStory, IVolume } from "../../../interfaces/story.interface";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import EPButton from "../../../components/EP-UI/Button";
import { MdDeleteOutline, MdPublic } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getChapterEditURL,
  getEditChapterURL,
} from "../../../shared/generate-navigate-url";
import { slugify } from "../../../shared/function";
dayjs.extend(relativeTime);
import { v4 as uuidv4 } from "uuid";
import { LuFileEdit } from "react-icons/lu";
import { toast } from "react-toastify";

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
  children?: DataType[];
}

const PostedVolumesPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  const [volumes, setVolumes] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalVolumes, setTotalVolumes] = useState<number>(0);
  const [sortQuery, setSortQuery] = useState<string>("");
  const account = useSelector((state: IRootState) => state.account.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStoryVolume();
  }, [currentPage, pageSize, sortQuery]);

  const fetchStoryVolume = async () => {
    setIsLoading(true);
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (sortQuery) {
      query += sortQuery;
    }
    const res = await getStoryVolume(
      1
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
      title: "NGÀY TẠO",
      dataIndex: "createTime",
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
    },
    {
      title: "",
      dataIndex: "actions",
      render(value, record) {
        return (
          <div className="d-flex gap-2">
            {record.type === "chapter" && (
              <>
                <Tooltip title="Sửa chương">
                  <EPButton
                    icon={<LuFileEdit className="fs-5" />}
                    onClick={() =>
                      navigate(
                        getEditChapterURL(1, record.id, slugify(record.name))
                      )
                    }
                  />
                </Tooltip>
                <Tooltip title="Công bố">
                  <EPButton
                    icon={<MdPublic className="fs-5" />}
                    // onClick={() =>
                    //   navigate(
                    //     getWriteChapterURL(
                    //       record.storyId,
                    //       slugify(record.storyTitle)
                    //     ),
                    //     {
                    //       state: {
                    //         storyId: record.storyId,
                    //         storyTitle: record.storyTitle,
                    //       },
                    //     }
                    //   )
                    // }
                  />
                </Tooltip>
              </>
            )}
            {record.type === "chapter" && (
              <Popconfirm
                title="Xóa chương"
                description="Bạn có muốn xóa chương này không?"
                okText="Xóa"
                cancelText="Hủy"
                onConfirm={() => handleDeleteChapter(record.id)}
              >
                <EPButton
                  danger
                  icon={<MdDeleteOutline className="fs-5" />}
                  onClick={() => handleDeleteChapter(record.id)}
                />
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

  const onChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
  };

  const renderHeader = () => {
    return (
      <div className="d-flex gap-3 justify-content-between">
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

  const handleDeleteChapter = async (id: number | string) => {
    const res = await deleteChapter(id);
    if (res && res.ec === 0) {
      toast.success(res.em);
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
    </>
  );
};

export default PostedVolumesPage;
