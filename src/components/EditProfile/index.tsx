import { FC, useState } from "react";
import "./EditProfile.scss";
import { MdOutlineMail } from "react-icons/md";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
const { Option } = Select;
import { IEditProfileForm } from "../../interfaces/auth.interface";
import dayjs from "dayjs";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
}

const EditProfile: FC<IProps> = (props: IProps) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [form] = Form.useForm<IEditProfileForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHTML, setContentHTML] = useState<string>("");

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setContentMarkdown(text);
    setContentHTML(html);
    console.log(text, html);
  };

  const onFinish = async (values: IEditProfileForm) => {
    console.log(values);
    // const res = await login(values);
    // if (res && res.ec === 0) {
    //   localStorage.setItem("access_token", res.dt.access_token);
    //   dispatch(loginAction(res.dt.user));
    //   toast.success(res.em);
    //   navigate("/");
    // resetFields();
    // } else {
    //   toast.error(res.em);
    // }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    resetFields();
  };

  const resetFields = () => {
    form.resetFields();
    setContentMarkdown("");
    setContentHTML("");
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {};

  return (
    <Modal
      className="w-50"
      title="Edit profile"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel}>Cancel</Button>,
        <Button
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Save changes
        </Button>,
      ]}
    >
      <div className="edit-profile-container">
        <div className="edit-profile-content">
          <p>
            Email của bạn sẽ được giữ bí mật theo Quy định về Riêng tư đã thỏa
            thuận khi đăng ký tài khoản, các thông tin khác sẽ là công khai.
          </p>
          <div className="email d-flex align-items-center gap-2">
            <MdOutlineMail />
            <span>duongpche163153@fpt.edu.vn</span>
          </div>
          <Form
            form={form}
            initialValues={{ remember: false }}
            onFinish={onFinish}
          >
            <Form.Item<IEditProfileForm> label="Họ Tên" name="userFullName">
              <Input placeholder="Enter your full name" />
            </Form.Item>
            <Form.Item<IEditProfileForm> label="Địa chỉ" name="address">
              <Input placeholder="Enter your address" />
            </Form.Item>
            <Form.Item<IEditProfileForm> label="Ngày sinh" name="dob">
              <DatePicker onChange={onChangeDate} />
            </Form.Item>
            <Form.Item<IEditProfileForm> name="gender" label="Giới tính">
              <Select placeholder="Select your gender">
                <Option value={true}>Male</Option>
                <Option value={false}>Female</Option>
              </Select>
            </Form.Item>
            <p>Giới thiệu thêm về bản thân:</p>
            <MdEditor
              style={{ height: "300px" }}
              value={contentMarkdown}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfile;
