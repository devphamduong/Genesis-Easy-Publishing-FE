import { FC, useEffect, useState } from "react";
import "./EditProfile.scss";
import { MdOutlineMail } from "react-icons/md";
import {
  Button,
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
  UploadProps,
  message,
} from "antd";
const { Option } = Select;
import { IEditProfileForm } from "../../interfaces/auth.interface";
import dayjs from "dayjs";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { updateAvatar, updateProfile } from "../../services/auth-api-service";
import { toast } from "react-toastify";
import {
  updateUserAvatarAction,
  updateUserInfoAction,
} from "../../redux/account/accountSlice";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
const mdParser = new MarkdownIt(/* Markdown-it options */);
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface IProps {}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const EditProfile: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account?.user);
  const [form] = Form.useForm<IEditProfileForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHTML, setContentHTML] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setContentMarkdown(account.descriptionMarkdown ?? "");
    setContentHTML(account.descriptionHTML ?? "");
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: `${import.meta.env.VITE_BACKEND_URL}Assets/images/avatar/${
          account.userImage
        }`,
      },
    ]);
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
    const payload: IEditProfileForm = {
      ...values,
      dob: dayjs(values.dob).format("YYYY-MM-DD"),
      descriptionMarkdown: contentMarkdown,
      descriptionHTML: contentHTML,
    };
    const res = await updateProfile(payload);
    if (res && res.ec === 0) {
      dispatch(
        updateUserInfoAction({ ...payload, access_token: res.dt.access_token })
      );
      toast.success(res.em);
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  const onChange: UploadProps["onChange"] = (info) => {
    const { fileList: newFileList, file } = info;
    const { status } = file;

    setFileList(newFileList);
    // if (status !== "uploading") {
    //   console.log(status, newFileList);
    // }
    if (status === "done") {
      message.success(`Cập nhật ảnh đại diện thành công.`);
    } else if (status === "error") {
      message.error(`Cập nhật ảnh đại diện thất bại.`);
    }
  };

  const handleUploadAvatar = async (options) => {
    const { file, onSuccess, onError } = options;
    const res = await updateAvatar(file);
    if (res && res.ec === 0) {
      const newAvatar = res.dt.fileUploaded;
      dispatch(updateUserAvatarAction(newAvatar));
      onSuccess("ok");
    } else {
      onError("An error occurred");
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content d-flex gap-2 flex-column flex-md-row">
        <div className="avatar">
          <ImgCrop>
            <Upload
              beforeUpload={beforeUpload}
              customRequest={handleUploadAvatar}
              listType="picture-circle"
              fileList={fileList}
              onChange={onChange}
              onPreview={handlePreview}
              maxCount={1}
            >
              {fileList && fileList.length < 2 && (
                <>
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </>
              )}
            </Upload>
          </ImgCrop>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
        <div className="info">
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
              phone: account.phone,
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
            <Form.Item<IEditProfileForm> label="Số điện thoại" name="phone">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <Form.Item<IEditProfileForm> label="Ngày sinh" name="dob">
              <DatePicker />
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
    </div>
  );
};

export default EditProfile;
