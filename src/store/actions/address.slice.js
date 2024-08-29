import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: false,
    error: null,
    address: null
}

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        addAddressStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        addAddressSuccess: (state, action) => {
            state.loading = false;
            state.address = action.payload;
            state.error = null;
        },
        addAddressFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.address = null;
        },
        deleteAddress: (state) => {
            state.address = null;
        }
    }
})

export const { addAddressStart, addAddressSuccess, addAddressFailure, deleteAddress } = addressSlice.actions

export default addressSlice.reducer