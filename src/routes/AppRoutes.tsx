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
import DetailStory from "../pages/DetailStory";
import ReadStory from "../pages/ReadStory";

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
          <Route path={"story/:id/:slug"} element={<DetailStory />}></Route>
          <Route
            path={"story/read/:id/:chapter"}
            element={<ReadStory />}
          ></Route>
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
};

export default AppRoutes;
