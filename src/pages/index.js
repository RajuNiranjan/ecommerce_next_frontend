import ProductCard from "@/components/productCard";
import { ENV_VAR } from "@/config/envVar";
import React, { useEffect } from "react";
import { productStart, productsFailure, allProductSuccess } from "@/store/actions/product.slice";
import { useDispatch } from "react-redux";
import axios from "axios";


const Home = () => {

  const { API_URI } = ENV_VAR
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart())
      try {
        const res = await axios.get(`${API_URI}/api/product`)
        const data = res.data
        dispatch(allProductSuccess(data.products))
      } catch (error) {
        console.log(error);
        dispatch(productsFailure(error))
      }
    }
    fetchProducts()
  }, [API_URI, dispatch])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      <ProductCard />
    </div>
  );
};

export default Home;
