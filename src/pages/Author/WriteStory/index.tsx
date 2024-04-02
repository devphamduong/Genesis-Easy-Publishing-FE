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
  InputNumber,
  Radio,
  Row,
  Select,
  Tooltip,
  UploadProps,
  message,
} from "antd";
import { useSelector } from "react-redux";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CheckOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { IRootState } from "../../../redux/store";
import { IWriteStoryForm } from "../../../interfaces/story.interface";
import { getPlainTextFromHTML } from "../../../shared/function";
import { ICategory } from "../../../interfaces/category.interface";
import { toast } from "react-toastify";
import {
  createStory,
  getStoryInformation,
  updateStory,
} from "../../../services/author-api-service";
import { ERouteEndPointForAuthor } from "../../../enums/route-end-point.enum";
import { EStoryStatusKey, EStoryStatusLabel } from "../../../enums/story.enum";
import AIGenerateImage from "./AIGenerateImage";
import { uploadStoryCover } from "../../../services/story-api-service";

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

interface IProps {}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteStoryPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm<IWriteStoryForm>();
  const categories: ICategory[] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const storyId = searchParams.get("storyId");
  const [descriptionMarkdown, setDescriptionMarkdown] = useState<string>(
    "**Phần tóm tắt viết ở đây!!**"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [descriptionHTML, setDescriptionHTML] = useState<string>("");
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const account = useSelector((state: IRootState) => state.account.user);
  const [previewImgName, setPreviewImgName] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (storyId && mode === "edit") {
      fetchStoryInformation();
    }
  }, [storyId]);

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

  const fetchStoryInformation = async () => {
    const res = await getStoryInformation(storyId!);
    if (res && res.ec === 0) {
      form.setFieldsValue({
        storyTitle: res.dt.storyTitle,
        categoryIds: res.dt.storyCategories.map((item) => item.categoryId),
        status: res.dt.status,
        storyPrice: +res.dt.storyPrice,
        storySale: res.dt.storySale,
      });
      handleEditorChange({
        html: res.dt.storyDescriptionHtml ?? "",
        text: res.dt.storyDescriptionMarkdown ?? "",
      });
    } else {
      toast.error(res.em);
    }
  };

  const onFinish = async (values: IWriteStoryForm) => {
    if (values.storyPrice <= -1 || values.storySale <= -1) {
      toast.error("Giá truyện hoặc SALE không được chứa giá trị âm");
      return;
    }
    const payload: IWriteStoryForm = {
      ...values,
      storyId: storyId!,
      storyImage: previewImgName,
      authorId: account.userId,
      storyDescription: getPlainTextFromHTML(descriptionHTML),
      storyDescriptionMarkdown: descriptionMarkdown,
      storyDescriptionHtml: descriptionHTML,
    };
    setIsLoading(true);
    let res;
    if (mode === "edit") {
      res = await updateStory(payload);
    } else {
      res = await createStory(payload);
    }
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
      setDescriptionMarkdown("");
      setDescriptionHTML("");
      if (mode === "edit")
        navigate(`${ERouteEndPointForAuthor.WRITE_STORY}?mode=add`);
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  const handleUploadStoryCover = async (options) => {
    const { file, onSuccess, onError } = options;
    const res = await uploadStoryCover(file);
    if (res && res.ec === 0) {
      setPreviewImgName(res.dt.fileUploaded);
      onSuccess("ok");
    } else {
      onError("An error occurred");
    }
  };

  const propsUpLoad: UploadProps = {
    name: "file",
    // multiple: true,
    // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    beforeUpload: beforeUpload,
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
    customRequest: handleUploadStoryCover,
  };

  return (
    <div className="write-story-container my-3">
      <div className="write-story-content">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ status: 0 }}
            >
              <Row>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label="Tựa Đề"
                    name="storyTitle"
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
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Loại truyện không được để trống!",
                    //   },
                    // ]}
                  >
                    <Input
                      size="large"
                      placeholder="Loại truyện mà bạn sắp viết"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item<IWriteStoryForm>
                    label="Thể loại"
                    name="categoryIds"
                    rules={[
                      {
                        required: true,
                        message: "Ít nhất 1 thể loại được chọn!",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      size="large"
                      maxTagCount="responsive"
                      allowClear
                      placeholder="Thể loại"
                      options={
                        categories &&
                        categories?.map((item) => {
                          return {
                            value: item.categoryId,
                            label: item.categoryName,
                          };
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item<IWriteStoryForm>
                    label={
                      <div className="d-flex align-items-center gap-1">
                        <span>Trạng thái của truyện</span>
                        <Tooltip
                          title={
                            <span>
                              "Truyện của bạn chỉ có thể đổi trạng thái khi đã
                              đạt đủ điều kiện (mặc định truyện chưa đủ điều
                              kiện sẽ có trạng thái "Chưa đủ điều kiện")
                            </span>
                          }
                        >
                          <BsInfoCircleFill className="pointer" />
                        </Tooltip>
                      </div>
                    }
                    name="status"
                  >
                    <Radio.Group buttonStyle="solid">
                      <Radio.Button
                        value={EStoryStatusKey.NOT_PUBLIC}
                        disabled={
                          form.getFieldValue("status") >
                          EStoryStatusKey.NOT_PUBLIC
                        }
                      >
                        {EStoryStatusLabel.NOT_PUBLIC}
                      </Radio.Button>
                      <Radio.Button
                        value={EStoryStatusKey.NOT_COMPLETED}
                        disabled={
                          !form.getFieldValue("status") ||
                          form.getFieldValue("status") ===
                            EStoryStatusKey.NOT_PUBLIC
                        }
                      >
                        {EStoryStatusLabel.NOT_COMPLETED}
                      </Radio.Button>
                      <Radio.Button
                        value={EStoryStatusKey.COMPLETED}
                        disabled={
                          !form.getFieldValue("status") ||
                          form.getFieldValue("status") ===
                            EStoryStatusKey.NOT_PUBLIC
                        }
                      >
                        {EStoryStatusLabel.COMPLETED}
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {mode === "edit" && (
                  <>
                    <Col span={7}>
                      <Form.Item<IWriteStoryForm>
                        label="Giá gốc của truyện"
                        name="storyPrice"
                        rules={[
                          {
                            required: true,
                            message: "Giá không được để trống",
                          },
                        ]}
                      >
                        <InputNumber
                          addonBefore={"TLT"}
                          size="large"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                          }
                          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                          className="w-100"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item<IWriteStoryForm>
                        label="Giá SALE"
                        name="storySale"
                      >
                        <InputNumber
                          addonBefore={"%"}
                          size="large"
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                          }
                          parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                          className="w-100"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
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
                  loading={isLoading}
                  disabled={isLoading}
                  onClick={() => form.submit()}
                >
                  {mode === "edit" ? (
                    <span>Lưu thay đổi</span>
                  ) : (
                    <span>Lưu truyện mới</span>
                  )}
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
                src={
                  previewImgName
                    ? `${
                        import.meta.env.VITE_BACKEND_URL
                      }Assets/images/avatar/${previewImgName}`
                    : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                }
              />
            </div>
          </Col>
        </Row>
      </div>
      <AIGenerateImage />
    </div>
  );
};

export default WriteStoryPage;
