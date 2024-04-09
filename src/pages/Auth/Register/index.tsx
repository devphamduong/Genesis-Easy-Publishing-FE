import { FC, useState } from "react";
import "./Register.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterForm } from "../../../interfaces/auth.interface";
import { toast } from "react-toastify";
import { register } from "../../../services/auth-api-service";

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
      form.resetFields();
      navigate("/auth/login", {
        state: {
          emailOrUsername: values.email,
          password: values.password,
        },
      });
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
            <h1>Đăng ký</h1>
            <p className="fs-4">Vui lòng nhập thông tin để tạo tài khoản.</p>
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
                    message: "Email không hợp lệ!",
                  },
                  { required: true, message: "Hãy nhập Email!" },
                ]}
              >
                <Input size="large" placeholder="Email" />
              </Form.Item>
              <Form.Item<IRegisterForm>
                label="Username"
                name="username"
                rules={[{ required: true, message: "Hãy nhập Username!" }]}
              >
                <Input size="large" placeholder="Username" />
              </Form.Item>
              <Form.Item<IRegisterForm>
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item<IRegisterForm>
                name="confirmPassword"
                label="Nhập lại mật khẩu"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập lại mật khẩu lần 2!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu bạn vừa nhập không trùng khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item<IRegisterForm>
                    name="agreement"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>
                      Tôi đã đọc tất cả các<Link to={""}> điều khoản</Link>
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
                  Đăng ký
                </Button>
                Bạn đã có tài khoản rồi?
                <Link to={"/auth/login"}> Quay lại đăng nhập</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
