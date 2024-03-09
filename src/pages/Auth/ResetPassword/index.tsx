import { FC, useEffect, useState } from "react";
import "./ResetPassword.scss";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../../services/auth-api.service";
import { toast } from "react-toastify";

interface IProps {}

type FieldType = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const [isDisableButton, setIsDisableButton] = useState<boolean>(false);

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
    setIsDisableButton(true);
    // const res = await forgotPassword(values);
    // if (res && res.ec === 0) {
    //   toast.success(res.em);
    // } else {
    //   toast.error(res.em);
    //   setIsDisableButton(true);
    // }
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
                label="Password"
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
                  disabled={!submittable || isDisableButton}
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
