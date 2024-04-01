import { FC, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAccount } from "./services/auth-api-service";
import { getAccountAction } from "./redux/account/accountSlice";
import { IRootState } from "./redux/store";
import { Button, ConfigProvider, theme } from "antd";

interface IProps {}

const AppMain: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: IRootState) => state.account.isLoading);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
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

  return (
    // <ConfigProvider
    //   theme={{
    //     algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    //   }}
    // >
    //   <Button onClick={handleClick}>
    //     Change Theme to {isDarkMode ? "Light" : "Dark"}
    //   </Button>
    // {/* </ConfigProvider> */}
    <AppRoutes />
  );
};

export default AppMain;
