import { FC } from "react";
import "./ListStoriesSkeleton.scss";
import { List, Skeleton } from "antd";

interface IProps {}

const ListStoriesSkeleton: FC<IProps> = (props: IProps) => {
  const amount = 10;

  return (
    <div className="list-stories-skeleton-container">
      <List
        size="small"
        header={<Skeleton.Input active size="small" />}
        bordered
        dataSource={Array.from({ length: amount }, () => ({}))}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <div className="w-100 ">
              <Skeleton.Input active size="small" block />
              <Skeleton.Input active size="small" />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListStoriesSkeleton;
