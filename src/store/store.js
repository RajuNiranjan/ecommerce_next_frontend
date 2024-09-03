import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./actions/auth.slice";
import AddressReducer from "./actions/address.slice";
import SellerReducer from "./actions/seller.slice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    address: AddressReducer,
    seller: SellerReducer,
  },
});
