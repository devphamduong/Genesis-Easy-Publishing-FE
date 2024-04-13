import { FC, useState } from "react";
import "./EPExport.scss";
import EPButton from "../../EP-UI/Button";
import { exportHTMLToDoc, exportToWord } from "../../../shared/function";
import { BsFiletypeDoc } from "react-icons/bs";
import { App } from "antd";

interface IProps {
  customText?: string;
  contentToExport: string;
  storyTitle?: string;
  chapterTitle?: string;
}

const EPExport: FC<IProps> = (props: IProps) => {
  const { notification } = App.useApp();
  const { customText, contentToExport, storyTitle, chapterTitle } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleExport = () => {
    setIsSubmitted(true);
    setIsLoading(true);
    setTimeout(() => {
      exportToWord();
      setIsLoading(false);
    }, 6000);
    notification.warning({
      message: "Thông báo",
      description:
        "Bạn cần chờ 2-4 phút (có thể lâu hơn) để chúng tôi xuất ra bản doc. Hãy kiên nhẫn nhé ^^",
    });
  };

  return (
    <EPButton
      icon={<BsFiletypeDoc />}
      onClick={() => handleExport()}
      loading={isLoading}
      size="large"
      disabled={isSubmitted}
    >
      {customText ? customText : "Export doc"}
    </EPButton>
  );
};

export default EPExport;
