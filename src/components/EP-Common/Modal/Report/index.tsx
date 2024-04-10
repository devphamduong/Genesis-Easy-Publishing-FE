import { FC, useEffect, useState } from "react";
import "./EPModalReport.scss";
import { Form, Input, InputNumber, Modal, Select } from "antd";
import {
  IPropsEPModal,
  IReportOption,
} from "../../../../interfaces/global.interface";
import { getReportOptions } from "../../../../services/common-api-service";
import { IReportForm } from "../../../../interfaces/story.interface";
import { reportStory } from "../../../../services/story-api-service";
import { toast } from "react-toastify";
const { Option } = Select;
const { TextArea } = Input;

interface IProps extends IPropsEPModal {
  inChapter?: number;
  storyId?: string | number;
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
  const { isModalOpen, setIsModalOpen, inChapter, storyId } = props;
  const [form] = Form.useForm<IReportForm>();
  const [reportOptions, setReportOptions] = useState<IReportOption[]>([]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    fetchReportOptions();
  }, []);

  useEffect(() => {
    form.setFieldValue("chapterId", inChapter);
  }, [inChapter]);

  const fetchReportOptions = async () => {
    const res = await getReportOptions();
    if (res && res.ec === 0) {
      setReportOptions(res.dt);
    }
  };

  const onFinish = async (values: IReportForm) => {
    const payload = {
      ...values,
      storyId: +storyId!,
    };
    const res = await reportStory(payload);
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
      setIsModalOpen(false);
    } else {
      toast.error(res.em);
    }
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
      <Form {...formItemLayout} form={form} onFinish={onFinish}>
        <Form.Item<IReportForm>
          name="reportTypeId"
          label="Vấn đề"
          rules={[{ required: true, message: "Không được để trống!" }]}
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
        <Form.Item<IReportForm> name="reportContent" label="Mô tả">
          <TextArea
            showCount
            maxLength={100}
            placeholder="Mô tả vấn đề bạn gặp phải"
          />
        </Form.Item>
        {inChapter && (
          <Form.Item<IReportForm>
            name="chapterId"
            label="Trong chương"
            rules={[{ required: true, message: "Không được để trống! " }]}
          >
            <InputNumber disabled min={1} />
          </Form.Item>
        )}
        {/* {inChapter && (
          <Form.Item<IReportForm>
            name="commentId"
            label="Trong chương"
            rules={[{ required: true, message: "Không được để trống! " }]}
            initialValue={inChapter}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
        )} */}
      </Form>
    </Modal>
  );
};

export default EPModalReport;
