import { FC, useState } from "react";
import "./Register.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../../interfaces/auth.interface";
import { toast } from "react-toastify";
import { register } from "../../../services/auth-api.service";

interface IProps {}

const RegisterPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFinish = async (values: IRegisterForm) => {
    setIsLoading(true);
    const res = await register(values);
    if (res && res.ec === 0) {
      toast.success(res.em);
      navigate("/auth/login", {
        state: {
          emailOrUsername: values.email,
          password: values.password,
        },
      });
      form.resetFields();
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Register</h1>
            <p className="fs-4">
              Please enter your information to create an account.
            </p>
          </div>
          <div className="bottom">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ agreement: true }}
              onFinish={onFinish}
            >
              <Form.Item<IRegisterForm>
                label="Email"
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
              <Form.Item<IRegisterForm>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input size="large" placeholder="Enter your username" />
              </Form.Item>
              <Form.Item<IRegisterForm>
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Item>
              <Form.Item<IRegisterForm>
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
                <Input.Password
                  size="large"
                  placeholder="Enter your confirm password"
                />
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item<IRegisterForm>
                    name="agreement"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>
                      I have read the <Link to={""}>agreement</Link>
                    </Checkbox>
                  </Form.Item>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Register
                </Button>
                Already have an account?
                <Link to={"/auth/login"}> Back to login</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
