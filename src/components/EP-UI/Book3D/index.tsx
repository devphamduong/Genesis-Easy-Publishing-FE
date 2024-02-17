import { FC } from "react";
import "./EPBook3D.scss";
import { Link } from "react-router-dom";

interface IProps {
  imgUrl: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

interface ICustomCSSProperties extends React.CSSProperties {
  "--height"?: string | number;
  "--width"?: string | number;
  "--height-before"?: string | number;
  "--translate-x"?: string | number;
}

enum EImageBeforeDefaultConfig {
  HEIGHT_BEFORE = -2,
  TRANSLATE_X = -16,
}

enum EImageDefaultSize {
  HEIGHT = 140,
  WIDTH = 90,
}

const EPBook3D: FC<IProps> = (props: IProps) => {
  const { imgUrl, title, description, width, height } = props;

  const calcHeightBefore = () => {
    return (
      EImageBeforeDefaultConfig.HEIGHT_BEFORE +
      (height ? height : EImageDefaultSize.HEIGHT)
    );
  };

  const calcTranslateXBefore = () => {
    return (
      EImageBeforeDefaultConfig.TRANSLATE_X +
      (width ? width : EImageDefaultSize.WIDTH)
    );
  };

  const someStyle: ICustomCSSProperties = {
    "--height": (height ? height : EImageDefaultSize.HEIGHT) + "px",
    "--width": (width ? width : EImageDefaultSize.WIDTH) + "px",
    "--height-before": `${calcHeightBefore()}px`,
    "--translate-x": `${calcTranslateXBefore()}px`,
  };

  return (
    <div className="ep-book-3d-container">
      <div className="ep-book-3d-content">
        <Link to={""} className={`book-container ${title && "mb-3"}`}>
          <div className="book" style={someStyle}>
            <img src={imgUrl} />
          </div>
        </Link>
        <strong className="title">
          <Link to={""}>{title}</Link>
        </strong>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default EPBook3D;
