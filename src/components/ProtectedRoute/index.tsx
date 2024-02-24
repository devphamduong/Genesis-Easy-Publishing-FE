import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";
import { FC } from "react";

interface IProps {}

const RoleBaseRoute: FC<IProps> = (props: any) => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;

  if (
    (isAdminRoute && userRole === "ADMIN") ||
    (!isAdminRoute && (userRole === "USER" || userRole === "ADMIN"))
  ) {
    return <>{props.children}</>;
  } else {
    return <NotPermitted />;
  }
};

const ProtectedRoute = (props: any) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <RoleBaseRoute>{props.children}</RoleBaseRoute>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
