const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    loading: false,
    error: null,
    wishListItems: []
}

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    reducers: {
        wishListStart: (state) => {
            state.loading = true;
            state.error = null
        },
        wishListFailure: (state, action) => {
            state.loading = false,
                state.error = action.payload
        },
        wishListSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        wishListData: (state, action) => {
            state.wishListItems = action.payload
            state.loading = false
        }

    }
})

export const { wishListFailure, wishListStart, wishListSuccess, wishListData } = wishListSlice.actions
export default wishListSlice.reducer