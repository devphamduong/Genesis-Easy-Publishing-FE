import { FC, useState } from "react";
import "./EPModalBuyChapters.scss";
import { Form, Button, Modal, Steps, message, theme, InputNumber } from "antd";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
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
  const { isModalOpen, setIsModalOpen } = props;
  const { token } = theme.useToken();
  const [current, setCurrent] = useState<number>(0);
  const [form] = Form.useForm<IFormBuyChapters>();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values: IFormBuyChapters) => {
    console.log(values);
  };

  return (
    <Modal
      className="w-75 ep-modal-buy-chapters"
      title="Mua Chương VIP Truyện Chẳng Lẽ Thật Sự Có Người Cảm Thấy Sư Tôn Là Phàm Nhân Sao (Dịch)"
      open={isModalOpen}
      okText="Report"
      maskClosable={false}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
    >
      <Steps labelPlacement={"vertical"} current={current} items={items} />
      {current === 0 ? (
        <div className="mt-3">
          <div>
            Vui lòng chọn khoảng chương bạn muốn mua, mặc định hệ thống sẽ chọn
            khoảng của tất cả chương VIP có trong truyện.
          </div>
          <div>
            Hệ thống sẽ tự lọc bỏ những chương đã mua, nên bạn cứ thoải mái chọn
            khoảng đầu và cuối. <strong>Đã mua: 0 chương</strong>.
          </div>
          <Form form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item<IFormBuyChapters>
              name="from"
              label="Từ chương"
              rules={[{ required: true }]}
              // initialValue={inChapter}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item<IFormBuyChapters>
              name="to"
              label="Đến chương"
              rules={[{ required: true }]}
              // initialValue={inChapter}
            >
              <InputNumber min={1} max={10} />
            </Form.Item>
            <Form.Item>
              <Button type="primary">MUA CHƯƠNG</Button>
              <Button type="primary">MUA FULL CHƯƠNG VIP</Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        ""
      )}
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default EPModalBuyChapters;
