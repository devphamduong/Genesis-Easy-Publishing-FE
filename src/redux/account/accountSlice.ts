import { EUpdateBalanceAction } from "../../enums/transaction.enum";
import { createSlice } from "@reduxjs/toolkit";
import { IUpdateBalanceAction } from "../../interfaces/transaction.interface";
import { EUserRole } from "../../enums/user.enum";
import { IUser } from "../../interfaces/auth.interface";

const initialState: {
  isAuthenticated: boolean;
  isLoading: boolean;
  isDarkTheme: boolean;
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
    descriptionMarkdown: "",
    descriptionHTML: "",
    tlt: 0,
    role: EUserRole.NORMAL_USER,
  },
  isDarkTheme: JSON.parse(localStorage.getItem("isDarkMode") || "false"),
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
    updateUserAvatarAction: (state, action) => {
      state.user.userImage = action.payload;
    },
    updateUserInfoAction: (state, action) => {
      const {
        userFullname,
        gender,
        phone,
        dob,
        address,
        descriptionMarkdown,
        descriptionHTML,
        access_token,
      } = action.payload;
      localStorage.setItem("access_token", access_token);
      state.user.userFullname = userFullname;
      state.user.gender = gender;
      state.user.phone = phone;
      state.user.dob = dob;
      state.user.address = address;
      state.user.descriptionMarkdown = descriptionMarkdown;
      state.user.descriptionHTML = descriptionHTML;
    },
    updateAccountBalanceAction: (state, action) => {
      const { updateAction, amount }: IUpdateBalanceAction = action.payload;
      switch (updateAction) {
        case EUpdateBalanceAction.BUY:
          state.user.tlt -= amount;
          break;
        case EUpdateBalanceAction.TOPUP:
          state.user.tlt += amount;
          break;
      }
    },
    changeThemeAction: (state, action) => {
      localStorage.setItem("isDarkTheme", action.payload);
      state.isDarkTheme = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  loginAction,
  getAccountAction,
  logoutAction,
  updateUserAvatarAction,
  updateUserInfoAction,
  updateAccountBalanceAction,
  changeThemeAction,
} = accountSlice.actions;

export default accountSlice.reducer;
