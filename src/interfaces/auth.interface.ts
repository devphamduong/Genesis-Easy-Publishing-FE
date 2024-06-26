import { EUserRole } from "../enums/user.enum";

export interface IUser {
  userId: string | number;
  email: string;
  username: string;
  userFullname: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  status: string;
  userImage: string;
  descriptionMarkdown?: string;
  descriptionHTML?: string;
  tlt: number;
  role: EUserRole;
}

export interface ILoginResponse {
  user: IUser;
  access_token: string;
}

export interface ILoginForm {
  emailOrUsername?: string;
  password?: string;
  remember?: boolean;
}

export interface IRegisterForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  agreement?: boolean;
}

export interface IEditProfileForm {
  email?: string;
  userFullname?: string;
  gender?: boolean;
  dob?: string;
  phone?: string;
  address?: string;
  userImage?: string;
  descriptionMarkdown?: string;
  descriptionHTML?: string;
}
