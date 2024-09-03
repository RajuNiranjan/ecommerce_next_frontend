const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  error: null,
  address: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addressStart: (state) => {
      state.loading = true;
      state.error = null;
      state.address = null;
    },
    addressSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.address = action.payload;
    },
    addressFailure: (state, action) => {
      state.loading = false;
      state.address = null;
      state.error = action.payload;
    },
    addressDelete: (state) => {
      state.loading = false;
      state.address = null;
      state.error = null;
    },
  },
});

export const { addressFailure, addressStart, addressSuccess, addressDelete } =
  addressSlice.actions;

export default addressSlice.reducer;
