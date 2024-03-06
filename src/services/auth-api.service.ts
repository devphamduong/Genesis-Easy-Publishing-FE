import {
  IEditProfileForm,
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
    emailOrUsername: data.emailOrUsername,
    password: data.password,
  });
};

export const register = (data: IRegisterForm): Promise<IApiResponse<null>> => {
  return axios.post(`auth/register`, {
    ...data,
  });
};

export const updateProfile = (
  data: IEditProfileForm
): Promise<IApiResponse<null>> => {
  return axios.put(`auth/edit_profile`, {
    ...data,
  });
};

export const logout = (): Promise<IApiResponse<null>> => {
  return axios.post(`auth/logout`);
};

export const getAccount = (): Promise<IApiResponse<ILoginResponse>> => {
  return axios.get(`auth/account`);
};

export const forgotPassword = (data: {
  email: string;
}): Promise<IApiResponse<null>> => {
  return axios.post(`auth/forgot_password`, {
    ...data,
  });
};
