import { FC } from "react";
import { PropagateLoader } from "react-spinners";

interface IProps {}

const Loading: FC<IProps> = (props: IProps) => {
  return <PropagateLoader color="#36d7b7" />;
};

export default Loading;
