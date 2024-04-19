import { FC, useEffect, useState } from "react";
import "./EPModalBuyChapters.scss";
import {
  Form,
  Button,
  Modal,
  Steps,
  theme,
  InputNumber,
  Row,
  Col,
  Card,
  Result,
} from "antd";
import { MdShoppingCart } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../../../redux/store";
import { IPropsEPModal } from "../../../../interfaces/global.interface";
import {
  IDataTransactionBuyChapters,
  IInformationBuyChapters,
  IUpdateBalanceAction,
} from "../../../../interfaces/transaction.interface";
import {
  buyChapters,
  getInformationBuyMultipleChapters,
  getTransactionBuyMultipleChapters,
} from "../../../../services/transaction-api-service";
import { toast } from "react-toastify";
import { updateAccountBalance } from "../../../../redux/account/accountSlice";
import { EUpdateBalanceAction } from "../../../../enums/transaction.enum";
import { useBreakpoint } from "../../../../hooks/customHooks";

interface IProps extends IPropsEPModal {
  storyId?: number | string;
  storyTitle: string;
  fetchChapterContent: () => void;
}

interface IFormBuyChapters {
  from: number;
  to: number;
}

const steps = [
  {
    title: "Chọn Chương",
    content: "First-content",
  },
  {
    title: "Xác Nhận Mua",
    content: "Second-content",
  },
  {
    title: "Hoàn Thành",
    content: "Last-content",
  },
];

const items = steps.map((item) => ({ key: item.title, title: item.title }));

