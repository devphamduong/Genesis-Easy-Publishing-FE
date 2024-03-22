import { Outlet } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { FC } from "react";

interface IProps {
  isAuthenticated: boolean;
  children?: React.ReactNode;
}

const ProtectedRoute: FC<IProps> = (props) => {
  const { isAuthenticated, children } = props;

  return (
    <>{isAuthenticated ? children ? children : <Outlet /> : <NotPermitted />}</>
  );
};

export default ProtectedRoute;
