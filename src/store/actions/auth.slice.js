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
        },
        authLogOut: (state) => {
            state.user = null;
            localStorage.clear()
            state.loading = false;
            state.error = null;
        }
    }
})

export const { authFailure, authStart, authSuccess, authLogOut } = authSlice.actions
export default authSlice.reducer