import { FC, useState } from "react";
import "./Deposit.scss";
import TransactionHistoryPage from "./TransactionHistory";
import EPModalTopUp from "../../../components/EP-Common/Modal/TopUp";

interface IProps {}

const DepositPage: FC<IProps> = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <EPModalTopUp isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <TransactionHistoryPage />
    </>
  );
};

export default DepositPage;
