import { FC, ReactNode } from "react";
import "./EPButton.scss";
import { Button, ConfigProvider } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface IProps extends BaseButtonProps {
  warning?: boolean | true;
  onClick?: () => void;
}

const EPButton: FC<IProps> = (props: IProps) => {
  const { onClick, warning, children } = props;

  return (
    <ConfigProvider
      theme={
        warning
          ? {
              token: {
                colorPrimary: "#ffc107",
              },
            }
          : undefined
      }
    >
      <Button
        {...props}
        onClick={onClick}
        type={props.type ?? "primary"}
        style={warning ? { color: "#000" } : undefined}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default EPButton;
