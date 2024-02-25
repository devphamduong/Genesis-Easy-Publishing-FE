import { FC } from "react";
import "./Author.scss";
import { Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface IProps {}

const AuthorPage: FC<IProps> = (props: IProps) => {
  return (
    <div className="author-container py-3">
      <div className="author-content container mb-3">
        <div className="top d-flex align-items-center gap-2 mb-3">
          <div className="avatar">
            <Avatar size={64} icon={<UserOutlined />} />
          </div>
          <div className="name">
            <span>Tác giả: </span> <strong>Dương Phạm Chu</strong>
          </div>
        </div>
        <div className="bottom">
          <Card
            size="small"
            title="Giới Thiệu Về Tác Giả Dương Phạm Chu"
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
      <div className="author-stories-content container">
        <p>Danh Sách Truyện Của Tác Giả Dương Phạm Chu</p>
        Row story
      </div>
    </div>
  );
};

export default AuthorPage;
