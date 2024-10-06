import { ENV_VAR } from "@/config/envVar";
import {
  allProductSuccess,
  productsFailure,
  productStart,
} from "@/store/actions/product.slice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useFetchAllProducts = () => {
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const res = await axios.get(`${API_URI}/api/product`);
        dispatch(allProductSuccess(res.data.products));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        dispatch(productsFailure(error.response?.data || error.message));
      }
    };

    fetchProducts();
  }, [API_URI, dispatch]);
};
