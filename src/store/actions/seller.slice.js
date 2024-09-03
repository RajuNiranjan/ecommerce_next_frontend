const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  error: null,
  seller: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    sellerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.seller = null;
    },
    sellerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.seller = action.payload;
    },
    sellerFailure: (state, action) => {
      state.loading = false;
      state.seller = null;
      state.error = action.payload;
    },
    sellerDelete: (state) => {
      state.loading = false;
      state.seller = null;
      state.error = null;
    },
  },
});

export const { sellerDelete, sellerFailure, sellerStart, sellerSuccess } =
  sellerSlice.actions;
export default sellerSlice.reducer;
