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
  return axios.get(`shelves/topcate_shelves?cateId=${id}`);
};

export const getStoriesMostReadByCategoryId = (
  id: string
): Promise<IApiResponse<IStory[]>> => {
  return axios.get(`shelves/topcate_read?cateId=${id}`);
};

export const getPaginationStoriesByCategoryId = (
  id: string | number,
  page: number,
  pageSize: number
): Promise<IApiResponse<IPaginationStory>> => {
  return axios.get(
    `shelves/cate_shelves?cateId=${id}&page=${page}&pageSize=${pageSize}`
  );
};
