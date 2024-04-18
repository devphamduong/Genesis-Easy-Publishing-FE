import { FC } from "react";
import "./RowStory.scss";
import { Col, Row, Skeleton } from "antd";

interface IProps {
  imgWidth?: number;
  imgHight?: number;
}

enum EImageDefaultSize {
  HEIGHT = 120,
  WIDTH = 80,
}

const RowStorySkeleton: FC<IProps> = (props: IProps) => {
  const { imgWidth, imgHight } = props;

  return (
    <Row gutter={[50, 16]}>
      <Col xs={4} md={3} lg={2} xl={5} xxl={4}>
        <Skeleton.Image
          active
          style={{
            width: imgWidth ?? EImageDefaultSize.WIDTH,
            height: imgHight ?? EImageDefaultSize.HEIGHT,
          }}
        />
      </Col>
      <Col
        xs={20}
        lg={19}
        xxl={20}
        className="d-flex flex-column justify-content-between"
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
};

export default RowStorySkeleton;
