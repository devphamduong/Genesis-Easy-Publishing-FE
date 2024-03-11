import { FC, useEffect, useState } from "react";
import "./ChangePassword.scss";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  changePassword,
  resetPassword,
} from "../../../services/auth-api.service";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/account/accountSlice";
import { BsInfoCircleFill } from "react-icons/bs";

interface IProps {}

type FieldType = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const ChangePasswordPage: FC<IProps> = (props: IProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    const res = await changePassword(values);
    if (res && res.ec === 0) {
      toast.success(res.em);
      form.resetFields();
      dispatch(logoutAction());
      navigate("/auth/login");
    } else {
      toast.error(res.em);
    }
    setIsLoading(false);
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <div className="d-flex flex-column gap-3">
          <div className="top">
            <div className="fs-6 d-flex align-items-center gap-1">
              <BsInfoCircleFill />
              <span>
                Click vào từng tên truyện để có thể xem chi tiết số liệu thống
                kê của truyện đó.
              </span>
            </div>
          </div>
          <div className="bottom d-flex justify-content-center">
            <Form
              className="w-50"
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item<FieldType>
                name="oldPassword"
                label="Mật khẩu hiện tại"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>
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
                label="Nhập lại mật khẩu mới"
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
                  disabled={!submittable || isLoading}
                  loading={isLoading}
                  size="large"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
