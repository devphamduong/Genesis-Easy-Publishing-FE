import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import { FC } from "react";

interface IProps {}

const Header: FC<IProps> = (props: IProps) => {
  const [current, setCurrent] = useState("mail");
  const items: MenuProps["items"] = [
    {
      label: "Truyện chất lượng cao",
      key: "mail",
      icon: <MailOutlined />,
    },
    {
      label: "Truyện mới đăng",
      key: "app",
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: "Navigation Three - Submenu",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
          children: [
            {
              label: "Option 1",
              key: "setting:1",
            },
            {
              label: "Option 2",
              key: "setting:2",
            },
          ],
        },
      ],
    },
    {
      label: <NavLink to={"/vl"}>Truyện đề xuất</NavLink>,
      key: "alipay",
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg header-container">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to={"/"}>
          The Genesis
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink className="nav-link" to={"/"}>
              Truyện chất lượng cao
            </NavLink>
            <NavLink className="nav-link" to={"/vl"}>
              Truyện mới đăng
            </NavLink>
            <NavLink className="nav-link" to={"/vx"}>
              Truyện đề xuất
            </NavLink>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
