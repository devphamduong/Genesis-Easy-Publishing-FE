import { Drawer, Flex } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { EAuthorMenuLabel } from "../../../enums/menu.enum";
import { ERouteEndPointForAuthor } from "../../../enums/route-end-point.enum";
import { GiBookshelf } from "react-icons/gi";
import EPButton from "../../../components/EP-UI/Button";
import { VscOpenPreview } from "react-icons/vsc";
import { TbBookUpload } from "react-icons/tb";
import { GrChapterAdd } from "react-icons/gr";
import { PiListChecks } from "react-icons/pi";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Sidebar: FC<IProps> = (props: IProps) => {
  const { open, setOpen } = props;
  const navigate = useNavigate();

  return (
    <Drawer
      className="side-bar-author-container"
      title={
        <Link className="navbar-brand text-center" to={"/"}>
          The Genesis
        </Link>
      }
      placement={"left"}
      onClose={() => setOpen(false)}
      open={open}
      key={"left"}
    >
      <Flex vertical align="start" gap={10} className="side-bar-author-options">
        <EPButton
          type="text"
          icon={<GiBookshelf className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
        >
          {EAuthorMenuLabel.POSTED_STORY}
        </EPButton>
        <EPButton
          type="text"
          icon={<PiListChecks className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.UNREVIEW_CHAPTERS)}
        >
          {EAuthorMenuLabel.UNREVIEW_CHAPTERS}
        </EPButton>
        <EPButton
          type="text"
          icon={<TbBookUpload className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}
        >
          {EAuthorMenuLabel.WRITE_STORY}
        </EPButton>
        <EPButton
          type="text"
          disabled
          icon={<GrChapterAdd className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.WRITE_CHAPTER)}
        >
          {EAuthorMenuLabel.WRITE_CHAPTER}
        </EPButton>
        <EPButton
          type="text"
          icon={<VscOpenPreview className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.REVIEW)}
        >
          {EAuthorMenuLabel.REVIEW_STORY}
        </EPButton>
        <EPButton
          type="text"
          icon={<PiListChecks className="fs-5" />}
          block
          onClick={() =>
            navigate(ERouteEndPointForAuthor.CHAPTERS_NEED_TO_REVIEW)
          }
        >
          {EAuthorMenuLabel.CHAPTERS_NEED_TO_REVIEW}
        </EPButton>
      </Flex>
    </Drawer>
  );
};

export default Sidebar;
