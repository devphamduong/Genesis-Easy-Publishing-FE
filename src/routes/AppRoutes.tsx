import UserLayout from "../layouts/User";
import HomePage from "../pages/Home";
import { Route, Routes } from "react-router-dom";

function Test() {
  return <>abc</>;
}

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/vl" element={<Test />} />
        </Route>
        {/* <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route> */}
      </Routes>
      {/* <PrivateRoutes path='/users' component={User} />
             <PrivateRoutes path='/roles' component={Role} />
             <PrivateRoutes path='/group-role' component={GroupRole} />
             <PrivateRoutes path='/project' element={User}></PrivateRoutes> */}
    </>
  );
}

export default AppRoutes;
