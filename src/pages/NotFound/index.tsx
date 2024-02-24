import { Button, Result } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {}

const NotFoundPage: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  return (
    <Result
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
