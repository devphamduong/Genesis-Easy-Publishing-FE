import { FC, useEffect, useState } from "react";
import EPButton from "../EP-UI/Button";
import { LuRefreshCw } from "react-icons/lu";
import { Flex } from "antd";
import "./NetworkDetection.scss";
import { VscDebugDisconnect } from "react-icons/vsc";

interface IProps {
  children?: React.ReactNode;
}

const NetworkDetection: FC<IProps> = (props: IProps) => {
  const { children } = props;
  const [isFirstTimeLostConnection, setIsFirstTimeLostConnection] =
    useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(() => {
    if (navigator.onLine) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    window.ononline = (e) => {
      setStatus(true);
    };
    window.onoffline = (e) => {
      setIsFirstTimeLostConnection(true);
      setStatus(false);
    };
  }, [status]);

  const handleReconnect = () => {
    if (navigator.onLine) {
      setIsFirstTimeLostConnection(false);
    }
  };

  return status && !isFirstTimeLostConnection ? (
    children
  ) : (
    <Flex
      align="center"
      justify="center"
      className="network-detection-container"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "30%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Flex
        align="center"
        vertical
        gap={30}
        className="network-detection-content"
      >
        <VscDebugDisconnect className="network-detection-icon" />
        <p className="network-detection-text fs-5 text-center">
          Không thể kết nối. Vui lòng kiểm tra lại đường truyền mạng của bạn.
        </p>
        <EPButton
          extraClassName="re-connect-button"
          size="large"
          icon={<LuRefreshCw />}
          type="default"
          onClick={() => handleReconnect()}
        >
          Làm mới
        </EPButton>
      </Flex>
    </Flex>
  );
};

export default NetworkDetection;
