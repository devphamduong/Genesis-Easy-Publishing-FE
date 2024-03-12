import { FC, useEffect, useState } from "react";
import "./ReadStory.scss";
import { Button, Col, Descriptions, FloatButton, Modal, Row } from "antd";
import {
  ExclamationCircleFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { getChapterNumber } from "./shared/function";
import { kFormatter } from "../../shared/function";
import EPButton from "../../components/EP-UI/Button";
import { IChapterContent } from "../../interfaces/story.interface";
import { getChapterContent } from "../../services/story-api.service";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import {
  getAuthorDetailURL,
  getStoryDetailURL,
} from "../../shared/generate-navigate-url";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { FcVip } from "react-icons/fc";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import EPModalReport from "../../components/EP-Common/Modal/Report";
import EPModalBuyChapters from "../../components/EP-Common/Modal/BuyChapters";
dayjs.extend(relativeTime);
const { confirm } = Modal;

interface IProps {}

const ReadStoryPage: FC<IProps> = (props: IProps) => {
  const { id, chapter } = useParams();
  const account = useSelector((state: IRootState) => state.account.user);
  const [currentChapter, setCurrentChapter] = useState<number>(
    getChapterNumber(chapter!)
  );
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalBuyChaptersOpen, setIsModalBuyChaptersOpen] =
    useState<boolean>(false);
  const [isSubmittedLike, setIsSubmittedLike] = useState<boolean>(false);
  const [chapterContent, setChapterContent] = useState<IChapterContent>();

  useEffect(() => {
    fetchChapterContent();
  }, [id, currentChapter]);

  const fetchChapterContent = async () => {
    const res = await getChapterContent(id!, currentChapter);
    if (res && res.ec === 0) {
      setChapterContent(res.dt);
    }
  };

  const handleLikeStory = () => {
    setIsSubmittedLike(true);
  };

  const showConfirmBuyChapter = (price: number) => {
    confirm({
      title: (
        <span>
          Mua chương giá <strong>{price}</strong> TLT
        </span>
      ),
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc không?",
      cancelText: "Bỏ qua",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <div className="read-story-container">
        <div className="read-story-content container py-3 d-flex flex-column gap-3">
          <div className="buttons">
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Button
                  disabled={currentChapter === 1}
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                >
                  <LeftOutlined />
                  <span>Trước</span>
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                >
                  <span>Tiếp</span>
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </div>
          {chapterContent && chapterContent?.owned ? (
            <div className="content noselect">{chapterContent?.content}</div>
          ) : (
            chapterContent && (
              <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
                <FcVip className="fs-1" />
                <div>
                  Chương này là chương VIP, để xem nội dung bạn cần{" "}
                  <strong>{chapterContent?.chapterPrice}</strong> Tử Linh Thạch{" "}
                  (TLT).
                </div>
                <div className="d-flex flex-column gap-2 text-center">
                  <EPButton
                    color="#09bb07"
                    className="d-flex align-items-center justify-content-center"
                    type="primary"
                    icon={<IoCheckmark />}
                    size={"large"}
                    onClick={() =>
                      showConfirmBuyChapter(chapterContent!.chapterPrice)
                    }
                  >
                    Mua Chương Này
                  </EPButton>
                  <EPButton
                    color="#09bb07"
                    className="d-flex align-items-center justify-content-center"
                    type="primary"
                    icon={<IoMdDoneAll />}
                    size={"large"}
                    onClick={() => setIsModalBuyChaptersOpen(true)}
                  >
                    Mua Full
                  </EPButton>
                  <EPButton
                    color="#09bb07"
                    className="d-flex align-items-center justify-content-center"
                    type="primary"
                    icon={<RiMoneyDollarCircleFill />}
                    size={"large"}
                  >
                    Nạp TLT
                  </EPButton>
                </div>
              </div>
            )
          )}
          <div className="d-flex justify-content-center gap-3">
            {chapterContent?.owned && (
              <Button
                type={isSubmittedLike ? "primary" : undefined}
                danger
                size="large"
                icon={<HeartOutlined />}
                onClick={() => handleLikeStory()}
              >
                <span>{isSubmittedLike ? "Đã thích" : "Ta thích"}</span>
              </Button>
            )}
            <EPButton
              icon={<WarningOutlined />}
              size="large"
              warning
              onClick={() => setIsModalReportOpen(true)}
            >
              Report
            </EPButton>
          </div>
          <div className="sort-description">
            Bạn đang đọc
            <Link
              to={getStoryDetailURL(id!, chapter!.split(".")[0])}
              className="name link-hover"
            >
              {" "}
              {chapterContent?.story.storyTitle}{" "}
            </Link>
            của
            <Link
              to={getAuthorDetailURL(chapterContent?.author.userId)}
              className="author link-hover"
            >
              {" "}
              {chapterContent?.author.userFullname}
            </Link>
          </div>
          <div className="buttons">
            <Row gutter={[10, 10]}>
              <Col span={12}>
                <Button
                  disabled={currentChapter === 1}
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                >
                  <LeftOutlined />
                  <span>Trước</span>
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                >
                  <span>Tiếp</span>
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </div>
          <Descriptions
            layout="vertical"
            bordered
            items={[
              {
                key: "1",
                label: <strong>Thông Tin Chương Truyện</strong>,
                children: (
                  <Row>
                    <Col span={2} className="text-lighter">
                      Đăng bởi
                    </Col>{" "}
                    <Col span={22}>MongoDB</Col>
                    <Col span={2} className="text-lighter">
                      Thời gian
                    </Col>{" "}
                    <Col span={22}>dds.mongo.mid</Col>
                    <Col span={2} className="text-lighter">
                      Cập nhật
                    </Col>{" "}
                    <Col span={22}>
                      {chapterContent?.updateTime &&
                        dayjs(chapterContent?.updateTime).fromNow()}
                    </Col>
                    <Col span={2} className="text-lighter">
                      Lượt mua
                    </Col>{" "}
                    <Col span={22}>{chapterContent?.userPurchaseChapter}</Col>
                    <Col span={2} className="text-lighter">
                      Lượt đọc
                    </Col>{" "}
                    <Col span={22}>{kFormatter(19999)}</Col>
                  </Row>
                ),
              },
            ]}
            size="small"
          />
        </div>
      </div>
      <FloatButton.BackTop />
      <EPModalReport
        isModalOpen={isModalReportOpen}
        setIsModalOpen={setIsModalReportOpen}
        inChapter={currentChapter}
      />
      <EPModalBuyChapters
        isModalOpen={isModalBuyChaptersOpen}
        setIsModalOpen={setIsModalBuyChaptersOpen}
      />
    </>
  );
};

export default ReadStoryPage;
