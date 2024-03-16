import { FC, useState } from "react";
import "./EPModalTopUp.scss";
import {
  Button,
  Col,
  Form,
  FormProps,
  InputNumber,
  Modal,
  Row,
  Tabs,
} from "antd";
import { toast } from "react-toastify";
import {
  MomoTopUp,
  VNPayTopUp,
} from "../../../../services/transaction-api-service";
import { IPropsEPModal } from "../../../../interfaces/global.interface";
import EPButton from "../../../EP-UI/Button";

interface IProps extends IPropsEPModal {}

enum EPaymentMethod {
  VNPAY = "VNPAY",
  MOMO = "MOMO",
}

const momoPrices = [
  {
    amount: 5000,
  },
  {
    amount: 10000,
  },
  {
    amount: 20000,
  },
  {
    amount: 50000,
  },
  {
    amount: 100000,
  },
  {
    amount: 200000,
  },
  {
    amount: 500000,
  },
  {
    amount: 1000000,
  },
];

const EPModalTopUp: FC<IProps> = (props: IProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();
  const [chosenPayment, setChosenPayment] = useState<string>(
    EPaymentMethod.VNPAY
  );

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps["onFinish"] = async (amount) => {
    if (amount.requiredAmount <= -1) {
      toast.error("Số tiền nạp không được chứa giá trị âm");
    } else {
      let res;
      switch (chosenPayment) {
        case EPaymentMethod.VNPAY:
          res = await VNPayTopUp(amount);
          break;
      }
      if (res && res.ec === 0) {
        window.open(res.dt.paymentUrl, "_blank");
        form.resetFields();
      } else {
        toast.error(res.em);
      }
    }
  };

  const handleMomoTopUp = async (amount) => {
    const res = await MomoTopUp({ requiredAmount: amount });
    if (res && res.ec === 0) {
      window.open(res.dt.paymentUrl, "_blank");
      form.resetFields();
    } else {
      toast.error(res.em);
    }
  };

  return (
    <Modal
      className="w-50"
      title="Nạp tiền"
      open={isModalOpen}
      okText="Report"
      maskClosable={false}
      footer={null}
      onCancel={handleCancel}
    >
      <Tabs
        defaultActiveKey={chosenPayment}
        type="card"
        onChange={(value) => setChosenPayment(value)}
        items={[
          {
            key: EPaymentMethod.VNPAY,
            label: (
              <img
                width={40}
                height={40}
                src="https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png"
              />
            ),
            children: <></>,
          },
          {
            key: EPaymentMethod.MOMO,
            label: (
              <img
                width={40}
                height={40}
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
              />
            ),
            children: <></>,
          },
        ]}
      />
      <div className="payment-content mb-3">
        {chosenPayment === EPaymentMethod.VNPAY ? (
          <div>
            <Form onFinish={onFinish} form={form}>
              <Form.Item
                name="requiredAmount"
                rules={[
                  {
                    // min: 1,
                    required: true,
                    message: "Hãy nhập số tiền bạn cần nạp!",
                  },
                ]}
              >
                <InputNumber
                  addonBefore={"VND"}
                  size="large"
                  placeholder="Số tiền cần nạp"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  className="w-100"
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Thanh toán
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <>
            <i className="fs-6">
              Phương thức thanh toán qua ví MoMo chỉ áp dụng với các mức thanh
              toán bên dưới.
            </i>
            <Row gutter={[10, 10]} className="w-100">
              {momoPrices.map((item) => {
                return (
                  <Col span={12}>
                    <EPButton
                      color="#29b6f6"
                      block
                      type="primary"
                      key={`momo-amount-${item.amount}`}
                      onClick={() => handleMomoTopUp(item.amount)}
                    >
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.amount)}
                    </EPButton>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </div>
      <span className="fs-6">
        Giao dịch sẽ được xử lý trong 1-2 phút. Nếu sau 10 phút bạn vẫn chưa
        nhận được TLT vui lòng chụp ảnh GD có{" "}
        <strong>kèm thời gian cụ thể và nội dung chuyển khoản</strong> vào page
        của The Genesis. Chúng tôi sẽ hỗ trợ bạn trong khung giờ từ 9:00-18:00.
        Trân trọng cảm ơn!
      </span>
    </Modal>
  );
};

export default EPModalTopUp;
