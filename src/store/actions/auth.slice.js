import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    user: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.loading = true;
            state.user = null;
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
            state.user = null;
        }
    }
})

export const { authFailure, authStart, authSuccess } = authSlice.actions
export default authSlice.reducer