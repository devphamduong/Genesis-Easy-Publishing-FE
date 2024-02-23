import { ICategory } from "../interfaces/category.interface";
import { IApiResponse } from "../interfaces/global.interface";
import { IPaginationStory, IStory } from "../interfaces/story.interface";
import axios from "../utils/axios-customize";

export const getAllCategories = (): Promise<IApiResponse<ICategory[]>> => {
  return axios.get("category");
};

export const getStoriesByCategoryId = (
  id: string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`shelves/topcate_shelves?cateid=${id}`);
};

export const getPaginationStoriesByCategoryId = (
  id: string,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(
    `shelves/cate_shelves?cateid=${id}&page=${page}&pagesize=${pageSize}`
  );
};
