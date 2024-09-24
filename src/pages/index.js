import ProductCard from "@/components/productCard";
import { ENV_VAR } from "@/config/envVar";
import React, { useEffect } from "react";
import {
  productStart,
  productsFailure,
  allProductSuccess,
} from "@/store/actions/product.slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addressStart } from "@/store/actions/address.slice";



const Home = () => {
  const { API_URI } = ENV_VAR;
  const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const res = await axios.get(`${API_URI}/api/product`);
        const data = res.data;
        dispatch(allProductSuccess(data.products));
      } catch (error) {
        console.log(error);
        dispatch(productsFailure(error));
      }
    };
    fetchProducts();
  }, [API_URI, dispatch]);



  return (
    <>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
        {loading ? (
          Array(12)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="w-full h-[300px]">
                <CardContent className="p-0 h-[70%] bg-slate-200">
                  <Skeleton className="h-full w-full" />
                </CardContent>
                <CardFooter className="p-2 flex flex-col gap-4  my-2 h-[30%]">
                  <Skeleton className="h-3 rounded-full w-full" />
                  <div className="flex gap-4 justify-between items-center">
                    <Skeleton className="h-3 w-32  rounded-full " />
                    <Skeleton className="h-3 w-8  rounded-full " />
                  </div>
                  <div className="flex gap-4 justify-between items-center">
                    <Skeleton className="h-3 w-32  rounded-full " />
                    <Skeleton className="h-3 w-8  rounded-full " />
                  </div>
                </CardFooter>
              </Card>
            ))
        ) : allProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
