import ProductCard from "@/components/productCard";
import { ENV_VAR } from "@/config/envVar";
import {
  allProductSuccess,
  productsFailure,
  productStart,
  shitProductDataSuccess,
} from "@/store/actions/product.slice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Shirt = () => {
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { shirt } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const res = await axios.get(`${API_URI}/api/product/category/shirt`);
        const data = res.data;
        dispatch(shitProductDataSuccess(data.product));
      } catch (error) {
        console.log(error);
        dispatch(productsFailure(error));
      }
    };
    fetchProducts();
  }, [API_URI, dispatch]);
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      {shirt.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Shirt;
