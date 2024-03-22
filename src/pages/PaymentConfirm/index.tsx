import { FC } from "react";
import "./PaymentConfirm.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Paragraph, Text } = Typography;

interface IProps {}

const PaymentConfirmPage: FC<IProps> = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const result = searchParams.get("resultCode");
  const message = searchParams.get("message");

  return (
    <div className="payment-confirm-container">
      <div className="payment-confirm-content container d-flex justify-content-center">
        {result === "0" ? (
          <Result
            status="success"
            title={message}
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
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
            subTitle="Please check and modify the following information before resubmitting."
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
