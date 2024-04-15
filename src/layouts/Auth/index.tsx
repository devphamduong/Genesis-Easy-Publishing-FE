import { FC } from "react";
import "./AuthLayout.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Row, Tooltip } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface IProps {}

const AuthLayout: FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();
  return (
    <div className="auth-container">
      <div className="auth-content py-5 container h-100">
        <Row className="h-100" align={"middle"} justify={"space-between"}>
          <Col span={8}>
            <Outlet />
            <div className="text-center">
              <Tooltip title="Về trang chủ">
                <Button
                  shape="circle"
                  size="large"
                  icon={<HomeOutlined />}
                  onClick={() => navigate("/")}
                />
              </Tooltip>
            </div>
          </Col>
          <Col span={15} className="banner text-end">
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://i.pinimg.com/originals/b7/3b/00/b73b00fad0a2f24f43739911da68741a.jpg"
              alt=""
            />
            <strong className="fs-3 name">The Genesis</strong>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
