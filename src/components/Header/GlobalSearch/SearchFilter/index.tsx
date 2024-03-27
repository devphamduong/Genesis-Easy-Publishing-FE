import { FC } from "react";
import "./SearchFilter.scss";

interface IProps {}

const SearchFilter: FC<IProps> = (props: IProps) => {
  return (
    <div>
      <button>Author</button>
      <p>Giá</p>
      <p>Thể loại</p>
      <p>Hoàn thành or chưa hoàn thành</p>
    </div>
  );
};

export default SearchFilter;
