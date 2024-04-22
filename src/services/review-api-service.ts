import {
  IApiResponse,
  IApiResponsePagination,
} from "../interfaces/global.interface";
import {
  IReviewChapterForm,
  IReviewChapterInfo,
  IReviewDetailChapterInfo,
} from "../interfaces/review.interface";
import { IChapter, IStory, IVolume } from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getStoriesReview = (
  page: number,
  pageSize: number
): Promise<IApiResponsePagination<IStory>> => {
  return axios.get(`reviews/story_list?page=${page}&pageSize=${pageSize}`);
};

export const sendRequestToBecomeReviewer = (): Promise<
  IApiResponse<unknown>
> => {
  return axios.post(`tickets/send`);
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

export const getReviewDetailChapterInfo = (
  id: number | string
): Promise<IApiResponse<IReviewDetailChapterInfo>> => {
  return axios.get(`reviews/review_detail?chapterId=${id}`);
};

export const sendReviewResult = (
  data: IReviewChapterForm
): Promise<IApiResponse<null>> => {
  return axios.post(`reviews/send`, { ...data });
};

export const getUnreviewChapters = (
  page: number,
  pageSize: number
): Promise<IApiResponsePagination<IChapter>> => {
  return axios.get(
    `reviews/chapter_review_author?&page=${page}&pageSize=${pageSize}`
  );
};

export const getChaptersNeedToReview = (
  page: number,
  pageSize: number
): Promise<IApiResponsePagination<IChapter>> => {
  return axios.get(`reviews/chapter_review?&page=${page}&pageSize=${pageSize}`);
};
