import { FC } from "react";
import "./VerticalImageHover.scss";
import { FaCrown } from "react-icons/fa6";

interface IProps {
  imageUrl: string;
  rank?: number;
}

const VerticalImageHover: FC<IProps> = (props: IProps) => {
  const { imageUrl, rank } = props;

  return (
    <div className="image">
      <div
        className="image-hover"
        style={{
          backgroundImage: `url("${imageUrl}")`,
        }}
      ></div>
      {rank && (
        <div
          className={`top-label ${
            rank === 1 ? "top-1" : ""
          } d-flex align-items-center justify-content-center gap-1`}
        >
          {rank === 1 && <FaCrown className="icon" />}
          <strong>Top {rank}</strong>
        </div>
      )}
    </div>
  );
};

export default VerticalImageHover;
