import { FC } from "react";
import "./EPExport.scss";
import EPButton from "../../EP-UI/Button";
import { exportPDF } from "../../../shared/function";
import { BsFiletypePdf } from "react-icons/bs";
import "../../../assets/css/preview-print.css";
interface IProps {
  customText?: string;
  storyTitle: string;
  contentToExport?: string;
}

const EPExport: FC<IProps> = (props: IProps) => {
  const { customText, storyTitle, contentToExport } = props;

  const handleExport = () => {
    exportPDF(storyTitle, contentToExport);
  };

  return (
    <EPButton
      icon={<BsFiletypePdf />}
      onClick={() => handleExport()}
      size="large"
    >
      {customText ? customText : "Export PDF"}
    </EPButton>
  );
};

export default EPExport;
