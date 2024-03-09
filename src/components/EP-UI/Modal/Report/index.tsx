import { FC, useEffect, useState } from "react";
import "./EPModalReport.scss";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import { IReportOption } from "../../../../interfaces/global.interface";
import { getReportOptions } from "../../../../services/common-api.service";
const { Option } = Select;
const { TextArea } = Input;

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  inChapter?: number;
}

interface IFormReport {
  problem: string;
  description?: string;
  inChapter?: number;
}

const formItemLayout = {
  labelCol: {
    //   xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    //   xs: { span: 24 },
    sm: { span: 17 },
  },
};

const EPModalReport: FC<IProps> = (props: IProps) => {
  const { isModalOpen, setIsModalOpen, inChapter } = props;
  const [form] = Form.useForm<IFormReport>();
  const [reportOptions, setReportOptions] = useState<IReportOption[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchTop6PurchaseStories();
  }, []);

  const fetchTop6PurchaseStories = async () => {
    const res = await getReportOptions();
    if (res && res.ec === 0) {
      setReportOptions(res.dt);
    }
  };

  const onFinish = (values: IFormReport) => {
    console.log(values);
  };

  return (
    <Modal
      title="Report"
      open={isModalOpen}
      okText="Report"
      maskClosable={false}
      onOk={() => {
        form.submit();
      }}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
      >
        <Form.Item<IFormReport>
          name="problem"
          label="Vấn đề"
          rules={[{ required: true, message: "Bắt buộc!" }]}
        >
          <Select placeholder="Chọn vấn đề" allowClear>
            {reportOptions?.map((item, index) => {
              return (
                <Option key={`option-${index + 1}`} value={item.reportTypeId}>
                  {item.reportTypeContent}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item<IFormReport>
          name="description"
          label="Mô tả"
          rules={[{ required: true }]}
        >
          <TextArea
            showCount
            maxLength={100}
            placeholder="Mô tả vấn đề bạn gặp phải"
          />
        </Form.Item>
        {inChapter && (
          <Form.Item<IFormReport>
            name="inChapter"
            label="Trong chương"
            rules={[{ required: true }]}
            initialValue={inChapter}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default EPModalReport;
