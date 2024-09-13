import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    cartItems: []
}

const cartSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        cartStart: (state) => {
            state.loading = true;
            state.error = null
        },
        cartFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        cartSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        cartData: (state, action) => {
            state.cartItems = action.payload;
            state.loading = false
        }

    }
})

export const { cartData, cartFailure, cartStart, cartSuccess } = cartSlice.actions
export default cartSlice.reducer