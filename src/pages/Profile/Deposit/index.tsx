import { FC, useEffect, useState } from "react";
import "./Deposit.scss";
import TransactionHistoryPage from "./TransactionHistory";
import EPModalTopUp from "../../../components/EP-Common/Modal/TopUp";
import { IWalletInfor } from "../../../interfaces/transaction.interface";
import { getWallet } from "../../../services/transaction-api-service";
import { TLT_CURRENCY } from "../../../enums/transaction.enum";
import EPButton from "../../../components/EP-UI/Button";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { Flex } from "antd";
import EPModalWithdraw from "../../../components/EP-Common/Modal/Withdraw";

interface IProps {}

const DepositPage: FC<IProps> = (props: IProps) => {
  const [isModalTopUpOpen, setIsModalTopUpOpen] = useState<boolean>(false);
  const [isModalWithdrawOpen, setIsModalWithdrawOpen] =
    useState<boolean>(false);
  const [wallet, setWallet] = useState<IWalletInfor>();

  useEffect(() => {
    fetchWalletInfor();
  }, []);

  const fetchWalletInfor = async () => {
    const res = await getWallet();
    if (res && res.ec === 0) {
      setWallet(res.dt);
    }
  };

  return (
    <>
      <div className="deposit-container">
        <div className="deposit-content">
          <div>
            Số dư: <strong>{wallet?.fund}</strong> TLT
          </div>
          <div>
            TLT thu được từ bán truyện, chương:{" "}
            <strong>{wallet?.amount_received}</strong> TLT
          </div>
          <div>
            Số tiền đã nạp:{" "}
            <strong>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                wallet?.amount_received
                  ? wallet.amount_received * TLT_CURRENCY
                  : 0
              )}
            </strong>
          </div>
          <div>
            Số tiền có thể rút:{" "}
            <strong>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(wallet?.refund ? wallet.refund * TLT_CURRENCY : 0)}
            </strong>
          </div>
          <div>
            Số tiền đã rút:{" "}
            <strong>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                wallet?.amount_withdrawn
                  ? wallet.amount_withdrawn * TLT_CURRENCY
                  : 0
              )}
            </strong>
          </div>
          <div>
            Số tiền đã tiêu:{" "}
            <strong>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                wallet?.amount_spent ? wallet.amount_spent * TLT_CURRENCY : 0
              )}
            </strong>
          </div>
          <Flex gap={10}>
            <EPButton
              color="#09bb07"
              className="d-flex align-items-center justify-content-center"
              type="primary"
              icon={<RiMoneyDollarCircleFill className="fs-5" />}
              onClick={() => setIsModalTopUpOpen(true)}
            >
              Nạp TLT
            </EPButton>
            <EPButton
              color="#09bb07"
              className="d-flex align-items-center justify-content-center"
              type="primary"
              icon={<GiTakeMyMoney className="fs-5" />}
              onClick={() => setIsModalWithdrawOpen(true)}
            >
              Rút tiền
            </EPButton>
          </Flex>
          <TransactionHistoryPage wallet={wallet} />
        </div>
      </div>
      <EPModalTopUp
        isModalOpen={isModalTopUpOpen}
        setIsModalOpen={setIsModalTopUpOpen}
      />
      <EPModalWithdraw
        isModalOpen={isModalWithdrawOpen}
        setIsModalOpen={setIsModalWithdrawOpen}
      />
    </>
  );
};

export default DepositPage;
