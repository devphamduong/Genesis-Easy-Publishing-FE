import UserLayout from "../layouts/User";
import HomePage from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import RankStories from "../pages/RankStories";
import MostReadInWeek from "../pages/RankStories/MostReadInWeek";
import { ERouteEndPointForUser } from "../enums/route-end-point.enum";
import StoriesWithMostFan from "../pages/RankStories/StoriesWithMostFan";
import TopFullStories from "../pages/RankStories/TopFullStories";
import MostVIPStoriesRead from "../pages/RankStories/MostVIPStoriesRead";
import RankStoriesLayout from "../layouts/RankStories";
import { ICategory } from "../interfaces/category.interface";
import { getAllCategories } from "../services/category-api-service";
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
import PaymentConfirmPage from "../pages/PaymentConfirm";
import FollowingPage from "../pages/Profile/Following";
import ReadHistoryPage from "../pages/Profile/ReadHistory";
import OwnedStoriesPage from "../pages/Profile/OwnedStories";
import ReviewPage from "../pages/Author/Review";
import ProtectedRoute from "../components/ProtectedRoute";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import ReviewAChapterPage from "../pages/Author/Review/ReviewAChapter";
import ReviewerProtectedRoute from "../components/ProtectedRoute/Reviewer";

interface IProps {}

const AppRoutes: FC<IProps> = (props: IProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const isAuthenticated = useSelector(
    (state: IRootState) => state.account.isAuthenticated
  );
  const role = useSelector((state: IRootState) => state.account.user.role);

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
          <Route
            path="payment-confirm"
            element={<PaymentConfirmPage />}
          ></Route>
          <Route index element={<HomePage />} />
          <Route
            path={ERouteEndPointForUser.RANK_STORIES}
            element={<RankStoriesLayout categories={categories} />}
          >
            <Route index element={<RankStories />} />
            <Route
              path={ERouteEndPointForUser.MOST_READ_IN_WEEK}
              element={<MostReadInWeek />}
            />
            <Route
              path={ERouteEndPointForUser.MOST_VIP_STORIES_READ}
              element={<MostVIPStoriesRead />}
            />
            <Route
              path={ERouteEndPointForUser.TOP_FULL_STORIES}
              element={<TopFullStories />}
            />
            <Route
              path={ERouteEndPointForUser.STORIES_WITH_MOST_FAN}
              element={<StoriesWithMostFan />}
            />
          </Route>
          <Route
            path="story/detail/:id/:slug"
            element={<DetailStoryPage />}
          ></Route>
          <Route
            path="story/read/:id/:chapter"
            element={<ReadStoryPage />}
          ></Route>
          <Route
            path="category/detail/:id/:slug"
            element={<CategoryPage />}
          ></Route>
          <Route path="author/detail" element={<AuthorPage />}></Route>
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
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/user"
            element={<ProfileLayout categories={categories} />}
          >
            <Route path="dashboard" element={<ProfilePage />}></Route>
            <Route path="deposit" element={<DepositPage />}></Route>
            <Route path="owned-stories" element={<OwnedStoriesPage />}></Route>
            <Route path="following" element={<FollowingPage />}></Route>
            <Route path="read-history" element={<ReadHistoryPage />}></Route>
            <Route
              path="change-password"
              element={<ChangePasswordPage />}
            ></Route>
          </Route>
        </Route>

        {/* author */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/author"
            element={<AuthorLayout categories={categories} />}
          >
            <Route path="posted-stories" element={<PostedStoriesPage />} />
            <Route path="write-story" element={<WriteStoryPage />}></Route>
            <Route path="write-chapter" element={<WriteChapterPage />}></Route>
            <Route
              path="review"
              element={
                <ReviewerProtectedRoute
                  isAuthenticated={isAuthenticated}
                  role={role}
                >
                  <ReviewPage />
                </ReviewerProtectedRoute>
              }
            ></Route>
            <Route
              path="review-a-chapter"
              element={
                <ReviewerProtectedRoute
                  isAuthenticated={isAuthenticated}
                  role={role}
                >
                  <ReviewAChapterPage />
                </ReviewerProtectedRoute>
              }
            ></Route>
          </Route>
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
