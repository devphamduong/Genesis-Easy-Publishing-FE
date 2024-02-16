import { FC } from "react";
import "./Category.scss";
import { useParams } from "react-router-dom";
import Cover from "../../components/Cover";

interface IProps {}

const CategoryPage: FC<IProps> = (props: IProps) => {
  const { id, slug } = useParams();

  return (
    <>
      <Cover
        imgUrl="https://yymedia.codeprime.net/media/genre_cover/bg01.jpeg"
        title="Truyện Huyền Huyễn"
      />
    </>
  );
};

export default CategoryPage;
