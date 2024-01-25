import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Headers from "../../components/Header";

function UserLayout() {
  return (
    <div className="layout-app">
      <Headers />
      <div className="container py-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
