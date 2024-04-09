import { FC, useEffect, useState } from "react";
import "./ForgotPassword.scss";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../../services/auth-api-service";
import { toast } from "react-toastify";

interface IProps {}

type FieldType = {
  email: string;
};

const ForgotPasswordPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  const onFinish = async (values: FieldType) => {
    setIsLoading(true);
    const res = await forgotPassword(values);
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Quên mật khẩu</h1>
            <p className="fs-5">
              Vui lòng nhập địa chỉ email, chúng tôi sẽ gửi yêu cầu để bạn có
              thể tạo mật khẩu mới
            </p>
          </div>
          <div className="bottom">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Email không hợp lệ!",
                  },
                  { required: true, message: "Hãy nhập Email!" },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item>
                <Link to={"/auth/login"} className="login-form-forgot">
                  Quay về đăng nhập
                </Link>
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={!submittable || isLoading}
                  loading={isLoading}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Gửi yêu cầu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
