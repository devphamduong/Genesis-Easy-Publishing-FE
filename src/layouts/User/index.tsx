import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "../../components/Header";
import { FC } from "react";
import { ICategory } from "../../interfaces/category.interface";
import { Affix } from "antd";

interface IProps {
  categories: ICategory[];
}

const UserLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;

  return (
    <>
      <Headers />
      <div>
        <Outlet context={categories} />
      </div>
      <Footer categories={categories} />
    </>
  );
};

export default UserLayout;
