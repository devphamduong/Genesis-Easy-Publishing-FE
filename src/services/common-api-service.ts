import axios from "../utils/axios-customize";
import {
  IApiResponse,
  IFilterOptions,
  IReportOption,
} from "../interfaces/global.interface";

export const getReportOptions = (): Promise<IApiResponse<IReportOption[]>> => {
  return axios.get(`reports/options`);
};

export const getFilterOptions = (): Promise<IApiResponse<IFilterOptions>> => {
  return axios.get(`category/options`);
};
