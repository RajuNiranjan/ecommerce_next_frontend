const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
  error: null,
  products: [],
  allProducts: [],
  SingleProduct: {},
  shirt: [],
  pant: [],
  tshirt: [],
  hoddie: [],
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
    singleProductDataSuccess: (state, action) => {
      state.SingleProduct = action.payload;
      state.loading = false;
    },
    shitProductDataSuccess: (state, action) => {
      state.shirt = action.payload;
      state.loading = false;
    },
    pantProductDataSuccess: (state, action) => {
      state.pant = action.payload;
      state.loading = false;
    },
    tshirtProductDataSuccess: (state, action) => {
      state.tshirt = action.payload;
      state.loading = false;
    },
    hoddieProductDataSuccess: (state, action) => {
      state.hoddie = action.payload;
      state.loading = false;
    },
  },
});

export const {
  productStart,
  productsFailure,
  productsSuccess,
  allProductSuccess,
  singleProductDataSuccess,
  shitProductDataSuccess,
  pantProductDataSuccess,
  tshirtProductDataSuccess,
  hoddieProductDataSuccess,
} = productsSlice.actions;

export default productsSlice.reducer;
