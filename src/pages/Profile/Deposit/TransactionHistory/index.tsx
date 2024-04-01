import { FC, useEffect, useState } from "react";
import "./TransactionHistory.scss";
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import { Table, TableProps, Tag } from "antd";
import { getTransactionHistory } from "../../../../services/transaction-api-service";
import {
  ITransactionHistory,
  IWalletInfor,
} from "../../../../interfaces/transaction.interface";
import { dayjsFrom } from "../../../../shared/function";
import dayjs from "dayjs";

interface IProps {
  wallet?: IWalletInfor;
}

const PAGE_SIZE = 10;

const TransactionHistoryPage: FC<IProps> = (props: IProps) => {
  const { wallet } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionHistory, setTransactionHistory] = useState<
    ITransactionHistory[]
  >([]);

  useEffect(() => {
    fetchTransactionHistory();
  }, [currentPage, pageSize]);

  const fetchTransactionHistory = async () => {
    const res = await getTransactionHistory(currentPage, pageSize);
    if (res && res.ec === 0) {
      setTransactionHistory(res.dt.list);
      setTotalTransactions(res.dt.total);
    }
  };

  const columns: TableProps["columns"] = [
    {
      title: "",
      dataIndex: "key",
      key: "key",
      render(value, record, index) {
        return <span>{(currentPage - 1) * pageSize + index + 1}</span>;
      },
    },
    {
      title: "Hoạt động",
      dataIndex: "description",
      key: "description",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thời gian",
      dataIndex: "transactionTime",
      key: "transactionTime",
      render(value, record: ITransactionHistory, index) {
        return (
          <span>
            {dayjs(record.transactionTime).format("DD/MM/YYYY")}{" "}
            <i className="time">({dayjsFrom(record.transactionTime)})</i>
          </span>
        );
      },
    },
    {
      title: "Số lượng (TLT)",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const renderHeader = () => {
    return (
      <div className="sum-transaction mt-2">
        <div>
          <strong className="fs-4">Lịch sử giao dịch</strong>
        </div>
        {wallet && (
          <div className="d-flex align-items-center justify-content-between">
            <Tag
              icon={<GoArrowDown className="fs-4" />}
              color="success"
              className="fs-5 d-flex align-items-center"
            >
              <p>
                Tiền vào: {wallet?.amount_top_up + wallet?.amount_received} TLT
              </p>
            </Tag>
            <Tag
              icon={<GoArrowUp className="fs-4" />}
              color="success"
              className="fs-5 d-flex align-items-center"
            >
              <p>
                Tiền ra: {wallet?.amount_withdrawn + wallet?.amount_spent} TLT
              </p>
            </Tag>
          </div>
        )}
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
        <Table
          title={renderHeader}
          rowKey={"transactionId"}
          onChange={onChangePagination}
          loading={isLoading}
          columns={columns}
          dataSource={transactionHistory}
          pagination={{
            current: currentPage,
            total: totalTransactions,
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
