import { Button, Result } from "antd";
import { sendRequestToBecomeReviewer } from "../../../services/review-api-service";
import { toast } from "react-toastify";

function NotPermitted() {
  const handleSendRequest = async () => {
    const res = await sendRequestToBecomeReviewer();
    if (res && res.ec === 0) {
      toast.success(res.em);
    } else {
      toast.error(res.em);
    }
  };

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
      subTitle="Oops, bạn không có quyền truy cập vào trang này."
      extra={
        <>
          <Button type="primary" onClick={() => handleSendRequest()}>
            Đăng ký trở thành Reviewer
          </Button>
        </>
      }
    />
  );
}

export default NotPermitted;
