import { ICategory } from "../interfaces/category.interface";
import { IApiResponse } from "../interfaces/global.interface";
import {
  IChapterContent,
  IPaginationChapter,
  IPaginationComment,
  IPaginationStory,
  IReportForm,
  IStory,
  IWriteStoryForm,
} from "../interfaces/story.interface";
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

export const getPaginationChaptersByStoryId = (
  id: string | number,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationChapter>> => {
  return axios.get(
    `chapters/story_detail?storyid=${id}&page=${page}&pageSize=${pageSize}`
  );
};

export const getPaginationCommentsByStoryId = (
  id: string | number,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationComment>> => {
  return axios.get(
    `comments/story_detail?storyid=${id}&page=${page}&pageSize=${pageSize}`
  );
};

export const likeStory = (id: string | number): Promise<IApiResponse<null>> => {
  return axios.put(`interaction/story_like?storyid=${id}`);
};

export const followStory = (
  id: string | number
): Promise<IApiResponse<null>> => {
  return axios.put(`interaction/story_follow?storyid=${id}`);
};

export const reportStory = (data: IReportForm): Promise<IApiResponse<null>> => {
  return axios.post(`reports/send`, { ...data });
};

export const getChapterContent = (
  storyid: string | number,
  chapterNumber: number
): Promise<IApiResponse<IChapterContent>> => {
  return axios.get(`chapters/chapter_content/${storyid}/${chapterNumber}`);
};

export const createStory = (
  data: IWriteStoryForm
): Promise<IApiResponse<IChapterContent>> => {
  return axios.post(`story/save_story`, { ...data });
};
