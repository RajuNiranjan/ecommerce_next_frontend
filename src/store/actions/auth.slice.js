import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  user: null,
  userInfo: {
    user: null,
    address: null,
    seller: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    authLogOut: (state) => {
      state.user = null;
      localStorage.clear();
      state.loading = false;
      state.error = null;
    },
    userInfo: (state, action) => {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
    deleteAddress: (state) => {
      state.userInfo.address = null;
    },
    deleteSeller: (state) => {
      state.userInfo.seller = null;
    },
  },
});

export const { authFailure, authStart, authSuccess, authLogOut, userInfo } =
  authSlice.actions;
export default authSlice.reducer;
