import { ENV_VAR } from "@/config/envVar";
import {
  hoddieProductDataSuccess,
  pantProductDataSuccess,
  productsFailure,
  productStart,
  shitProductDataSuccess,
  tshirtProductDataSuccess,
  setCategoryProducts,
} from "@/store/actions/product.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useFetchProdcutCategory = () => {
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();

  const fetchCategory = async (category) => {
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

  return { fetchCategory };
};
