import ProductCard from "@/components/productCard";

import { ENV_VAR } from "@/config/envVar";
import ProductCardSkeleton from "@/skeletons/productCard.skeleton";
import {
  productsFailure,
  productStart,
  tshirtProductDataSuccess,
} from "@/store/actions/product.slice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TShirt = () => {
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { tshirt, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const res = await axios.get(`${API_URI}/api/product/category/tshirt`);
        const data = res.data;
        dispatch(tshirtProductDataSuccess(data.product));
      } catch (error) {
        console.log(error);
        dispatch(productsFailure(error));
      }
    };
    fetchProducts();
  }, [API_URI, dispatch]);
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      {loading
        ? [...Array(12)].map((_, idx) => <ProductCardSkeleton key={idx} />)
        : tshirt.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
};

export default TShirt;
