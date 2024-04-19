import { Col, Row, Skeleton } from "antd";
import { FC } from "react";
import "./ResultSkeleton.scss";

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
      <Row
        gutter={[10, 10]}
        className="result-row-container"
        style={{ padding: "5px 12px" }}
      >
        <Col sm={6} md={5} lg={5} xl={4} xxl={3}>
          <Skeleton.Image
            active
            style={{
              width: imgWidth ?? EImageDefaultSize.WIDTH,
              height: imgHight ?? EImageDefaultSize.HEIGHT,
            }}
          />
        </Col>
        <Col
          sm={24}
          md={19}
          lg={19}
          className="d-flex flex-column justify-content-between gap-2 gap-md-0"
        >
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
