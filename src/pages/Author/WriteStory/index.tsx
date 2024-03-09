import { FC, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteStory.scss";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Tooltip,
  UploadProps,
  message,
} from "antd";
import { IWriteStoryForm } from "../../interfaces/story.interface";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CheckOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

interface IProps {}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteStoryPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm<IWriteStoryForm>();
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>(
    "**Phần tóm tắt viết ở đây!!**"
  );
  const [descriptionHTML, setDescriptionHTML] = useState<string>("");
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleEditorChange = ({
    html,
    text,
  }: {
    html: string;
    text: string;
  }) => {
    setDescriptionMarkdown(text);
    setDescriptionHTML(html);
  };

  const onFinish = async (values: IWriteStoryForm) => {
    console.log(values);
    // setIsLoading(true);
    // const res = await login(values);
    // if (res && res.ec === 0) {
    //   localStorage.setItem("access_token", res.dt.access_token);
    //   dispatch(loginAction(res.dt.user));
    //   toast.success(res.em);
    //   navigate("/");
    //   form.resetFields();
    // } else {
    //   toast.error(res.em);
    // }
    // setIsLoading(false);
  };

  const propsUpLoad: UploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="write-story-container my-3">
      <div className="write-story-content">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Row>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label="Tựa Đề"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Tựa đề không được để trống!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Tên tiếng việt của truyện"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label={
                      <div className="d-flex align-items-center gap-1">
                        <span>Loại Truyện</span>
                        <Tooltip title="Hãy lựa chọn cho đúng vì bạn không thể thay đổi sau này.">
                          <BsInfoCircleFill className="pointer" />
                        </Tooltip>
                      </div>
                    }
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Loại truyện không được để trống!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Loại truyện mà bạn sắp viết"
                    />
                  </Form.Item>
                  <span></span>
                </Col>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label="Tác giả"
                    name="author"
                    rules={[
                      {
                        required: true,
                        message: "Tác giả không được để trống!",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Truyện của tác giả" />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label="Thể loại"
                    name="category"
                    rules={[
                      {
                        required: true,
                        message: "Thể loại không được để trống!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Truyện Lựa chọn thể loại truyện"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                help="Tóm tắt cho truyện không nên quá dài mà nên ngắn gọn, tập trung, thú
                vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không."
              >
                <MdEditor
                  style={{ height: "300px" }}
                  value={descriptionMarkdown}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  icon={<CheckOutlined />}
                  type="primary"
                  onClick={() => form.submit()}
                >
                  Lưu truyện mới
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6} className="upload d-flex flex-column gap-3">
            <Dragger {...propsUpLoad}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
            <div className="text-center">
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WriteStoryPage;
