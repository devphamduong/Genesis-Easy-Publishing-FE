import { FC, ReactNode } from "react";
import "./EPButton.scss";
import { Button, ConfigProvider } from "antd";
import { BaseButtonProps } from "antd/es/button/button";

interface IProps extends BaseButtonProps {
  color?: string;
  warning?: boolean;
  onClick?: () => void;
}

const EPButton: FC<IProps> = (props: IProps) => {
  const { onClick, warning, color, children } = props;

  return (
    <ConfigProvider
      theme={
        warning
          ? {
              token: {
                colorPrimary: "#ffc107",
              },
            }
          : color
          ? {
              token: {
                colorPrimary: color,
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
        className="d-flex align-items-center justify-content-center"
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default EPButton;
