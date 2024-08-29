import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './actions/auth.slice'
import AddressReducer from './actions/address.slice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        address: AddressReducer
    }
})