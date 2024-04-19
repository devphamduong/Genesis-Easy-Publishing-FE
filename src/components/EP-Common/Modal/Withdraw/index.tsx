import { FC, useEffect, useState } from "react";
import "./EPModalWithdraw.scss";
import { Card, Col, Form, FormProps, InputNumber, Modal, Row } from "antd";
import { toast } from "react-toastify";
import { IPropsEPModal } from "../../../../interfaces/global.interface";
import EPCondition from "../../../EP-UI/Condition";
import { IWithdrawForm } from "../../../../interfaces/transaction.interface";
import { EBankImage, EBankTye } from "../../../../enums/transaction.enum";
import { sendWithdrawRequest } from "../../../../services/transaction-api-service";
import { useBreakpoint } from "../../../../hooks/customHooks";

interface IProps extends IPropsEPModal {}

const EPModalWithdraw: FC<IProps> = (props: IProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm();
  const [chosenPayment, setChosenPayment] = useState<{
    value: string;
    image: string;
  }>();
  const [bankOptions, setBankOptions] = useState<
    {
      value: string;
      image: string;
    }[]
  >([]);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (isModalOpen) {
      initBankOptions();
    }
  }, [isModalOpen]);

  const initBankOptions = () => {
    const options: {
      value: string;
      image: string;
    }[] = [];
    Object.keys(EBankTye).forEach((key, index) => {
      options.push({
        value: EBankTye[key],
        image: EBankImage[key],
      });
    });
    setBankOptions(options);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps["onFinish"] = async (values: IWithdrawForm) => {
    if (!chosenPayment) {
      toast.error("Hãy chọn ngân hàng");
      return;
    }
    const res = await sendWithdrawRequest({
      ...values,
      bankAccount: values.bankAccount + "",
      bankId: chosenPayment?.value,
    });
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
    } else {
      toast.error(res.em);
    }
  };

  return (
    <Modal
      className={`${
        breakpoint === "xs"
          ? "w-100"
          : breakpoint === "sm" || breakpoint === "md" || breakpoint === "lg"
          ? "w-75"
          : "w-50"
      } ep-modal-withdraw`}
      title="Tạo yêu cầu rút tiền"
      open={isModalOpen}
      okText="Tạo yêu cầu"
      cancelText="Hủy"
      maskClosable={false}
      onOk={() => form.submit()}
      onCancel={handleCancel}
    >
      <div className="mt-3">
        <Card className="card-bank">
          {bankOptions.map((item, index) => {
            return (
              <Card.Grid
                className={`pointer bank-option ${
                  item.value === chosenPayment?.value ? "active" : ""
                }`}
                key={`bank-option-${index}`}
                style={{ backgroundImage: `url(${item.image})` }}
                onClick={() => setChosenPayment(item)}
              ></Card.Grid>
            );
          })}
        </Card>
        <Form form={form} className="mt-3" layout="inline" onFinish={onFinish}>
          <Row className="w-100" gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Form.Item<IWithdrawForm>
                name="bankAccount"
                label="Số tài khoản"
                rules={[
                  {
                    required: true,
                    message: "Số tài khoản không được để trống",
                  },
                ]}
              >
                <InputNumber size="large" className="w-100" min={1} />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item<IWithdrawForm>
                name="amount"
                label="Số TLT muốn rút"
                rules={[
                  { required: true, message: "Số TLT không được để trống" },
                ]}
              >
                <InputNumber size="large" className="w-100" min={1} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="fs-6 my-3">
        Yêu cầu sẽ được xử lý trong 5-7 ngày. Nếu sau 7 ngày bạn vẫn chưa nhận
        được tiền rút, vui lòng chụp ảnh GD có{" "}
        <strong>kèm thời gian cụ thể và nội dung chuyển khoản</strong> vào page
        của The Genesis. Chúng tôi sẽ hỗ trợ bạn trong khung giờ từ 9:00-18:00.
        Trân trọng cảm ơn!
      </div>
      <EPCondition />
    </Modal>
  );
};

export default EPModalWithdraw;
