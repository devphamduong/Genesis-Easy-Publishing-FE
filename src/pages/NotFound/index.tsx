import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

const NotFoundPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  return (
    <div style={{ height: "100vh" }}>
      <Result
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        status="404"
        title="404"
        subTitle="Oops, có vẻ như trang bạn tìm không tồn tại"
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
