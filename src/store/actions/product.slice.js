const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    loading: false,
    error: null,
    products: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        productStart: (state) => {
            state.loading = true;
            state.error = null;
            state.products = []
        },
        productsSuccess: (state, action) => {
            state.products = action.payload;
            state.error = null;
            state.loading = false
        },
        productsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.products = []
        }
    }
})

export const { productStart, productsFailure, productsSuccess } = productsSlice.actions

export default productsSlice.reducer