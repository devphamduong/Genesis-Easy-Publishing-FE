import { FC, useEffect, useState } from "react";
import "./ReadStory.scss";
import { App, Button, Col, Descriptions, FloatButton, Modal, Row } from "antd";
import {
  ExclamationCircleFilled,
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { getChapterNumber } from "./shared/function";
import { dayjsFrom, kFormatter } from "../../shared/function";
import EPButton from "../../components/EP-UI/Button";
import { IChapterContent } from "../../interfaces/story.interface";
import { getChapterContent } from "../../services/story-api-service";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import {
  getAuthorDetailURL,
  getStoryDetailURL,
} from "../../shared/generate-navigate-url";
import { FcVip } from "react-icons/fc";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoMdDoneAll } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import EPModalReport from "../../components/EP-Common/Modal/Report";
import EPModalBuyChapters from "../../components/EP-Common/Modal/BuyChapters";
import EPModalTopUp from "../../components/EP-Common/Modal/TopUp";
import { buySingleChapter } from "../../services/transaction-api-service";
import { toast } from "react-toastify";
import { updateAccountBalance } from "../../redux/account/accountSlice";
import { EUpdateBalanceAction } from "../../enums/transaction.enum";
import { IUpdateBalanceAction } from "../../interfaces/transaction.interface";
const { confirm } = Modal;

interface IProps {}

const ReadStoryPage: FC<IProps> = (props: IProps) => {
  const { modal } = App.useApp();
  const { id, chapter } = useParams();
  const dispatch = useDispatch();
  const account = useSelector((state: IRootState) => state.account.user);
  const [currentChapter, setCurrentChapter] = useState<number>(
    getChapterNumber(chapter!)
  );
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalBuyChaptersOpen, setIsModalBuyChaptersOpen] =
    useState<boolean>(false);
  const [isSubmittedLike, setIsSubmittedLike] = useState<boolean>(false);
  const [chapterContent, setChapterContent] = useState<IChapterContent>();
  const [isModalTopUpOpen, setIsModalTopUpOpen] = useState<boolean>(false);

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

  const showConfirmBuyChapter = (storyId: number | string, price: number) => {
    modal.confirm({
      title: (
        <span>
          Mua chương giá <strong>{price}</strong> TLT
        </span>
      ),
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc không?",
      okText: "Mua",
      cancelText: "Bỏ qua",
      onOk() {
        handleBuySingleChapter(storyId, price);
      },
      onCancel() {},
    });
  };

  const handleNextChapter = () => {
    const newEndPoint = window.location.pathname.replace(
      `chapter-${chapterContent?.chapterNumber}`,
      `chapter-${chapterContent?.nextChapterNumber}`
    );
    history.replaceState(null, "", newEndPoint);
    chapterContent?.nextChapterNumber !== -1 &&
      setCurrentChapter(chapterContent!.nextChapterNumber);
  };

  const handlePrevChapter = () => {
    const newEndPoint = window.location.pathname.replace(
      `chapter-${chapterContent?.chapterNumber}`,
      `chapter-${currentChapter - 1}`
    );
    history.replaceState(null, "", newEndPoint);
    currentChapter - 1 > 0 && setCurrentChapter(currentChapter - 1);
  };

  const handleBuySingleChapter = async (id: number | string, price: number) => {
    const res = await buySingleChapter(id);
    if (res && res.ec === 0) {
      toast.success(res.em);
      fetchChapterContent();
      dispatch(
        updateAccountBalance({
          updateAction: EUpdateBalanceAction.BUY,
          amount: price,
        } as IUpdateBalanceAction)
      );
    } else {
      toast.error(res.em);
    }
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
                  onClick={() => handlePrevChapter()}
                >
                  <LeftOutlined />
                  <span>Trước</span>
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  disabled={chapterContent?.nextChapterNumber === -1}
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                  onClick={() => handleNextChapter()}
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
                  <strong>{chapterContent?.chapterPrice}</strong> Tử Linh Thạch
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
                      showConfirmBuyChapter(
                        chapterContent!.chapterId,
                        chapterContent!.chapterPrice
                      )
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
                    onClick={() => setIsModalTopUpOpen(true)}
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
                  onClick={() => handlePrevChapter()}
                >
                  <LeftOutlined />
                  <span>Trước</span>
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  disabled={chapterContent?.nextChapterNumber === -1}
                  type="primary"
                  size={"large"}
                  className="d-flex gap-1 align-items-center w-100 justify-content-center"
                  onClick={() => handleNextChapter()}
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
                        dayjsFrom(chapterContent?.updateTime)}
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
        storyId={id}
      />
      <EPModalBuyChapters
        isModalOpen={isModalBuyChaptersOpen}
        setIsModalOpen={setIsModalBuyChaptersOpen}
      />
      <EPModalTopUp
        isModalOpen={isModalTopUpOpen}
        setIsModalOpen={setIsModalTopUpOpen}
      />
    </>
  );
};

export default ReadStoryPage;
