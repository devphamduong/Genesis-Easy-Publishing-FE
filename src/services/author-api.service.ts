import { IApiResponse } from "../interfaces/global.interface";
import { IAuthor } from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getAuthorById = (
  id: number | string
): Promise<IApiResponse<IAuthor>> => {
  return axios.get(`authors/story_detail?storyid=${id}`);
};
