import { FC, useEffect, useState } from "react";
import "./Login.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../../../services/auth-api-service";
import { ILoginForm } from "../../../interfaces/auth.interface";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/account/accountSlice";
import { IRootState } from "../../../redux/store";

interface IProps {}

const LoginPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm<ILoginForm>();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      if (location.state) {
        form.setFieldValue("emailOrUsername", location.state.emailOrUsername);
        form.setFieldValue("password", location.state.password);
      }
    }
  }, []);

  const onFinish = async (values: ILoginForm) => {
    setIsLoading(true);
    const res = await login(values);
    if (res && res.ec === 0) {
      localStorage.setItem("access_token", res.dt.access_token);
      dispatch(loginAction(res.dt.user));
      toast.success(res.em);
      navigate("/");
      form.resetFields();
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="d-flex flex-column gap-5">
          <div className="top">
            <h1>Đăng nhập</h1>
            <p className="fs-4">Hãy nhập địa chỉ email và mật khẩu của bạn.</p>
          </div>
          <div className="bottom">
            <Form
              form={form}
              layout="vertical"
              initialValues={{
                emailOrUsername: "pduong244@gmail.com",
                password: "123",
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item<ILoginForm>
                label="Email hoặc Username"
                name="emailOrUsername"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập Email hoặc Username!",
                  },
                ]}
              >
                <Input size="large" placeholder="Email hoặc Username" />
              </Form.Item>
              <Form.Item<ILoginForm>
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
                  placeholder="Mật khẩu của bạn"
                />
              </Form.Item>
              <Form.Item>
                <div className="d-flex justify-content-between">
                  <Form.Item<ILoginForm>
                    name="remember"
                    valuePropName="checked"
                    noStyle
                  >
                    <Checkbox>Lưu đăng nhập</Checkbox>
                  </Form.Item>

                  <Link to={"/auth/forgot-password"}>Quên mật khẩu</Link>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                  disabled={!submittable || isLoading}
                >
                  Đăng nhập
                </Button>
                Bạn chưa có tài khoản?
                <Link to={"/auth/register"}> Đăng ký ngay!</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
