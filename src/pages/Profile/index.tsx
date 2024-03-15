import { FC } from "react";
import "./Profile.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../redux/store";
import EditProfile from "../../components/EditProfile";

interface IProps {}

const ProfilePage: FC<IProps> = (props: IProps) => {
  const account = useSelector((state: IRootState) => state.account?.user);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="info">
          <strong className="fs-4">Hey, {account.username}</strong>
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
