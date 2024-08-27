import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.token = null;
            state.user = null;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            localStorage.setItem("token", action.payload.token);
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.token = null;
            state.user = null;
        }
    }
})

export const { authFailure, authStart, authSuccess } = authSlice.actions
export default authSlice.reducer