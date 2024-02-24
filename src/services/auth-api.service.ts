import {
  ILoginForm,
  ILoginResponse,
  IRegisterForm,
} from "../interfaces/auth.interface";
import { IApiResponse } from "../interfaces/global.interface";
import axios from "../utils/axios-customize";

export const login = (
  data: ILoginForm
): Promise<IApiResponse<ILoginResponse>> => {
  return axios.post(`auth/login`, {
    username: data.emailOrUsername,
    password: data.password,
  });
};

export const register = (data: IRegisterForm): Promise<IApiResponse<null>> => {
  return axios.post(`auth/register`, {
    ...data,
  });
};

export const logout = (): Promise<IApiResponse<null>> => {
  return axios.post(`auth/logout`);
};
export const getAccount = (): Promise<IApiResponse<ILoginResponse>> => {
  return axios.get(`auth/account`);
};
