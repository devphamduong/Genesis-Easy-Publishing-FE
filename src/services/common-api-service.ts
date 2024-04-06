import axios from "../utils/axios-customize";
import {
  IApiResponse,
  IFilterOptions,
  IReportOption,
} from "../interfaces/global.interface";

export const getReportOptions = (): Promise<IApiResponse<IReportOption[]>> => {
  return axios.get(`reports/options`);
};

export const getFilterOptionsV1 = (): Promise<IApiResponse<IFilterOptions>> => {
  return axios.get(`category/options`);
};

export const getFilterOptionsV2 = (): Promise<IApiResponse<IFilterOptions>> => {
  return axios.get(`story/searchOptions`);
};
