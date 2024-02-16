import { FC } from "react";
import "./Cover.scss";

interface IProps {
  imgUrl: string;
  title: string;
  subTitle?: string;
  style?: React.CSSProperties;
}

const Cover: FC<IProps> = (props: IProps) => {
  const { imgUrl, title, subTitle, style } = props;

  return (
    <div
      className="cover d-flex flex-column align-items-center justify-content-center"
      style={{ ...style, backgroundImage: `url(${imgUrl})` }}
    >
      <div className="title">
        <strong>{title}</strong>
      </div>
      <div className="sub-title">
        <strong>{subTitle}</strong>
      </div>
    </div>
  );
};

export default Cover;
