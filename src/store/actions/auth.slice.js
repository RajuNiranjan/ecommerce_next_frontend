import { ENV_VAR } from "@/config/envVar";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const { API_URI } = ENV_VAR;
  const res = await axios.get(`${API_URI}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.user;
});

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { authFailure, authStart, authSuccess, authLogOut, userInfo } =
  authSlice.actions;
export default authSlice.reducer;
