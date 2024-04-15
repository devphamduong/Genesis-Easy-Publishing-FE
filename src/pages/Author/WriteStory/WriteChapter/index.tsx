import { FC, useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import "./WriteChapter.scss";
import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import {
  IVolume,
  IWriteChapterForm,
} from "../../../../interfaces/story.interface";
import { CheckOutlined } from "@ant-design/icons";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  addChapter,
  getChapterInformation,
  getVolumes,
  updateChapter,
} from "../../../../services/author-api-service";
import { toast } from "react-toastify";

interface IProps {}

const mdParser = new MarkdownIt(/* Markdown-it options */);

const WriteChapterPage: FC<IProps> = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const mode = searchParams.get("mode");
  const storyId = searchParams.get("storyId") ?? location?.state?.storyId;
  const chapterId = searchParams.get("chapterId");
  const storyTitle: string = location?.state?.storyTitle;
  const [form] = Form.useForm<IWriteChapterForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volumes, setVolumes] = useState<IVolume[]>([]);
  const [contentMarkdown, setContentMarkdown] = useState<string>("");
  const [contentHTML, setContentHTML] = useState<string>("");

  useEffect(() => {
    storyId && fetchVolumes();
    if (mode === "edit") {
      fetchChapterInformation();
    }
  }, [storyId]);

  const fetchVolumes = async () => {
    const res = await getVolumes(storyId);
    if (res && res.ec === 0) {
      setVolumes(res.dt);
      form.setFieldsValue({
        storyTitle: storyTitle,
        volumeId: res.dt[res.dt.length - 1]?.volumeId,
      });
    } else {
      toast.error(res.em);
    }
  };

  const fetchChapterInformation = async () => {
    const res = await getChapterInformation(chapterId!);
    if (res && res.ec === 0) {
      form.setFieldsValue({
        storyTitle: res.dt.storyTitle,
        chapterTitle: res.dt.chapterTitle,
        volumeId: res?.dt?.volumeId,
        chapterPrice: res.dt.chapterPrice,
      });
      handleEditorChange({
        html: res.dt.chapterContentHtml,
        text: res.dt.chapterContentMarkdown,
      });
    } else {
      toast.error(res.em);
    }
  };

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

  const onFinish = async (values: IWriteChapterForm) => {
    const payload: IWriteChapterForm = {
      ...values,
      storyId,
      chapterContentMarkdown: contentMarkdown,
      chapterContentHtml: contentHTML,
    };
    setIsLoading(true);
    let res;
    if (mode === "add") {
      res = await addChapter(payload);
    } else {
      res = await updateChapter({ ...payload, chapterId: chapterId! });
    }
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
      handleEditorChange({
        html: "",
        text: "",
      });
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="write-chapter-container my-3">
      <div className="write-chapter-content container">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={[20, 0]}>
                <Col span={7}>
                  <Form.Item<IWriteChapterForm>
                    label="Tựa Đề"
                    name="chapterTitle"
                    rules={[
                      {
                        required: true,
                        message: "Tựa đề không được để trống!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Tên tiếng việt của chương"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<IWriteChapterForm>
                    label="Truyện"
                    name="storyTitle"
                  >
                    <Input size="large" disabled={true} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item<IWriteChapterForm>
                    label="Tập"
                    name="volumeId"
                    rules={[
                      {
                        required: true,
                        message: "Tập truyện phải được chọn!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Chọn tập mà bạn muốn thêm"
                      options={
                        volumes &&
                        volumes?.map((item) => {
                          return {
                            value: item.volumeId,
                            label: (
                              <span>
                                Tập {item.volumeNumber}: {item.volumeTitle}
                              </span>
                            ),
                          };
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item<IWriteChapterForm>
                    label="Giá"
                    name="chapterPrice"
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
                      placeholder="Giá của 1 chương truyện"
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{2})+(?!\d))/g, ",")
                      }
                      parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                      className="w-100"
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
                  value={contentMarkdown}
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
                    <span>Thêm chương mới</span>
                  )}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WriteChapterPage;
