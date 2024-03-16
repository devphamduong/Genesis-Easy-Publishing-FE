import { FC, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "./services/auth-api-service";
import { getAccountAction } from "./redux/account/accountSlice";
import { IRootState } from "./redux/store";

interface IProps {}

const App: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: IRootState) => state.account.isLoading);

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    if (
      window.location.pathname === "/auth/login" ||
      window.location.pathname === "/auth/register"
    ) {
      return;
    }
    const res = await getAccount();
    if (res && res.dt) {
      dispatch(getAccountAction(res.dt.user));
    }
  };

  return <AppRoutes />;
};

export default App;
