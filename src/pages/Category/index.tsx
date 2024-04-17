import { FC, useEffect, useState } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import { Col, Divider, Pagination, Row } from "antd";
import EPBook3D from "../../components/EP-UI/Book3D";
import ListStories from "../../components/ListStories";
import RowStory from "../../components/RowStory";
import RowStorySkeleton from "../../components/RowStory/RowStorySkeleton";
import {
  getCategoryDetail,
  getPaginationStoriesByCategoryId,
  getPaginationStoriesCompletedByCategory,
  getStoriesByCategoryId,
  getStoriesMostReadByCategoryId,
} from "../../services/category-api-service";
import { IStory } from "../../interfaces/story.interface";
import EPCover from "../../components/EP-UI/Cover";
import { ICategory } from "../../interfaces/category.interface";

interface IProps {}

const PAGE_SIZE_STORIES_UPDATE = 10;
const PAGE_SIZE_STORIES_COMPLETE = 10;

enum ECategory {}

const CategoryPage: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();
  const [categoryDetail, setCategoryDetail] = useState<ICategory>();
  const [stories, setStories] = useState<IStory[]>([]);
  const [storiesUpdate, setStoriesUpdate] = useState<IStory[]>([]);
  const [storiesMostRead, setStoriesMostRead] = useState<IStory[]>([]);
  const [storiesCompleted, setStoriesCompleted] = useState<IStory[]>([]);
  const [currentPageStoriesUpdate, setCurrentPageStoriesUpdate] =
    useState<number>(1);
  const [totalStoriesUpdate, setTotalStoriesUpdate] = useState<number>(0);
  const [pageSizeStoriesUpdate, setPageSizeStoriesUpdate] = useState<number>(
    PAGE_SIZE_STORIES_UPDATE
  );
  const [currentPageStoriesCompleted, setCurrentPageStoriesCompleted] =
    useState<number>(1);
  const [totalStoriesCompleted, setTotalStoriesCompleted] = useState<number>(0);
  const [pageSizeStoriesCompleted, setPageSizeStoriesCompleted] =
    useState<number>(PAGE_SIZE_STORIES_COMPLETE);

  useEffect(() => {
    if (id) {
      fetchCategoryDetail(id);
      fetchStoriesByCategoriesId(id);
      fetchStoriesMostReadByCategoryId(id);
    }
  }, [id]);

  useEffect(() => {
    if (id)
      fetchPaginationStoriesUpdateByCategoryId(
        id,
        currentPageStoriesUpdate,
        pageSizeStoriesUpdate
      );
  }, [id, currentPageStoriesUpdate, pageSizeStoriesUpdate]);

  useEffect(() => {
    if (id)
      fetchPaginationStoriesFinish(
        id,
        currentPageStoriesCompleted,
        pageSizeStoriesCompleted
      );
  }, [id, currentPageStoriesCompleted, pageSizeStoriesCompleted]);

  const fetchCategoryDetail = async (id: string) => {
    const res = await getCategoryDetail(id);
    if (res && res.ec === 0) {
      setCategoryDetail(res.dt);
    }
  };

  const fetchStoriesByCategoriesId = async (id: string) => {
    const res = await getStoriesByCategoryId(id);
    if (res && res.ec === 0) {
      setStories(res.dt);
    }
  };

  const fetchStoriesMostReadByCategoryId = async (id: string) => {
    const res = await getStoriesMostReadByCategoryId(id);
    if (res && res.ec === 0) {
      setStoriesMostRead(res.dt);
    }
  };

  const fetchPaginationStoriesUpdateByCategoryId = async (
    id: string,
    page: number,
    pageSize: number
  ) => {
    const res = await getPaginationStoriesByCategoryId(id, page, pageSize);
    if (res && res.ec === 0) {
      setStoriesUpdate(res.dt.list);
      setTotalStoriesUpdate(res.dt.totalStories);
    }
  };

  const fetchPaginationStoriesFinish = async (
    id: string,
    page: number,
    pageSize: number
  ) => {
    const res = await getPaginationStoriesCompletedByCategory(
      id,
      page,
      pageSize
    );
    if (res && res.ec === 0) {
      setStoriesCompleted(res.dt.list);
      setTotalStoriesCompleted(res.dt.totalStories);
    }
  };

  const handleChangePageUpdate = (page: number, pageSize: number) => {
    setCurrentPageStoriesUpdate(page);
  };

  const handleChangePageCompleted = (page: number, pageSize: number) => {
    setCurrentPageStoriesCompleted(page);
  };

  const amountRowStorySkeleton = (amount: number) => {
    return Array.from({ length: amount }, (_, index) => (
      <Col span={12} key={index}>
        <RowStorySkeleton />
      </Col>
    ));
  };

  return (
    <div className="category-container">
      <EPCover
        imgUrl={categoryDetail?.categoryBanner ?? ""}
        title={
          <span className="text-capitalize">
            Truyện {categoryDetail ? categoryDetail?.categoryName : null}
          </span>
        }
      />
      <div className="category-content container py-3">
        <Row gutter={[16, 16]}>
          <Col
            xs={24}
            xl={19}
            className="rounded-3 order-lg-1 order-xl-0"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <Row
              gutter={[16, 16]}
              align={"middle"}
              justify={"space-around"}
              className="px-3 py-4 flex-column flex-md-row"
            >
              {stories &&
                stories.length > 0 &&
                stories.map((item, index) => {
                  return (
                    <Col
                      xs={24}
                      md={12}
                      xl={4}
                      key={`category-${id}-story-${item.storyId}`}
                    >
                      <EPBook3D
                        storyId={item.storyId}
                        imgUrl={item.storyImage}
                        isShowTitle
                        title={item.storyTitle}
                        description={item.storyDescription}
                        width={80}
                        height={120}
                      />
                    </Col>
                  );
                })}
            </Row>
          </Col>
          <Col xs={24} xl={5} className="order-lg-0 order-xl-0">
            <div className="border p-4 rounded-3">
              Kiếm Hiệp là những truyện có bối cảnh cổ trang, nhân vật chính là
              người trong các môn phái võ lâm, tu luyện võ công tâm pháp. Thông
              thường kết thúc truyện, võ công của nhân vật chính sẽ đạt đến mức
              thượng thừa, thống nhất hoặc quy ẩn giang hồ.
            </div>
          </Col>
          <Col xs={24} xl={18} className="order-lg-2 order-xl-0">
            <div className="fs-5">Truyện Kiếm Hiệp Mới Cập Nhật</div>
            <Divider />
            <Row gutter={[16, 16]}>
              {storiesUpdate && storiesUpdate.length > 0
                ? storiesUpdate.map((item, index) => {
                    return (
                      <Col xs={24} xl={12} key={index}>
                        <RowStory
                          key={`category-${id}-story-update-${item.storyId}`}
                          size={"small"}
                          displayUpdatedAt
                          story={item}
                        />
                      </Col>
                    );
                  })
                : amountRowStorySkeleton(4)}
            </Row>
            <Col className="text-center mt-2">
              <Pagination
                defaultCurrent={currentPageStoriesUpdate}
                total={totalStoriesUpdate}
                onChange={handleChangePageUpdate}
              />
            </Col>
          </Col>
          <Col xs={24} xl={6} className="order-lg-3 order-xl-0">
            <ListStories
              stories={storiesMostRead}
              title="Truyện Kiếm Hiệp Đọc Nhiều"
              displayRead
              displayRank
              showDetailFirstStory
              showMore={false}
            />
          </Col>
          <Col xs={24} xl={18} className="order-lg-4 order-xl-0">
            <div className="fs-5">Truyện Kiếm Hiệp Hoàn Thành</div>
            <Divider />
            <Row gutter={[16, 16]}>
              {storiesCompleted && storiesCompleted.length > 0
                ? storiesCompleted.map((item, index) => {
                    return (
                      <Col xs={24} xl={12} key={index}>
                        <RowStory
                          key={`category-${id}-story-completed-${item.storyId}`}
                          size={"small"}
                          displayUpdatedAt
                          story={item}
                        />
                      </Col>
                    );
                  })
                : amountRowStorySkeleton(4)}
            </Row>
            <Col className="text-center mt-2">
              <Pagination
                defaultCurrent={currentPageStoriesCompleted}
                total={totalStoriesCompleted}
                onChange={handleChangePageCompleted}
              />
            </Col>
          </Col>
          <Col xs={24} xl={6} className="order-lg-5 order-xl-0">
            <ListStories
              stories={storiesCompleted.slice(0, 10)}
              displayRead
              displayRank
              showDetailFirstStory
              showMore={false}
              title="Top Truyện Kiếm Hiệp Hoàn Thành"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryPage;
