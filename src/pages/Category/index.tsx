import { FC } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import Cover from "../../components/Cover";
import { Col, Divider, Pagination, Row } from "antd";
import EPBook3D from "../../components/EP-UI/Book3D";
import ListStories from "../../components/ListStories";
import RowStory from "../../components/RowStory";
import RowStorySkeleton from "../../components/RowStory/RowStorySkeleton";

interface IProps {}

const CategoryPage: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();

  const handleChangePageNewest = (page: number, pageSize: number) => {
    console.log(page);
  };

  const handleChangePageCompleted = (page: number, pageSize: number) => {
    console.log(page);
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
      <Cover
        imgUrl="https://yymedia.codeprime.net/media/genre_cover/bg01.jpeg"
        title="Truyện Huyền Huyễn"
      />
      <div className="category-content container py-3">
        <Row gutter={[16, 16]}>
          <Col
            span={19}
            className="rounded-3"
            style={{ backgroundColor: "#f4f4f4" }}
          >
            <Row
              gutter={[16, 16]}
              align={"middle"}
              justify={"space-around"}
              className="px-3 py-4"
            >
              {Array.from({ length: 5 }).map((item, index) => {
                return (
                  <Col span={4} key={index}>
                    <EPBook3D
                      //pass story instead
                      imgUrl="https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg"
                      title="Võ Hiệp Nội Ứng, Theo Max Cấp Thần"
                      description="Lý Tùy Phong xuyên qua võ hiệp thế giới, trở"
                      width={80}
                      height={120}
                    />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col span={5}>
            <div className="border p-4 rounded-3">
              Kiếm Hiệp là những truyện có bối cảnh cổ trang, nhân vật chính là
              người trong các môn phái võ lâm, tu luyện võ công tâm pháp. Thông
              thường kết thúc truyện, võ công của nhân vật chính sẽ đạt đến mức
              thượng thừa, thống nhất hoặc quy ẩn giang hồ.
            </div>
          </Col>
          <Col span={18}>
            <div className="fs-5">Truyện Kiếm Hiệp Mới Cập Nhật</div>
            <Divider />
            <Row gutter={[16, 16]}>
              {amountRowStorySkeleton(4)}
              {/* <RowStory
                  size={"small"}
                  displayUpdatedAt
                  story={{
                    storyId: 1,
                    storyImage:
                      "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                    storyTitle: "abc",
                    storyDescription: "abc",
                    storyCategories: [],
                    storyAuthor: { userId: 1, userFullname: "abc" },
                    storyChapterNumber: 10,
                  }}
                /> */}
            </Row>
            <Col className="text-center mt-2">
              <Pagination
                defaultCurrent={1}
                total={50}
                onChange={handleChangePageNewest}
              />
            </Col>
          </Col>
          <Col span={6}>
            <ListStories
              stories={[
                {
                  storyId: 1,
                  storyImage:
                    "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                  storyTitle: "abc",
                  storyDescription: "abc",
                  storyCategories: [],
                  storyAuthor: { userId: 1, userFullname: "abc" },
                  storyChapterNumber: 10,
                },
                {
                  storyId: 1,
                  storyImage:
                    "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                  storyTitle: "abc",
                  storyDescription: "abc",
                  storyCategories: [],
                  storyAuthor: { userId: 1, userFullname: "abc" },
                  storyChapterNumber: 10,
                },
                {
                  storyId: 1,
                  storyImage:
                    "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                  storyTitle: "abc",
                  storyDescription: "abc",
                  storyCategories: [],
                  storyAuthor: { userId: 1, userFullname: "abc" },
                  storyChapterNumber: 10,
                },
                {
                  storyId: 1,
                  storyImage:
                    "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                  storyTitle: "abc",
                  storyDescription: "abc",
                  storyCategories: [],
                  storyAuthor: { userId: 1, userFullname: "abc" },
                  storyChapterNumber: 10,
                },
                {
                  storyId: 1,
                  storyImage:
                    "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                  storyTitle: "abc",
                  storyDescription: "abc",
                  storyCategories: [],
                  storyAuthor: { userId: 1, userFullname: "abc" },
                  storyChapterNumber: 10,
                },
              ]}
              title="Truyện Kiếm Hiệp Đọc Nhiều Trong Tuần"
              displayRead
              displayRank
              showDetailFirstStory
              showMore={false}
            />
          </Col>
          <Col span={18}>
            <div className="fs-5">Truyện Kiếm Hiệp Hoàn Thành</div>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <RowStory
                  size={"small"}
                  displayUpdatedAt
                  story={{
                    storyId: 1,
                    storyImage:
                      "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                    storyTitle: "abc",
                    storyDescription: "abc",
                    storyCategories: [],
                    storyAuthor: { userId: 1, userFullname: "abc" },
                    storyChapterNumber: 10,
                  }}
                />
              </Col>
              <Col span={12}>
                <RowStory
                  size={"small"}
                  displayUpdatedAt
                  story={{
                    storyId: 1,
                    storyImage:
                      "https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg",
                    storyTitle: "abc",
                    storyDescription: "abc",
                    storyCategories: [],
                    storyAuthor: { userId: 1, userFullname: "abc" },
                    storyChapterNumber: 10,
                  }}
                />
              </Col>
            </Row>
            <Col className="text-center mt-2">
              <Pagination
                defaultCurrent={1}
                total={50}
                onChange={handleChangePageCompleted}
              />
            </Col>
          </Col>
          <Col span={6}>
            <ListStories
              stories={[]}
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
