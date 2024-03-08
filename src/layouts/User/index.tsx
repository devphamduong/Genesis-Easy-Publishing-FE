import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { FC } from "react";
import { ICategory } from "../../interfaces/category.interface";

interface IProps {
  categories: ICategory[];
}

const UserLayout: FC<IProps> = (props: IProps) => {
  const { categories } = props;

  return (
    <>
      <Header />
      <div>
        <Outlet context={categories} />
      </div>
      <Footer categories={categories} />
    </>
  );
};

export default UserLayout;
