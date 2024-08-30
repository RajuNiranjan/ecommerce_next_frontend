const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    loading: false,
    error: null,
    seller: null
}

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        sellerRegStart: (state) => {
            state.loading = true;
            state.error = null
        },
        sellerRegFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }, sellerRegSuccess: (state, action) => {
            state.loading = false;
            state.seller = action.payload
        }, deleteSeller: (state, action) => {
            state.seller = null
        },
    }
})

export const { deleteSeller, sellerRegFailure, sellerRegStart, sellerRegSuccess } = sellerSlice.actions

export default sellerSlice.reducer