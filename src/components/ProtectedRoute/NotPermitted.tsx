import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotPermitted() {
  const navigate = useNavigate();

  return (
    <Result
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <>
          <Button type="primary" onClick={() => navigate("")}>
            Back Home
          </Button>
          <Button type="primary" onClick={() => navigate("/auth/login")}>
            Login
          </Button>
        </>
      }
    />
  );
}

export default NotPermitted;
