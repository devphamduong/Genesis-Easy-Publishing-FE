import { EUpdateBalanceAction } from "../../enums/transaction.enum";
import { IUser } from "../../interfaces/auth.interface";
import { createSlice } from "@reduxjs/toolkit";
import { IUpdateBalanceAction } from "../../interfaces/transaction.interface";

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
    descriptionMarkdown: "",
    descriptionHTML: "",
    tlt: 0,
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
    updateAccountBalance: (state, action) => {
      const { updateAction, amount }: IUpdateBalanceAction = action.payload;
      switch (updateAction) {
        case EUpdateBalanceAction.BUY:
          state.user.tlt -= amount;
          break;
        case EUpdateBalanceAction.TOPUP:
          break;
      }
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
  updateAccountBalance,
} = accountSlice.actions;

export default accountSlice.reducer;
