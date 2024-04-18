import { FC, useEffect, useState } from "react";
import "./ReadStory.scss";
import {
  App,
  Button,
  Col,
  Descriptions,
  Flex,
  FloatButton,
  InputNumber,
  Modal,
  Row,
  Switch,
} from "antd";
import {
  ExclamationCircleFilled,
  HeartOutlined,
  LeftOutlined,
  MoonOutlined,
  RightOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { getChapterNumber } from "./shared/function";
import { dayjsFrom } from "../../shared/function";
import EPButton from "../../components/EP-UI/Button";
import { IChapterContent } from "../../interfaces/story.interface";
import {
  getChapterContent,
  likeChapter,
} from "../../services/story-api-service";
import { useDispatch } from "react-redux";
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
import dayjs from "dayjs";
import { useBreakpoint } from "../../hooks/customHooks";
import { PiMagicWand } from "react-icons/pi";
import { TbTextSize } from "react-icons/tb";

interface IProps {}

const ReadStoryPage: FC<IProps> = (props: IProps) => {
  const { modal } = App.useApp();
  const { id, chapter } = useParams();
  const dispatch = useDispatch();
  const [currentChapter, setCurrentChapter] = useState<number>(
    getChapterNumber(chapter!)
  );
  const [isModalReportOpen, setIsModalReportOpen] = useState<boolean>(false);
  const [isModalBuyChaptersOpen, setIsModalBuyChaptersOpen] =
    useState<boolean>(false);
  const [isSubmittedLike, setIsSubmittedLike] = useState<boolean>(false);
  const [chapterContent, setChapterContent] = useState<IChapterContent>();
  const [isModalTopUpOpen, setIsModalTopUpOpen] = useState<boolean>(false);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const breakpoint = useBreakpoint();

  useEffect(() => {
    fetchChapterContent();
  }, [id, currentChapter]);

  const fetchChapterContent = async () => {
    const res = await getChapterContent(id!, currentChapter);
    if (res && res.ec === 0) {
      setChapterContent(res.dt);
    }
  };

  const handleLikeStory = async () => {
    const res = await likeChapter(
      chapterContent!.story.storyId!,
      chapterContent!.chapterNumber!
    );
    if (res && res.ec === 0) {
      setChapterContent((prevState) => ({
        ...prevState!,
        userLike: !prevState?.userLike,
      }));
    }
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
      `chapter-${chapterContent?.previousChapterNumber}`
    );
    history.replaceState(null, "", newEndPoint);
    chapterContent!.previousChapterNumber > 0 &&
      setCurrentChapter(chapterContent!.previousChapterNumber);
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

  const handleChangeFontSize = () => {
    modal.warning({
      title: <span>Đổi cỡ chữ</span>,
      icon: <ExclamationCircleFilled />,
      content: (
        <InputNumber
          controls={false}
          className="custom-font-size"
          value={fontSize}
          onChange={(e) => setFontSize(+e!)}
          addonBefore={
            <Button
              // block
              disabled={fontSize - 1 < 1}
              type="text"
              onClick={() => fontSize - 1 >= 1 && setFontSize(fontSize - 1)}
            >
              -
            </Button>
          }
          addonAfter={
            <Button
              // block
              disabled={fontSize + 1 >= 72}
              type="text"
              onClick={() => fontSize + 1 < 72 && setFontSize(fontSize + 1)}
            >
              +
            </Button>
          }
          min={1}
          max={72}
        />
      ),
    });
  };

  return (
    <>
      <div
        className={`read-story-container ${!isLightTheme ? "dark-theme" : ""}`}
      >
        <div className="read-story-content container py-3 d-flex flex-column gap-3">
          <div className="fs-4 text-center">
            Chương {chapterContent?.chapterNumber}:{" "}
            <strong>{chapterContent?.chapterTitle}</strong> của truyện{" "}
            <strong>{chapterContent?.story.storyTitle}</strong>
          </div>
          <div
            className={`buttons ${
              breakpoint !== "xs" && breakpoint !== "sm"
                ? "buttons-margin"
                : "buttons-remove-margin"
            }`}
          >
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
            <div
              className={`content ${
                breakpoint !== "xs" && breakpoint !== "sm" ? "w-75" : ""
              } mx-auto`}
            >
              <div
                className="no-select"
                style={{ fontSize: `${fontSize}px` }}
                dangerouslySetInnerHTML={{
                  __html: chapterContent?.content ?? "",
                }}
              />
              {/* <Flex
                align="center"
                justify="center"
                vertical
                gap={10}
                className="configs-read-story"
              >
                <InputNumber
                  controls={false}
                  className="custom-font-size"
                  value={fontSize}
                  onChange={(e) => setFontSize(+e!)}
                  addonBefore={
                    <Button
                      // block
                      disabled={fontSize - 1 < 1}
                      type="text"
                      onClick={() =>
                        fontSize - 1 >= 1 && setFontSize(fontSize - 1)
                      }
                    >
                      -
                    </Button>
                  }
                  addonAfter={
                    <Button
                      // block
                      disabled={fontSize + 1 >= 72}
                      type="text"
                      onClick={() =>
                        fontSize + 1 < 72 && setFontSize(fontSize + 1)
                      }
                    >
                      +
                    </Button>
                  }
                  min={1}
                  max={72}
                />
                <Switch
                  checkedChildren="Sáng"
                  unCheckedChildren="Tối"
                  defaultChecked={isLightTheme}
                  onChange={() => setIsLightTheme(!isLightTheme)}
                />
              </Flex> */}
            </div>
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
                    icon={<IoCheckmark className="fs-5" />}
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
                    icon={<IoMdDoneAll className="fs-5" />}
                    size={"large"}
                    onClick={() => setIsModalBuyChaptersOpen(true)}
                  >
                    Mua Theo Khoảng
                  </EPButton>
                  <EPButton
                    color="#09bb07"
                    className="d-flex align-items-center justify-content-center"
                    type="primary"
                    icon={<RiMoneyDollarCircleFill className="fs-5" />}
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
                type={chapterContent.userLike ? "primary" : undefined}
                danger
                size="large"
                icon={<HeartOutlined />}
                onClick={() => handleLikeStory()}
              >
                <span>{chapterContent.userLike ? "Đã thích" : "Ta thích"}</span>
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
          <div
            className={`buttons ${
              breakpoint !== "xs" && breakpoint !== "sm"
                ? "buttons-margin"
                : "buttons-remove-margin"
            }`}
          >
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
                    <Col xs={4} lg={2} className="text-lighter">
                      Đăng bởi
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      <Link
                        to={getAuthorDetailURL(chapterContent?.author.userId)}
                        className="author link-hover"
                      >
                        {" "}
                        {chapterContent?.author.userFullname}
                      </Link>
                    </Col>
                    <Col xs={4} lg={2} className="text-lighter">
                      Tên truyện
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      <Link
                        to={getStoryDetailURL(id!, chapter!.split(".")[0])}
                        className="name link-hover"
                      >
                        {" "}
                        {chapterContent?.story.storyTitle}{" "}
                      </Link>
                    </Col>
                    <Col xs={4} lg={2} className="text-lighter">
                      Tên chương
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      {chapterContent?.chapterTitle}
                    </Col>
                    <Col xs={4} lg={2} className="text-lighter">
                      Chương
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      {chapterContent?.chapterNumber}
                    </Col>
                    <Col xs={4} lg={2} className="text-lighter">
                      Thời gian
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      {dayjs(chapterContent?.createTime).format("DD/MM/YYYY")}{" "}
                      <i className="time">
                        ({dayjsFrom(chapterContent?.createTime ?? "")})
                      </i>
                    </Col>
                    <Col xs={4} lg={2} className="text-lighter">
                      Lượt mua
                    </Col>{" "}
                    <Col xs={20} lg={22}>
                      {chapterContent?.userPurchaseChapter}
                    </Col>
                  </Row>
                ),
              },
            ]}
            size="small"
          />
        </div>
      </div>
      <FloatButton.BackTop style={{ right: 94 }} />
      <FloatButton.Group shape="circle" trigger="click" icon={<PiMagicWand />}>
        <FloatButton
          icon={<MoonOutlined />}
          tooltip={isLightTheme ? <span>Sáng</span> : <span>Tối</span>}
          type={isLightTheme ? "default" : "primary"}
          onClick={() => setIsLightTheme(!isLightTheme)}
        />
        <FloatButton
          icon={<TbTextSize />}
          tooltip={<span>Cỡ chữ</span>}
          onClick={() => handleChangeFontSize()}
        />
      </FloatButton.Group>
      <EPModalReport
        isModalOpen={isModalReportOpen}
        setIsModalOpen={setIsModalReportOpen}
        inChapter={currentChapter}
        storyId={id}
      />
      {chapterContent && (
        <EPModalBuyChapters
          isModalOpen={isModalBuyChaptersOpen}
          setIsModalOpen={setIsModalBuyChaptersOpen}
          fetchChapterContent={fetchChapterContent}
          storyId={id}
          storyTitle={chapterContent.story.storyTitle}
        />
      )}
      <EPModalTopUp
        isModalOpen={isModalTopUpOpen}
        setIsModalOpen={setIsModalTopUpOpen}
      />
    </>
  );
};

export default ReadStoryPage;
