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
            <h1>Forgot password</h1>
            <p className="fs-5">
              Please enter your email address and we’ll send you a link to reset
              your password.
            </p>
          </div>
          <div className="bottom">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid Email!",
                  },
                  { required: true, message: "Please input your Email!" },
                ]}
              >
                <Input size="large" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item>
                <Link to={"/auth/login"} className="login-form-forgot">
                  Back to login
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
                  Send reset email
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
