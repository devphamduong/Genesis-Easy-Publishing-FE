import { Outlet } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { FC } from "react";

interface IProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: FC<IProps> = (props) => {
  const { isAuthenticated } = props;

  return <>{isAuthenticated ? <Outlet /> : <NotPermitted />}</>;
};

export default ProtectedRoute;
