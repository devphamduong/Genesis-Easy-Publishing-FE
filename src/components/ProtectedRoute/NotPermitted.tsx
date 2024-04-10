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
      subTitle="Oops, bạn không có quyên truy cập vào trang này."
      extra={
        <>
          <Button type="primary" onClick={() => navigate("")}>
            Trang chủ
          </Button>
          <Button type="primary" onClick={() => navigate("/auth/login")}>
            Đăng nhập
          </Button>
        </>
      }
    />
  );
}

export default NotPermitted;
