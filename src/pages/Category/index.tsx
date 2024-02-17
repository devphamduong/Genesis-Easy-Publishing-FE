import { FC } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import Cover from "../../components/Cover";
import { Col, Row } from "antd";
import EPBook3D from "../../components/EP-UI/Book3D";
import ListStories from "../../components/ListStories";
import RowStory from "../../components/RowStory";

interface IProps {}

const CategoryPage: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();

  return (
    <div className="category-container">
      <Cover
        imgUrl="https://yymedia.codeprime.net/media/genre_cover/bg01.jpeg"
        title="Truyện Huyền Huyễn"
      />
      <div className="category-content container py-3">
        <Row gutter={[16, 16]}>
          <Col span={19}>
            <div
              className="rounded-3 px-3 py-4 d-flex"
              style={{ backgroundColor: "#f4f4f4" }}
            >
              <EPBook3D
                imgUrl="https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg"
                title="Võ Hiệp Nội Ứng, Theo Max Cấp Thần"
                description="Lý Tùy Phong xuyên qua võ hiệp thế giới, trở"
              />
              <EPBook3D
                imgUrl="https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg"
                title="Võ Hiệp Nội Ứng, Theo Max Cấp Thần"
                description="Lý Tùy Phong xuyên qua võ hiệp thế giới, trở"
              />
              <EPBook3D
                imgUrl="https://yymedia.codeprime.net/media/novels/2019-06/ef2d9a2625.jpg"
                title="Võ Hiệp Nội Ứng, Theo Max Cấp Thần"
                description="Lý Tùy Phong xuyên qua võ hiệp thế giới, trở"
              />
            </div>
          </Col>
          <Col span={5}>
            <div className="border p-4 rounded-3">
              Kiếm Hiệp là những truyện có bối cảnh cổ trang, nhân vật chính là
              người trong các môn phái võ lâm, tu luyện võ công tâm pháp. Thông
              thường kết thúc truyện, võ công của nhân vật chính sẽ đạt đến mức
              thượng thừa, thống nhất hoặc quy ẩn giang hồ.
            </div>
          </Col>
          <Col span={19}>
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
          </Col>
          <Col span={5}>
            <ListStories
              stories={[]}
              title="Truyện Kiếm Hiệp Đọc Nhiều Trong Tuần"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CategoryPage;
