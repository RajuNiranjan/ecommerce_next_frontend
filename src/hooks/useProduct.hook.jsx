import { ENV_VAR } from "@/config/envVar";
import {
  allProductSuccess,
  productsFailure,
  productStart,
  setCategoryProducts,
  singleProductDataSuccess,
} from "@/store/actions/product.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useProduct = () => {
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchAllProducts = async () => {
    dispatch(productStart());
    try {
      const res = await axios.get(`${API_URI}/api/product`);
      dispatch(allProductSuccess(res.data.products));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

  const fetchProductByCategory = async (category) => {
    dispatch(productStart());
    try {
      const res = await axios.get(
        `${API_URI}/api/product/category/${category}`
      );
      dispatch(setCategoryProducts(res.data.product));
    } catch (error) {
      dispatch(productsFailure(error));
    }
  };

  const fetchSingleProduct = async (productId) => {
    dispatch(productStart());
    try {
      const res = await axios.get(
        `${API_URI}/api/product/singel_product/${productId}`
      );

      dispatch(singleProductDataSuccess(res.data.product));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

  return { fetchAllProducts, fetchProductByCategory, fetchSingleProduct };
};
