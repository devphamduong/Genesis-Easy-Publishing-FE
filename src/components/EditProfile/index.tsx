import { FC, useEffect, useState } from "react";
import "./EditProfile.scss";
import { MdOutlineMail } from "react-icons/md";
import { Button, DatePicker, DatePickerProps, Form, Input, Select } from "antd";
const { Option } = Select;
import { IEditProfileForm } from "../../interfaces/auth.interface";
import dayjs from "dayjs";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { updateProfile } from "../../services/auth-api.service";
import { toast } from "react-toastify";
import { updateUserInfo } from "../../redux/account/accountSlice";
const mdParser = new MarkdownIt(/* Markdown-it options */);

interface IProps {}

const EditProfile: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account?.user);
  const [form] = Form.useForm<IEditProfileForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHTML, setContentHTML] = useState<string>("");

  useEffect(() => {
    account.descriptionMarkdown &&
      setContentMarkdown(account.descriptionMarkdown);
  }, []);

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setContentMarkdown(text);
    setContentHTML(html);
  };

  const onFinish = async (values: IEditProfileForm) => {
    setIsLoading(true);
    const payload = {
      ...values,
      descriptionMarkdown: contentMarkdown,
      descriptionHTML: contentHTML,
    };
    const res = await updateProfile(payload);
    if (res && res.ec === 0) {
      dispatch(updateUserInfo(payload));
      toast.success(res.em);
      resetFields();
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  const handleCancel = () => {
    resetFields();
  };

  const resetFields = () => {
    form.resetFields();
    setContentMarkdown("");
    setContentHTML("");
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {};

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <p>
          Email của bạn sẽ được giữ bí mật theo Quy định về Riêng tư đã thỏa
          thuận khi đăng ký tài khoản, các thông tin khác sẽ là công khai.
        </p>
        <div className="email d-flex align-items-center gap-2 mb-2">
          <MdOutlineMail className="fs-5" />
          <span>{account.email}</span>
        </div>
        <Form
          form={form}
          initialValues={{
            userFullname: account?.userFullname,
            address: account?.address,
            dob: account?.dob && dayjs(account?.dob),
            gender: account?.gender,
          }}
          onFinish={onFinish}
        >
          <Form.Item<IEditProfileForm> label="Họ Tên" name="userFullname">
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item<IEditProfileForm> label="Địa chỉ" name="address">
            <Input placeholder="Enter your address" />
          </Form.Item>
          <Form.Item<IEditProfileForm> label="Ngày sinh" name="dob">
            <DatePicker onChange={onChangeDate} />
          </Form.Item>
          <Form.Item<IEditProfileForm> label="Giới tính" name="gender">
            <Select placeholder="Select your gender">
              <Option value={"Male"}>Male</Option>
              <Option value={"Female"}>Female</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <p>Giới thiệu thêm về bản thân:</p>
            <MdEditor
              style={{ height: "300px" }}
              value={contentMarkdown}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </Form.Item>
          <Form.Item>
            <div className="d-flex gap-2 justify-content-end">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                disabled={isLoading}
                loading={isLoading}
                onClick={() => form.submit()}
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
