import { FC } from "react";
import "./Login.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

interface IProps {}

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const LoginPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Log In</h1>
            <p className="fs-4">Please enter your email and password</p>
          </div>
          <div className="bottom">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item<FieldType>
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
              <Form.Item<FieldType>
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
              <Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link to={"/auth/forgot-password"}>Forgot password</Link>
                </div>
              </Form.Item>

              <Form.Item>
                <Button size="large" type="primary" htmlType="submit" block>
                  Log in
                </Button>
                Don't have an account?
                <Link to={"/auth/register"}> Register now!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
