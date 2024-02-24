import { IUser } from "./../../interfaces/auth.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser;
} = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    userId: "",
    email: "",
    username: "",
    userFullname: "",
    gender: "",
    dob: "",
    address: "",
    phone: "",
    status: "",
    userImage: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    getAccountAction: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = initialState.user;
    },
    updateUserAvatar: (state, action) => {
      // state.user.tempAvatar = action.payload;
    },
    updateUserInfo: (state, action) => {
      // let { avatar, phone, fullName } = action.payload;
      // state.user.avatar = avatar;
      // state.user.phone = phone;
      // state.user.fullName = fullName;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  loginAction,
  getAccountAction,
  logoutAction,
  updateUserAvatar,
  updateUserInfo,
} = accountSlice.actions;

export default accountSlice.reducer;