const EPModalBuyChapters: FC<IProps> = (props: IProps) => {
  const {
    isModalOpen,
    setIsModalOpen,
    storyId,
    storyTitle,
    fetchChapterContent,
  } = props;
  const [dataTransactionChapters, setDataTransactionChapters] =
    useState<IDataTransactionBuyChapters>();
  const [informationBuyChapters, setInformationBuyChapters] =
    useState<IInformationBuyChapters>();
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account.user);
  const [current, setCurrent] = useState<number>(0);
  const [form] = Form.useForm<IFormBuyChapters>();
  const [numberOfChaptersSucceed, setNumberOfChaptersSucceed] =
    useState<number>(0);
  const [isBuyFull, setIsBuyFull] = useState(false);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    isModalOpen === true && fetchInformationBuyMultipleChapters();
  }, [isModalOpen]);

  useEffect(() => {
    switch (current) {
      case 1:
        fetchTransactionBuyMultipleChapters();
        break;
      case 2:
        buyMultipleChapters();
        break;
      default:
        fetchInformationBuyMultipleChapters();
        break;
    }
  }, [current]);

  const fetchInformationBuyMultipleChapters = async () => {
    const res = await getInformationBuyMultipleChapters(storyId!);
    if (res && res.ec === 0) {
      setInformationBuyChapters(res.dt);
      form.setFieldValue("to", res.dt.chapter_story_max);
    }
  };

  const fetchTransactionBuyMultipleChapters = async () => {
    const res = await getTransactionBuyMultipleChapters(
      form.getFieldValue("from"),
      isBuyFull
        ? informationBuyChapters?.chapter_story_max
        : form.getFieldValue("to"),
      storyId!
    );
    if (res && res.ec === 0) {
      setDataTransactionChapters(res.dt);
    }
  };

  const buyMultipleChapters = async () => {
    const res = await buyChapters(
      form.getFieldValue("from"),
      form.getFieldValue("to"),
      storyId!
    );
    if (res && res.ec === 0) {
      setNumberOfChaptersSucceed(res.dt.chapter_buy);
      toast.success(`Bạn đã mua ${res.dt.chapter_buy} chương thành công`);
      dispatch(
        updateAccountBalance({
          updateAction: EUpdateBalanceAction.BUY,
          amount: res.dt.amount,
        } as IUpdateBalanceAction)
      );
      setTimeout(() => {
        setIsModalOpen(false);
        fetchChapterContent();
      }, 3000);
    } else {
      toast.error(res.em);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values: IFormBuyChapters) => {
    next();
  };

  return (
    <Modal
      className="w-75 ep-modal-buy-chapters"
      title={`Mua Chương VIP Truyện ${storyTitle}`}
      open={isModalOpen}
      maskClosable={false}
      footer={null}
      onCancel={() => {
        setIsModalOpen(false);
        form.resetFields();
      }}
    >
      <div>
        <Steps labelPlacement={"vertical"} current={current}>
          <Steps.Step
            title="Bước 1"
            description=""
            // status={current === 1 ? "finish" : "process"}
          />
          <Steps.Step
            title="Bước 2"
            description=""
            // status={current === 2 ? "finish" : "process"}
          />
          <Steps.Step
            title="Bước 3"
            description=""
            // status={current === 2 ? "finish" : "process"}
          />
        </Steps>
      </div>
      {current === 0 ? (
        <div className="mt-3">
          <div>
            Vui lòng chọn khoảng chương bạn muốn mua, mặc định hệ thống sẽ chọn
            khoảng của tất cả chương VIP có trong truyện.
          </div>
          <div>
            Hệ thống sẽ tự lọc bỏ những chương đã mua, nên bạn cứ thoải mái chọn
            khoảng đầu và cuối.{" "}
            <strong>
              Đã mua: {informationBuyChapters?.user_chapter} chương
            </strong>
            .
          </div>
          <Form
            form={form}
            className="mt-3"
            layout={breakpoint === "xs" ? "vertical" : "inline"}
            onFinish={onFinish}
            initialValues={{
              from: 1,
              to: form.getFieldValue("to"),
            }}
          >
            <Row className="w-100" gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Form.Item<IFormBuyChapters>
                  name="from"
                  label="Từ chương"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <InputNumber
                    size="large"
                    className="w-100"
                    min={1}
                    max={form.getFieldValue("to")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item<IFormBuyChapters>
                  name="to"
                  label="Đến chương"
                  rules={[{ required: true, message: "Không được để trống" }]}
                >
                  <InputNumber
                    size="large"
                    className="w-100"
                    min={1}
                    max={form.getFieldValue("to")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item>
                  <Button block size="large" type="primary" htmlType="submit">
                    MUA CHƯƠNG
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item>
                  <Button
                    block
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() => setIsBuyFull(true)}
                  >
                    MUA FULL CHƯƠNG VIP
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      ) : current === 1 ? (
        <div className="mt-3 d-flex flex-column gap-3">
          <div>
            <div className="d-flex align-items-center justify-content-between fs-4">
              <div className="d-flex align-items-center gap-3">
                <MdShoppingCart className="fs-3" color="rgba(0, 0, 0, 0.54)" />
                <span>Số chương mua</span>
              </div>
              <strong>{dataTransactionChapters?.number_chapter_buy}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between fs-4">
              <div className="d-flex align-items-center gap-3">
                <RiMoneyDollarCircleFill
                  className="fs-3"
                  color="rgba(0, 0, 0, 0.54)"
                />
                <span>TLT tiêu phí</span>
              </div>
              <strong>{dataTransactionChapters?.amount}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between fs-4">
              <span>TLT Tổng thanh toán</span>
              <strong>{dataTransactionChapters?.amount}</strong>
            </div>
          </div>
          <Button
            block
            size="large"
            type="primary"
            icon={<IoCheckmark />}
            onClick={() => next()}
          >
            THANH TOÁN
          </Button>
          <div className="fs-6">
            <i>
              Bạn đang có{" "}
              <strong>{dataTransactionChapters?.balance} TLT</strong> trong tài
              khoản <strong>{account.username}</strong>.
            </i>
          </div>
          <Card
            title="Một số lưu ý khi mua chương VIP tại The Genesis"
            size="small"
          >
            <ul>
              <li>TLT là viết tắt của Tử Linh Thạch.</li>
              <li>
                Bạn phải nạp TLT vào tài khoản trước khi mua chương. Nạp TLT có
                trong trang tài khoản.
              </li>
              <li>Mỗi chương có thể có giá TLT khác nhau.</li>
              <li>
                Mỗi thời điểm chương cũng sẽ có giá khác nhau tùy vào nhóm dịch
                phụ trách.
              </li>
            </ul>
          </Card>
        </div>
      ) : (
        <Result
          status="success"
          title={<p>Mua thành công {numberOfChaptersSucceed} chương</p>}
        />
      )}
      <div className="text-end" style={{ marginTop: 24 }}>
        {current > 0 && current <= 1 && (
          <Button
            style={{ margin: "0 8px" }}
            onClick={() => {
              prev();
              current === 1 && setIsBuyFull(false);
            }}
          >
            Quay lại
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default EPModalBuyChapters;
