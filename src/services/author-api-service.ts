import { IApiResponse } from "../interfaces/global.interface";
import {
  IAuthor,
  IChapter,
  IChapterInteraction,
  IPaginationStory,
  IStory,
  IStoryInteraction,
  IVolume,
  IWriteChapterForm,
  IWriteStoryForm,
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
  id: number | string,
  status: string = "written"
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`shelves/author_detail/${status}?authorId=${id}`);
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
  query: string
): Promise<IApiResponse<IChapterInteraction>> => {
  return axios.get(`interaction/author_manage/chapter?${query}`);
};

export const getVolumes = (
  id: number | string
): Promise<IApiResponse<IVolume[]>> => {
  return axios.get(`chapters/volume_list?storyId=${id}`);
};

export const getStoryVolume = (
  id: number | string
): Promise<IApiResponse<IVolume[]>> => {
  return axios.get(`chapters/story_volume?storyId=${id}`);
};

export const getStoryInformation = (
  id: string | number
): Promise<IApiResponse<IStory>> => {
  return axios.get(`story/story_information?storyId=${id}`);
};

export const getChapterInformation = (
  id: string | number
): Promise<IApiResponse<IChapter>> => {
  return axios.get(`chapters/chapter_information?chapterId=${id}`);
};

export const createStory = (
  data: IWriteStoryForm
): Promise<IApiResponse<null>> => {
  return axios.post(`story/save_story`, { ...data });
};

export const updateStory = (
  data: IWriteStoryForm
): Promise<IApiResponse<IStory>> => {
  return axios.put(`story/update_story`, { ...data });
};

export const deleteStory = (
  id: number | string
): Promise<IApiResponse<null>> => {
  return axios.put(`story/delete_story?storyId=${id}`);
};

export const addChapter = (
  data: IWriteChapterForm
): Promise<IApiResponse<null>> => {
  return axios.post(`chapters/add_chapter`, { ...data });
};

export const updateChapter = (
  data: IWriteChapterForm
): Promise<IApiResponse<null>> => {
  return axios.put(`chapters/update_chapter`, { ...data });
};

export const deleteChapter = (
  id: number | string
): Promise<IApiResponse<null>> => {
  return axios.put(`chapters/delete_chapter?chapterId=${id}`);
};

export const addVolume = (data: {
  storyId: number;
  volumeTitle: string;
}): Promise<IApiResponse<null>> => {
  return axios.post(`chapters/add_volume`, { ...data });
};

export const updateVolume = (data: {
  volumeId: number | string;
  volumeTitle: string;
}): Promise<IApiResponse<null>> => {
  return axios.put(`chapters/update_volume`, { ...data });
};

export const getReviewInfo = (
  id: number | string
): Promise<IApiResponse<null>> => {
  return axios.get(`reviews/story_review?storyId=${id}`);
};
