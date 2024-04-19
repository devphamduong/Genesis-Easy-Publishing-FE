import { FC } from "react";
import "./EPCover.scss";

interface IProps {
  imgUrl: string;
  title: string | React.ReactNode;
  subTitle?: string;
  style?: React.CSSProperties;
}

const EPCover: FC<IProps> = (props: IProps) => {
  const { imgUrl, title, subTitle, style } = props;

  return (
    <div
      className="ep-cover d-flex flex-column align-items-center justify-content-center"
      style={{ ...style, backgroundImage: `url(${imgUrl})` }}
    >
      <div className="title text-center">
        <strong>{title}</strong>
      </div>
      <div className="sub-title text-center">
        <strong>{subTitle}</strong>
      </div>
    </div>
  );
};

export default EPCover;
