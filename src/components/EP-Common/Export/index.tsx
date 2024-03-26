import { FC, useState } from "react";
import "./EPExport.scss";
import EPButton from "../../EP-UI/Button";
import { exportHTMLToDoc } from "../../../shared/function";
import { GrDocumentDownload } from "react-icons/gr";

interface IProps {
  customText?: string;
  contentToExport: string;
  storyTitle?: string;
  chapterTitle?: string;
}

const EPExport: FC<IProps> = (props: IProps) => {
  const { customText, contentToExport, storyTitle, chapterTitle } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleExport = () => {
    setIsLoading(true);
    setTimeout(() => {
      exportHTMLToDoc(contentToExport, storyTitle, chapterTitle);
      setIsLoading(false);
    }, 6000);
  };

  return (
    <EPButton
      icon={<GrDocumentDownload />}
      onClick={() => handleExport()}
      loading={isLoading}
    >
      {customText ? customText : "Export doc"}
    </EPButton>
  );
};

export default EPExport;
