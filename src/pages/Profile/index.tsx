import { FC, useState } from "react";
import "./Profile.scss";
import { Upload, UploadFile, UploadProps, message } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import EditProfile from "../../components/EditProfile";

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

const ProfilePage: FC<IProps> = (props: IProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const account = useSelector((state: IRootState) => state.account?.user);

  const onChange: UploadProps["onChange"] = (info) => {
    const { fileList: newFileList, file } = info;
    const { status } = file;

    setFileList(newFileList);
    if (status !== "uploading") {
      console.log(status, newFileList);
    }
    if (status === "done") {
      message.success(`${status} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${status} file upload failed.`);
    }
  };

  const handleUploadAvatar = (options) => {
    const { file, onSuccess, onError } = options;
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="info d-flex  gap-2">
          <div className="avatar d-flex">
            <ImgCrop>
              <Upload
                // action=""
                beforeUpload={beforeUpload}
                customRequest={handleUploadAvatar}
                listType="picture-circle"
                fileList={fileList}
                onChange={onChange}
                // onPreview={onPreview}
                maxCount={1}
              >
                {fileList.length < 2 && (
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
          </div>
          <div className="name main-info">
            <strong className="fs-4">Hey, {account.username}</strong>
            <EditProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
