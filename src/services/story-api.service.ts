import { ICategory } from "../interfaces/category.interface";
import { IApiResponse } from "../interfaces/global.interface";
import { IPaginationStory, IStory } from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getTop6Purchase = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("shelves/top6_purchase");
};

export const getTopLatestByChapter = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("shelves/top_latest_by_chapter");
};

export const getTopFamous = (): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get("shelves/top_famous");
};

export const getStoriesByCategory = (): Promise<IApiResponse<ICategory[]>> => {
  return axios.get("shelves/cate_stories");
};

export const getTopNewestStories = (): Promise<
  IApiResponse<IPaginationStory>
> => {
  return axios.get("shelves/top_newest");
};

export const getTopReadStories = (): Promise<
  IApiResponse<IPaginationStory>
> => {
  return axios.get("shelves/top_read");
};

export const getStoryDetailById = (
  id: number | string
): Promise<IApiResponse<IStory>> => {
  return axios.get(`story/story_detail?storyid=${id}`);
};

export const getRelatedStoriesById = (
  id: number | string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`story/story_detail/related?storyid=${id}`);
};