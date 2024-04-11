import { Drawer, DrawerProps } from "antd";
import { FC } from "react";
// import './AuthorDrawer.scss'

interface IProps extends DrawerProps {
  children?: React.ReactNode;
}

const AuthorDrawer: FC<IProps> = (props: IProps) => {
  const { children } = props;

  return <Drawer {...props}>{children}</Drawer>;
};

export default AuthorDrawer;
