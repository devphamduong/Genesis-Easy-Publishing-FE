import { FC } from "react";
import "./EPTag.scss";
import { Tag } from "antd";

interface IProps {
  shape: "round" | "rectangle";
  color: string;
  size: "small" | "large";
  content: string;
}

const EPTag: FC<IProps> = (props: IProps) => {
  const { shape, color, size, content } = props;
  return (
    <Tag color={color} className={`ep-tag ${shape} ${size ?? "small"}`}>
      {content}
    </Tag>
  );
};

export default EPTag;
