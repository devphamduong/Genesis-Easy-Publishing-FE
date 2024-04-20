import { FC, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import { getAccount } from "./services/auth-api-service";
import { getAccountAction } from "./redux/account/accountSlice";
import { ConfigProvider, theme } from "antd";
import NetworkDetection from "./components/NetworkDetection";
import useLocalStorage from "use-local-storage";

interface IProps {}

const AppMain: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkTheme", false);

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
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <NetworkDetection>
        <div
          className={`${isDarkMode ? "dark" : "light"}-theme`}
          data-theme={`${isDarkMode ? "dark" : "light"}-theme`}
        >
          <AppRoutes />
        </div>
      </NetworkDetection>
    </ConfigProvider>
  );
};

export default AppMain;
