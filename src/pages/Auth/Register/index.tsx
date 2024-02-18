import { FC } from "react";
import "./Register.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";

interface IProps {}

type FieldType = {
  email?: string;
  password?: string;
  confirm?: string;
  username?: string;
  agreement?: boolean;
};

const RegisterPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: FieldType) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Register</h1>
            <p className="fs-4">
              Please enter your information to create an account
            </p>
          </div>
          <div className="bottom">
            <Form
              form={form}
              layout="vertical"
              initialValues={{ agreement: true }}
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
              <Form.Item<FieldType>
                name="confirm"
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
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input size="large" placeholder="Enter your username" />
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item<FieldType>
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
                <Button size="large" type="primary" htmlType="submit" block>
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
