import { Drawer, Flex } from "antd";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { EMenuLabel } from "../../../enums/menu.enum";
import {
  ERouteEndPointForAuthor,
  ERouteEndPointForUser,
} from "../../../enums/route-end-point.enum";
import { GiBookshelf } from "react-icons/gi";
import EPButton from "../../../components/EP-UI/Button";
import { VscOpenPreview } from "react-icons/vsc";
import { TbBookUpload } from "react-icons/tb";
import { GrChapterAdd } from "react-icons/gr";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Sidebar: FC<IProps> = (props: IProps) => {
  const { open, setOpen } = props;
  const navigate = useNavigate();

  return (
    <Drawer
      className="side-bar"
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
      <Flex vertical align="start" gap={10}>
        <EPButton
          type="text"
          icon={<GiBookshelf className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.POSTED_STORIES)}
        >
          {EMenuLabel.AUTHOR_POSTED_STORY}
        </EPButton>
        <EPButton
          type="text"
          icon={<TbBookUpload className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.WRITE_STORY)}
        >
          {EMenuLabel.AUTHOR_WRITE_STORY}
        </EPButton>
        <EPButton
          type="text"
          disabled
          icon={<GrChapterAdd className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.WRITE_CHAPTER)}
        >
          {EMenuLabel.AUTHOR_WRITE_CHAPTER}
        </EPButton>
        <EPButton
          type="text"
          icon={<VscOpenPreview className="fs-5" />}
          block
          onClick={() => navigate(ERouteEndPointForAuthor.REVIEW)}
        >
          {EMenuLabel.AUTHOR_REVIEW_STORY}
        </EPButton>
      </Flex>
    </Drawer>
  );
};

export default Sidebar;
