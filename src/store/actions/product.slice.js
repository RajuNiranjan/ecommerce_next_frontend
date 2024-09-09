const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  error: null,
  products: [],
  allProducts: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productStart: (state) => {
      state.loading = true;
      state.error = null;
      state.products = [];
      state.allProducts = [];
    },
    productsSuccess: (state, action) => {
      state.products = action.payload;
      state.error = null;
      state.loading = false;
    },
    productsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      (state.products = []), (state.allProducts = []);
    },
    allProductSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.allProducts = action.payload;
    },
  },
});

export const {
  productStart,
  productsFailure,
  productsSuccess,
  allProductSuccess,
} = productsSlice.actions;

export default productsSlice.reducer;
