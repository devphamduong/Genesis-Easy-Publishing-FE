import { FC } from "react";
import "./EPBook3D.scss";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Paragraph } = Typography;

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
      (height ?? EImageDefaultSize.HEIGHT)
    );
  };

  const calcTranslateXBefore = () => {
    return (
      EImageBeforeDefaultConfig.TRANSLATE_X + (width ?? EImageDefaultSize.WIDTH)
    );
  };

  const customStyleBook3D: ICustomCSSProperties = {
    "--height": (height ?? EImageDefaultSize.HEIGHT) + "px",
    "--width": (width ?? EImageDefaultSize.WIDTH) + "px",
    "--height-before": `${calcHeightBefore()}px`,
    "--translate-x": `${calcTranslateXBefore()}px`,
  };

  return (
    <div className="ep-book-3d-container">
      <div className="ep-book-3d-content">
        <Link to={""} className={`book-container ${title && "mb-3"}`}>
          <div className="book" style={customStyleBook3D}>
            <img src={imgUrl} />
          </div>
        </Link>
        <strong className="title text-center">
          <Link to={""}>{title}</Link>
        </strong>
        <div className="description text-center">
          <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
        </div>
      </div>
    </div>
  );
};

export default EPBook3D;
