import { FC } from "react";
import "./Deposit.scss";
import TransactionHistoryPage from "./TransactionHistory";

interface IProps {}

const DepositPage: FC<IProps> = (props: IProps) => {
  return (
    <>
      DepositPage
      <TransactionHistoryPage />
    </>
  );
};

export default DepositPage;
