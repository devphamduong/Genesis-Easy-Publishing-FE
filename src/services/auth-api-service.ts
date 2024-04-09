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
): Promise<IApiResponse<{ access_token: string }>> => {
  return axios.put(`auth/update_profile`, {
    ...data,
  });
};

export const updateAvatar = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileImg: any
): Promise<IApiResponse<{ fileUploaded: string }>> => {
  const bodyFormData = new FormData();
  bodyFormData.append("image", fileImg);
  return axios({
    method: "put",
    url: "auth/update_avatar",
    data: bodyFormData,
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

export const verifyToken = (data: {
  token: string;
}): Promise<IApiResponse<null>> => {
  return axios.post(`auth/verify_token`, {
    ...data,
  });
};

export const resetPassword = (data: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<IApiResponse<null>> => {
  return axios.post(`auth/reset_password`, {
    ...data,
  });
};

export const changePassword = (data: {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}): Promise<IApiResponse<null>> => {
  return axios.post(`auth/change_password`, {
    ...data,
  });
};
