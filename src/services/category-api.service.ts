import { ICategory } from "../interfaces/category.interface";
import { IApiResponse } from "../interfaces/global.interface";
import axios from "../utils/axios-customize";

export const getAllCategories = (): Promise<IApiResponse<ICategory[]>> => {
  return axios.get("category");
};
