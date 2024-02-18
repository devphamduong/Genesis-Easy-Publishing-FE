import { FC } from "react";
import "./RowStory.scss";
import { Col, Row, Skeleton } from "antd";

interface IProps {
  imgWidth?: number;
  imgHight?: number;
}

const RowStorySkeleton: FC<IProps> = (props: IProps) => {
  const { imgWidth, imgHight } = props;

  return (
    <Row gutter={[50, 16]}>
      <Col span={4}>
        <Skeleton.Image
          active
          style={{
            width: imgWidth ? imgWidth : 80,
            height: imgHight ? imgHight : 120,
          }}
        />
      </Col>
      <Col span={20} className="d-flex flex-column justify-content-between">
        <Skeleton.Input active size="small" />
        <Skeleton.Input active size="small" block />
        <div className="d-flex align-items-center justify-content-between gap-1">
          <Skeleton.Input active size="small" />
          <Skeleton.Button active size={"small"} />
        </div>
        <Skeleton.Button active size={"small"} />
      </Col>
    </Row>
  );
};

export default RowStorySkeleton;
