import { FC, useEffect, useState } from "react";
import "./ResetPassword.scss";
import { Button, Form, Input } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, verifyToken } from "../../../services/auth-api-service";

interface IProps {}

type FieldType = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = async () => {
    const token = searchParams.get("token");
    async () => {
      const res = await verifyToken({ token: !token ? "" : token });
      if (res && res.ec !== 0) {
        setIsTokenExpired(true);
      }
    };
  };

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
    const token = searchParams.get("token");
    setIsLoading(true);
    if (token) {
      const res = await resetPassword({ ...values, token });
      if (res && res.ec === 0) {
        toast.success(res.em);
        form.resetFields();
      } else {
        toast.error(res.em);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Reset password</h1>
            <p className="fs-5">
              Please enter your password and confirm password.
            </p>
          </div>
          <div className="bottom">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item<FieldType>
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password size="large" />
              </Form.Item>
              <Form.Item<FieldType>
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  disabled={!submittable || isLoading || isTokenExpired}
                  loading={isLoading}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Reset password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
