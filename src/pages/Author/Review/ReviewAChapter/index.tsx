import { FC, useEffect, useState } from "react";
import "./ReviewAChapter.scss";
import { Button, Checkbox, Collapse, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useSearchParams } from "react-router-dom";
import {
  getReviewChapterInfo,
  getReviewDetailChapterInfo,
  sendReviewResult,
} from "../../../../services/review-api-service";
import {
  IReviewChapterForm,
  IReviewChapterInfo,
  IReviewDetailChapterInfo,
} from "../../../../interfaces/review.interface";
import { toast } from "react-toastify";
import { getAuthorDetailURL } from "../../../../shared/generate-navigate-url";

interface IProps {}

const ReviewAChapterPage: FC<IProps> = (props: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const chapterId = searchParams.get("chapterId");
  const mode = searchParams.get("mode");
  const [form] = Form.useForm<IReviewChapterForm>();
  const [reviewChapterInfo, setReviewChapterInfo] = useState<
    IReviewChapterInfo | IReviewDetailChapterInfo
  >();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    chapterId && fetchReviewChapterInfo();
  }, [chapterId]);

  const fetchReviewChapterInfo = async () => {
    let res;
    if (mode === "reviewing") {
      res = await getReviewChapterInfo(chapterId!);
    } else if (mode === "readOnly") {
      res = await getReviewDetailChapterInfo(chapterId!);
    }
    if (res && res.ec === 0) {
      if (mode === "reviewing") {
        setReviewChapterInfo(res.dt);
      } else if (mode === "readOnly") {
        setReviewChapterInfo(res.dt);
        form.setFieldsValue({
          spellingError: res.dt.review.spellingError,
          lengthError: res.dt.review.lengthError,
          politicalContentError: res.dt.review.politicalContentError,
          distortHistoryError: res.dt.review.distortHistoryError,
          secretContentError: res.dt.review.secretContentError,
          offensiveContentError: res.dt.review.offensiveContentError,
          unhealthyContentError: res.dt.review.unhealthyContentError,
          reviewContent: res.dt.review.reviewContent,
        });
      }
    }
  };

  const onFinish = async (values: IReviewChapterForm) => {
    const payload: IReviewChapterForm = {
      ...values,
      chapterId: chapterId!,
    };
    setIsLoading(true);
    const res = await sendReviewResult(payload);
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.setFieldsValue({
        chapterId: undefined,
        spellingError: undefined,
        lengthError: undefined,
        politicalContentError: undefined,
        distortHistoryError: undefined,
        secretContentError: undefined,
        offensiveContentError: undefined,
        unhealthyContentError: undefined,
        reviewContent: undefined,
      });
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="review-chapter-container">
      <div className="review-chapter-content">
        <div className="fs-4">
          Chương{" "}
          {mode === "reviewing"
            ? (reviewChapterInfo as IReviewChapterInfo)?.chapterNumber
            : (reviewChapterInfo as IReviewDetailChapterInfo).review.chapters
                .chapterNumber}
          :{" "}
          <strong>
            {mode === "reviewing"
              ? (reviewChapterInfo as IReviewChapterInfo)?.chapterTitle
              : (reviewChapterInfo as IReviewDetailChapterInfo).review.chapters
                  .chapterTitle}
          </strong>{" "}
          của truyện{" "}
          <strong>
            {mode === "reviewing"
              ? (reviewChapterInfo as IReviewChapterInfo)?.storyTitle
              : (reviewChapterInfo as IReviewDetailChapterInfo).review.chapters
                  .storyTitle}
          </strong>
        </div>
        <div
          className="my-3 w-75 mx-auto"
          dangerouslySetInnerHTML={{
            __html:
              mode === "reviewing"
                ? (reviewChapterInfo as IReviewChapterInfo)?.chapterContentHtml
                : (reviewChapterInfo as IReviewDetailChapterInfo).review
                    .chapters.chapterContentHtml,
          }}
        />
        <div className="rate-area">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item<IReviewChapterForm>
              name="spellingError"
              valuePropName="checked"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa lỗi chính tả.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="lengthError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Độ dài chương không quá dài hoặc quá ngắn.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="politicalContentError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa nội dung tuyên truyền chống Nhà nước Cộng hòa xã hội
                chủ nghĩa Việt Nam; phá hoại khối đại đoàn kết toàn dân tộc;
                truyền bá tư tưởng phản động; kích động chiến tranh xâm lược,
                gây hận thù giữa các dân tộc và nhân dân các nước.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="distortHistoryError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa nội dung xuyên tạc sự thật lịch sử, phủ nhận thành
                tựu cách mạng; xúc phạm dân tộc, danh nhân, anh hùng dân tộc;
                không thể hiện hoặc thể hiện không đúng chủ quyền quốc gia.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="secretContentError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa nội dung tiết lộ bí mật nhà nước, bí mật đời tư của
                cá nhân và bí mật khác do pháp luật quy định.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="offensiveContentError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa nội dung vu khống, xúc phạm uy tín của cơ quan, tổ
                chức và danh dự, nhân phẩm của cá nhân.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm>
              valuePropName="checked"
              name="unhealthyContentError"
            >
              <Checkbox disabled={mode === "readOnly"}>
                Không chứa nội dung nội dung kích động bạo lực, tuyên truyền lối
                sống dâm ô, đồi trụy, hành vi tội ác, tệ nạn xã hội, mê tín dị
                đoan, phá hoại thuần phong mỹ tục.
              </Checkbox>
            </Form.Item>
            <Form.Item<IReviewChapterForm> name="reviewContent">
              <div className="my-3 w-50 mx-auto">
                <TextArea
                  value={form.getFieldValue("reviewContent")}
                  disabled={mode === "readOnly"}
                  placeholder="Nhận xét của bạn"
                  autoSize={{ minRows: 3 }}
                />
              </div>
            </Form.Item>
            {mode === "reviewing" && (
              <Form.Item>
                <div className="text-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Gửi nhận xét
                  </Button>
                </div>
              </Form.Item>
            )}
          </Form>
        </div>
        {mode === "readOnly" && (
          <Collapse
            items={[
              {
                key: "reviewer",
                label: "Thông tin của reviewer",
                children: (
                  <>
                    <p>
                      Tên đầy đủ:{" "}
                      <Link
                        to={getAuthorDetailURL(
                          (reviewChapterInfo as IReviewDetailChapterInfo)
                            ?.review?.reviewer?.userId
                        )}
                        className="link-hover"
                      >
                        {
                          (reviewChapterInfo as IReviewDetailChapterInfo)
                            ?.review?.reviewer?.userFullname
                        }
                      </Link>
                    </p>
                    <p>
                      Username:{" "}
                      {
                        (reviewChapterInfo as IReviewDetailChapterInfo)?.review
                          ?.reviewer?.username
                      }
                    </p>
                    <p>
                      Email:{" "}
                      {
                        (reviewChapterInfo as IReviewDetailChapterInfo)?.review
                          ?.reviewer?.email
                      }
                    </p>
                    <p>
                      Số điện thoại:{" "}
                      {
                        (reviewChapterInfo as IReviewDetailChapterInfo)?.review
                          ?.reviewer?.phone
                      }
                    </p>
                  </>
                ),
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewAChapterPage;
