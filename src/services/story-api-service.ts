import { ICategory } from "../interfaces/category.interface";
import { IApiResponse } from "../interfaces/global.interface";
import {
  IChapterContent,
  IPaginationChapter,
  IPaginationComment,
  IPaginationStory,
  IReportForm,
  ISendCommentPayload,
  IStory,
} from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getTop6Purchase = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("shelves/top6_purchase");
};

export const getTopLatestByChapter = (): Promise<
  IApiResponse<IPaginationStory>
> => {
  return axios.get("shelves/top_latest_by_chapter");
};

export const getTopFamous = (): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get("shelves/top_famous");
};

export const getFilteredStories = (
  query?: string
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(`shelves/filter?${query}`);
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
  return axios.get(`story/story_detail?storyId=${id}`);
};

export const getRelatedStoriesById = (
  id: number | string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`story/story_detail/related?storyId=${id}`);
};

export const getPaginationChaptersByStoryId = (
  id: string | number,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationChapter>> => {
  return axios.get(
    `chapters/story_detail?storyId=${id}&page=${page}&pageSize=${pageSize}`
  );
};

export const getPaginationCommentsByStoryId = (
  id: string | number,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationComment>> => {
  return axios.get(
    `comments/story_detail?storyId=${id}&page=${page}&pageSize=${pageSize}`
  );
};

export const getPaginationStoriesFollowing = (
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(`shelves/my_follow?page=${page}&pageSize=${pageSize}`);
};

export const getPaginationStoriesReadHistory = (
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(`shelves/my_read?page=${page}&pageSize=${pageSize}`);
};

export const getPaginationOwnedStories = (
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(`shelves/my_owned?page=${page}&pageSize=${pageSize}`);
};

export const likeStory = (id: string | number): Promise<IApiResponse<null>> => {
  return axios.put(`interaction/story_like?storyId=${id}`);
};

export const followStory = (
  id: string | number
): Promise<IApiResponse<null>> => {
  return axios.put(`interaction/story_follow?storyId=${id}`);
};

export const commentStory = (
  data: ISendCommentPayload
): Promise<IApiResponse<null>> => {
  return axios.post(`comments/send`, { ...data });
};

export const updateComment = (
  id: number | string,
  data: {
    commentContent: string;
  }
): Promise<IApiResponse<null>> => {
  return axios.post(`comments/edit?commentId=${id}`, { ...data });
};

export const reportStory = (data: IReportForm): Promise<IApiResponse<null>> => {
  return axios.post(`reports/send`, { ...data });
};

export const getChapterContent = (
  storyId: string | number,
  chapterNumber: number
): Promise<IApiResponse<IChapterContent>> => {
  return axios.get(`chapters/chapter_content/${storyId}/${chapterNumber}`);
};

export const getGlobalSearchStories = (
  query?: string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`story/search_global?${query}`);
};

export const updateStoryCover = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileImg: any,
  storyId: number | string
): Promise<IApiResponse<{ fileUploaded: string }>> => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", fileImg);
  bodyFormData.append("storyId", storyId as string);
  return axios({
    method: "put",
    url: "story/update_storyImage",
    data: bodyFormData,
  });
};

export const uploadStoryCover = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileImg: any
): Promise<IApiResponse<{ fileUploaded: string }>> => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", fileImg);
  return axios({
    method: "put",
    url: "story/upload_image",
    data: bodyFormData,
  });
};

export const likeChapter = (
  storyId: number | string,
  chapterNumber: number | string
): Promise<IApiResponse<null>> => {
  return axios.put(
    `interaction/chapter_like?storyId=${storyId}&chapterNum=${chapterNumber}`
  );
};
