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
        <Row className="h-100" align={"middle"}>
          <Col span={8}>
            <Outlet />
            <div className="text-center">
              <Tooltip title="Back home">
                <Button
                  shape="circle"
                  size="large"
                  icon={<HomeOutlined />}
                  onClick={() => navigate("/")}
                />
              </Tooltip>
            </div>
          </Col>
          <Col span={15} className="text-end">
            <img style={{ width: "95%", height: "100%" }} src="" alt="" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
