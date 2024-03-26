import { FC, useEffect, useState } from "react";
import "./TransactionHistory.scss";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { Table, TableProps, Tag } from "antd";
import { getTransactionHistory } from "../../../../services/transaction-api-service";

interface IProps {}

const PAGE_SIZE = 10;

const TransactionHistoryPage: FC<IProps> = (props: IProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalStories, setTotalStories] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionHistory, setTransactionHistory] = useState();

  useEffect(() => {
    fetchTransactionHistory();
  }, [currentPage, pageSize]);

  const fetchTransactionHistory = async () => {
    const res = await getTransactionHistory(currentPage, pageSize);
    if (res && res.ec === 0) {
      console.log(res);
      // transactionHistory(res.dt.)
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "Hoạt động",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Số lượng",
      dataIndex: "address",
      key: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const renderHeader = () => {
    return (
      <div className="sum-transaction mt-2 d-flex align-items-center justify-content-between">
        <Tag
          icon={<GoArrowDown className="fs-4" />}
          color="success"
          className="fs-5 d-flex align-items-center"
        >
          <p>Tiền vào: 9,758.23 TLT</p>
        </Tag>
        <Tag
          icon={<GoArrowUp className="fs-4" />}
          color="success"
          className="fs-5 d-flex align-items-center"
        >
          <p>Tiền ra: 961.23 TLT</p>
        </Tag>
      </div>
    );
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

  return (
    <div className="transaction-history-container">
      <div className="transaction-history-content">
        <strong className="fs-4">Lịch sử giao dịch</strong>
        <Table
          title={renderHeader}
          rowKey={"storyId"}
          onChange={onChangePagination}
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={{
            current: currentPage,
            total: totalStories,
            pageSize: pageSize,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trong tổng ${total} giao dịch`,
          }}
        />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
