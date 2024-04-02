import {
  IApiResponse,
  IApiResponsePagination,
} from "../interfaces/global.interface";
import {
  IReviewChapterForm,
  IReviewChapterInfo,
} from "../interfaces/review.interface";
import { IStory, IVolume } from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getStoriesReview = (
  page: number,
  pageSize: number
): Promise<IApiResponsePagination<IStory>> => {
  return axios.get(`reviews/story_list?page=${page}&pageSize=${pageSize}`);
};

export const getVolumeList = (
  storyId: string | number
): Promise<IApiResponse<IVolume[]>> => {
  return axios.get(`reviews/volume_list?storyId=${storyId}`);
};

export const getReviewChapterInfo = (
  id: number | string
): Promise<IApiResponse<IReviewChapterInfo>> => {
  return axios.get(`reviews/chapter_information?chapterId=${id}`);
};

export const sendReviewResult = (
  data: IReviewChapterForm
): Promise<IApiResponse<null>> => {
  return axios.post(`reviews/send`, { ...data });
};
