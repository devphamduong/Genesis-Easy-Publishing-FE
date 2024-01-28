import { IApiResponse } from "../interfaces/global.interface";
import { IStory } from "../interfaces/home/home.interface";
import axios from "../utils/axios-customize";

export const getTop6Purchase = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("story/top6_purchase");
};

export const getTopLatestByChapter = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("story/top_latest_by_chapter");
};

export const getTopFamous = (): Promise<IApiResponse<IStory[]>> => {
  return axios.get("story/top_famous");
};
