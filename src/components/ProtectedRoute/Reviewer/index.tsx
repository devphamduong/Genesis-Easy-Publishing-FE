import { Outlet } from "react-router-dom";
import { FC } from "react";
import { EUserRole } from "../../../enums/user.enum";
import NotPermitted from "./NotPermitted";

interface IProps {
  isAuthenticated: boolean;
  role: EUserRole;
  children?: React.ReactNode;
}

const ReviewerProtectedRoute: FC<IProps> = (props) => {
  const { isAuthenticated, role, children } = props;

  if (isAuthenticated) {
    if (role === EUserRole.REVIEWER) {
      return children ? children : <Outlet />;
    } else {
      return <NotPermitted />;
    }
  }
};

export default ReviewerProtectedRoute;
