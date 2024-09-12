import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./actions/auth.slice";
import AddressReducer from "./actions/address.slice";
import SellerReducer from "./actions/seller.slice";
import ProductsReducer from './actions/product.slice'
import WishListReducer from './actions/wishList.slice'
import CartReducer from './actions/cart.slice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    address: AddressReducer,
    seller: SellerReducer,
    products: ProductsReducer,
    wishList: WishListReducer,
    cart: CartReducer
  },
});
