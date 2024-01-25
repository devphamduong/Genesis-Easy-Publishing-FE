import { FC } from "react";
import "./ListBooks.scss";
import { Button, Col, List, Row, Typography } from "antd";
const { Text } = Typography;

interface IProps {
  showDetailFirstBook?: boolean;
  title: string;
  books: { name: string; chapters: number; author: string }[];
}

const ListBooks: FC<IProps> = (props: IProps) => {
  const { showDetailFirstBook, title, books } = props;

  const renderItemBook = (
    item: { name: string; chapters: number; author: string },
    index: number
  ) => {
    return (
      <Row className="w-100" align={"middle"} justify={"space-between"}>
        <Col span={2}>
          <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
            <span>{index + 1}</span>
          </div>
        </Col>
        <Col span={19}>
          <Text ellipsis={true} className="name">
            <span>{item.name}</span>
          </Text>
        </Col>
        <Col span={2}>
          <div className="chapters">{item.chapters}</div>
        </Col>
      </Row>
    );
  };

  const renderItemWithDetailFirstBook = (
    item: { name: string; chapters: number; author: string },
    index: number
  ) => {
    return (
      <Row className="w-100" align={"top"} justify={"space-between"}>
        <Col span={2}>
          <div className={`rank ${index + 1 <= 3 && `top top-${index + 1}`}`}>
            <span>{index + 1}</span>
          </div>
        </Col>
        <Col span={16} className="d-flex flex-column">
          <strong className="name">{item.name}</strong>
          <div className="chapters">{item.chapters} Chương</div>
          <div>
            <span className="author">{item.author}</span>
          </div>
          <div className="category">
            <Button size={"small"}>Kiếm Hiệp</Button>
          </div>
        </Col>
        <Col span={5}>
          <div className="image-hover">
            <img
              src="https://cdn.pixabay.com/photo/2015/05/13/14/34/cube-765526_640.jpg"
              alt=""
              width={60}
              height={90}
            />
          </div>
        </Col>
      </Row>
    );
  };

  return (
    <div className="list-books-container">
      <List
        size="small"
        header={<strong>{title}</strong>}
        bordered
        dataSource={books}
        renderItem={(item, index) => (
          <List.Item key={`top-${item.name}`} className="book-item">
            {showDetailFirstBook && index === 0
              ? renderItemWithDetailFirstBook(item, index)
              : renderItemBook(item, index)}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListBooks;
