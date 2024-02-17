import { FC } from "react";
import "./EPBook3D.scss";
import { Link } from "react-router-dom";

interface IProps {
  imgUrl: string;
  title?: string;
  description?: string;
}

const EPBook3D: FC<IProps> = (props: IProps) => {
  const { imgUrl, title, description } = props;

  return (
    <div className="ep-book-3d-container">
      <div className="ep-book-3d-content">
        <div className="wrapper mb-3">
          <div className="book">
            <div className="inner-book">
              <div
                className="imgFront"
                style={{ paddingTop: "calc(1.07 * 100%)" }}
              >
                <img src={imgUrl} />
              </div>
              <div className="page"></div>
              <div className="page page-2"></div>
              <div
                className="imgBack final-page"
                style={{ paddingTop: "calc(1.07 * 100%)" }}
              >
                <img src={imgUrl} />
              </div>
            </div>
          </div>
        </div>
        <strong className="title">
          <Link to={""}>{title}</Link>
        </strong>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default EPBook3D;
