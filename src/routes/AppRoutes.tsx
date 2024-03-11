import UserLayout from "../layouts/User";
import HomePage from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import RankStories from "../pages/RankStories";
import MostReadInWeek from "../pages/RankStories/MostReadInWeek";
import { RouteEndPointForUser } from "../constants/route-end-point.constant";
import StoriesWithMostFan from "../pages/RankStories/StoriesWithMostFan";
import TopFullStories from "../pages/RankStories/TopFullStories";
import MostVIPStoriesRead from "../pages/RankStories/MostVIPStoriesRead";
import RankStoriesLayout from "../layouts/RankStories";
import { ICategory } from "../interfaces/category.interface";
import { getAllCategories } from "../services/category-api.service";
import DetailStoryPage from "../pages/DetailStory";
import ReadStoryPage from "../pages/ReadStory";
import CategoryPage from "../pages/Category";
import AuthLayout from "../layouts/Auth";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import ForgotPasswordPage from "../pages/Auth/ForgotPassword";
import NotFoundPage from "../pages/NotFound";
import AuthorPage from "../pages/Author";
import AuthorLayout from "../layouts/Author";
import ResetPasswordPage from "../pages/Auth/ResetPassword";
import ProfilePage from "../pages/Profile";
import ProfileLayout from "../layouts/User/Dashboard";
import DepositPage from "../pages/Profile/Deposit";
import WriteStoryPage from "../pages/Author/WriteStory";
import WriteChapterPage from "../pages/Author/WriteStory/WriteChapter";
import PostedStoriesPage from "../pages/Author/PostedStories";
import ChangePasswordPage from "../pages/Auth/ChangePassword";

interface IProps {}

const AppRoutes: FC<IProps> = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    const res = await getAllCategories();
    if (res && res.ec === 0) {
      setCategories(res.dt);
    }
  };

  return (
    <>
      <Routes>
        {/* main */}
        <Route path="/" element={<UserLayout categories={categories} />}>
          <Route index element={<HomePage />} />
          <Route
            path={RouteEndPointForUser.RANK_STORIES}
            element={<RankStoriesLayout categories={categories} />}
          >
            <Route index element={<RankStories />} />
            <Route
              path={RouteEndPointForUser.MOST_READ_IN_WEEK}
              element={<MostReadInWeek />}
            />
            <Route
              path={RouteEndPointForUser.MOST_VIP_STORIES_READ}
              element={<MostVIPStoriesRead />}
            />
            <Route
              path={RouteEndPointForUser.TOP_FULL_STORIES}
              element={<TopFullStories />}
            />
            <Route
              path={RouteEndPointForUser.STORIES_WITH_MOST_FAN}
              element={<StoriesWithMostFan />}
            />
          </Route>
          <Route path="story/:id/:slug" element={<DetailStoryPage />}></Route>
          <Route
            path="story/read/:id/:chapter"
            element={<ReadStoryPage />}
          ></Route>
          <Route path="category/:id/:slug" element={<CategoryPage />}></Route>
          <Route path="author/:id/:slug" element={<AuthorPage />}></Route>
        </Route>

        {/* auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />}></Route>
          <Route
            path="forgot-password"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route path="reset-password" element={<ResetPasswordPage />}></Route>
        </Route>

        {/* profile */}
        <Route path="/user" element={<ProfileLayout categories={categories} />}>
          <Route path="dashboard" element={<ProfilePage />}></Route>
          <Route path="deposit" element={<DepositPage />}></Route>
          <Route
            path="change-password"
            element={<ChangePasswordPage />}
          ></Route>
        </Route>

        {/* author */}
        <Route
          path="/author"
          element={<AuthorLayout categories={categories} />}
        >
          <Route path="posted-stories" element={<PostedStoriesPage />} />
          <Route path="write-story" element={<WriteStoryPage />}></Route>
          <Route path="write-chapter" element={<WriteChapterPage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      {/* <PrivateRoutes path='/users' component={User} />
             <PrivateRoutes path='/roles' component={Role} />
             <PrivateRoutes path='/group-role' component={GroupRole} />
             <PrivateRoutes path='/project' element={User}></PrivateRoutes> */}
    </>
  );
};

export default AppRoutes;
