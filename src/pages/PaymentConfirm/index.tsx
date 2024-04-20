import { FC, useEffect, useState } from "react";
import "./PaymentConfirm.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  EUpdateBalanceAction,
  TLT_CURRENCY,
} from "../../enums/transaction.enum";
import { addTransactionTopUp } from "../../services/transaction-api-service";
import { IRootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PacmanLoader } from "react-spinners";
import { updateAccountBalanceAction } from "../../redux/account/accountSlice";
import { IUpdateBalanceAction } from "../../interfaces/transaction.interface";

const { Paragraph, Text } = Typography;

interface IProps {}

const PaymentConfirmPage: FC<IProps> = (props: IProps) => {
  const account = useSelector((state: IRootState) => state.account.user);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const result = searchParams.get("resultCode");
  const message = searchParams.get("message");
  const amount = searchParams.get("amount");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (result === "0") {
      addTransaction();
    }
  }, [result]);

  const addTransaction = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const res = await addTransactionTopUp(+amount! / TLT_CURRENCY);
      if (res && res.ec === 0) {
        toast.success(res.em);
        dispatch(
          updateAccountBalanceAction({
            updateAction: EUpdateBalanceAction.TOPUP,
            amount: res.dt.amount,
          } as IUpdateBalanceAction)
        );
      } else {
        toast.error(res.em);
      }
      setIsLoading(false);
    }, 5000);
  };

  return (
    <div className="payment-confirm-container">
      <div className="payment-confirm-content container d-flex align-items-center justify-content-center">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <PacmanLoader color="#36d7b7" />
            <div className="fs-6 text-center">Vui lòng chờ...</div>
          </div>
        ) : result === "0" ? (
          <Result
            status="success"
            title={message}
            subTitle={
              <span className="fs-5">
                Bạn vừa nạp{" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(+amount!)}{" "}
                thành công.
              </span>
            }
            extra={[
              <Button type="primary" onClick={() => navigate("/")}>
                Trang chủ
              </Button>,
              <Button key="buy">Mua tiếp</Button>,
            ]}
          />
        ) : (
          <Result
            className="w-75"
            status="error"
            title={message}
            subTitle={<span className="fs-5">Nạp thất bại.</span>}
            extra={[
              <Button type="primary" onClick={() => navigate("/")}>
                Trang chủ
              </Button>,
              <Button key="buy">Mua lại</Button>,
            ]}
          >
            <div className="desc">
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  The content you submitted has the following error:
                </Text>
              </Paragraph>
              <Paragraph>
                <CloseCircleOutlined className="site-result-demo-error-icon" />
                Your account has been frozen. <a>Thaw immediately &gt;</a>
              </Paragraph>
              <Paragraph>
                <CloseCircleOutlined className="site-result-demo-error-icon" />
                Your account is not yet eligible to apply.
                <a>Apply Unlock &gt;</a>
              </Paragraph>
            </div>
          </Result>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmPage;
