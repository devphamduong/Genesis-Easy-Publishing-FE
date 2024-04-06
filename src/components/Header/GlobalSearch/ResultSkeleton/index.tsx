import { Col, Row, Skeleton } from "antd";
import { FC } from "react";
// import "./ResultSkeleton.scss";

interface IProps {}

interface IProps {
  imgWidth?: number;
  imgHight?: number;
}

enum EImageDefaultSize {
  HEIGHT = 120,
  WIDTH = 80,
}

const ResultSkeleton: FC<IProps> = (props: IProps) => {
  const { imgWidth, imgHight } = props;

  return Array.from({ length: 5 }, () => {
    return (
      <Row gutter={[50, 16]}>
        <Col span={4}>
          <Skeleton.Image
            active
            style={{
              width: imgWidth ?? EImageDefaultSize.WIDTH,
              height: imgHight ?? EImageDefaultSize.HEIGHT,
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
  });
};

export default ResultSkeleton;
