import { FC } from "react";
import "./EPNoResultFound.scss";

interface IProps {}

const EPNoResultFound: FC<IProps> = (props: IProps) => {
  return (
    <div className="search-message-empty-container">
      <span className="search-message-empty-decal">
        <span className="search-message-empty-decal-eyes">:</span>
        <span>(</span>
      </span>
      <h2 className="search-message-empty-message">Nope, nothing.</h2>
    </div>
  );
};

export default EPNoResultFound;
