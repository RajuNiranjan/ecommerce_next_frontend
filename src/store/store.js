import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './actions/auth.slice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
})