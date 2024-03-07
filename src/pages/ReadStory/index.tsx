import { FC, useEffect, useState } from "react";
import "./ReadStory.scss";
import { Button, Col, Descriptions, DescriptionsProps, Row } from "antd";
import {
  HeartOutlined,
  LeftOutlined,
  RightOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { getChapterNumber } from "./shared/function";
import { kFormatter } from "../../shared/function";
import EPModalReport from "../../components/EP-UI/Modal/Report";
import EPButton from "../../components/EP-UI/Button";
import { IChapterContent } from "../../interfaces/story.interface";
import { getChapterContent } from "../../services/story-api.service";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import { getStoryDetailURL } from "../../shared/generate-navigate-url";

interface IProps {}

const items: DescriptionsProps["items"] = [
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
          Phiên bản
        </Col>{" "}
        <Col span={22}>3.4</Col>
        <Col span={2} className="text-lighter">
          Thời gian
        </Col>{" "}
        <Col span={22}>dds.mongo.mid</Col>
        <Col span={2} className="text-lighter">
          Cập nhật
        </Col>{" "}
        <Col span={22}>10 GB</Col>
        <Col span={2} className="text-lighter">
          Lượt thích
        </Col>{" "}
        <Col span={22}>3</Col>
        <Col span={2} className="text-lighter">
          Lượt đọc
        </Col>{" "}
        <Col span={22}>{kFormatter(19999)}</Col>
      </Row>
    ),
  },
];

const ReadStoryPage: FC<IProps> = (props: IProps) => {
  const { id, chapter } = useParams();
  const user = useSelector((state: IRootState) => state.account.user);
  const [currentChapter, setCurrentChapter] = useState<number>(
    getChapterNumber(chapter!)
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
          <div className="content">{chapterContent?.chapter.content}</div>
          <div className="text-center">
            <Button
              type={isSubmittedLike ? "primary" : undefined}
              danger
              size="large"
              icon={<HeartOutlined />}
              onClick={() => handleLikeStory()}
            >
              <span>{isSubmittedLike ? "Đã thích" : "Ta thích"}</span>
            </Button>
          </div>
          <div className="sort-description">
            Bạn đang đọc
            <Link
              to={getStoryDetailURL(id, chapter?.split(".")[0])}
              className="name link-hover"
            >
              {" "}
              {chapterContent?.chapter.story.storyTitle}{" "}
            </Link>
            của
            <Link className="author link-hover"> {user.username}</Link>
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
          <Descriptions layout="vertical" bordered items={items} size="small" />
          <div>
            <EPButton
              icon={<WarningOutlined />}
              size="large"
              warning
              onClick={() => setIsModalOpen(true)}
            >
              Report
            </EPButton>
          </div>
        </div>
      </div>
      <EPModalReport
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        inChapter={currentChapter}
      />
    </>
  );
};

export default ReadStoryPage;
