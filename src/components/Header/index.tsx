import {
  AppstoreOutlined,
  MailOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Affix, Avatar, Col, Input, Menu, MenuProps, Popover, Row } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { FC } from "react";

interface IProps {}

const Header: FC<IProps> = (props: IProps) => {
  const [current, setCurrent] = useState("mail");
  const items: MenuProps["items"] = [
    {
      label: <NavLink to={"/"}>Truyện chất lượng cao</NavLink>,
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: <NavLink to={"/"}>Truyện mới đăng</NavLink>,
      key: "app",
      icon: <AppstoreOutlined />,
    },
    {
      label: <NavLink to={"/vl"}>Truyện đề xuất</NavLink>,
      key: "alipay",
    },
  ];

  return (
    <Affix>
      <div className="navbar header-container">
        <div className="container-fluid">
          <Row align={"middle"} className="w-100">
            <Col span={13}>
              <Row align={"middle"}>
                <Col span={4}>
                  <NavLink className="navbar-brand" to={"/"}>
                    The Genesis
                  </NavLink>
                </Col>
                <Col>
                  <Menu
                    style={{ backgroundColor: "transparent" }}
                    onClick={(e) => setCurrent(e.key)}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={11}>
              <Row justify={"space-between"}>
                <Col span={12}>
                  <Input
                    variant="borderless"
                    size="large"
                    placeholder="large size"
                    prefix={<SearchOutlined />}
                  />
                </Col>
                <Col>
                  <Popover
                    content={
                      <div>
                        <p>Content</p>
                        <p>Content</p>
                      </div>
                    }
                    trigger="click"
                    title="Title"
                  >
                    <Avatar
                      size="large"
                      icon={<UserOutlined />}
                      style={{ cursor: "pointer" }}
                    />
                  </Popover>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Affix>
  );
};

export default Header;
