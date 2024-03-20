import { IApiResponse } from "../interfaces/global.interface";
import {
  IAuthor,
  IChapterInteraction,
  IPaginationStory,
  IStory,
  IStoryInteraction,
} from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getAuthorById = (
  id: number | string
): Promise<IApiResponse<IAuthor>> => {
  return axios.get(`authors/story_detail?storyId=${id}`);
};

export const getAuthorDetailById = (
  id: number | string
): Promise<IApiResponse<IAuthor>> => {
  return axios.get(`authors/author_detail?authorId=${id}`);
};

export const getAuthorStoriesById = (
  id: number | string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`shelves/author_detail?authorId=${id}`);
};

export const getAuthorPostedStories = (
  query: string
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(`shelves/author_manage?${query}`);
};

export const getChartStory = (
  id: string | number
): Promise<IApiResponse<IStoryInteraction>> => {
  return axios.get(`interaction/author_manage/story?storyId=${id}`);
};

export const getChartChapters = (
  id: string | number
): Promise<IApiResponse<IChapterInteraction>> => {
  return axios.get(`interaction/author_manage/chapter?storyId=${id}`);
};
