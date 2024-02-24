export interface IUser {
  userId: string | number;
  email: string;
  username: string;
  userFullname: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  status: string | number;
  userImage: string;
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
