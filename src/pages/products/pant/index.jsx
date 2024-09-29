import ProductCard from "@/components/productCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ENV_VAR } from "@/config/envVar";
import {
  pantProductDataSuccess,
  productsFailure,
  productStart,
} from "@/store/actions/product.slice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pant = () => {
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { pant, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const res = await axios.get(`${API_URI}/api/product/category/pant`);
        const data = res.data;
        dispatch(pantProductDataSuccess(data.product));
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
        ? // Render skeletons when loading
          Array(12)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="w-full h-[300px]">
                <CardContent className="p-0 h-[70%] bg-slate-200">
                  <Skeleton className="h-full w-full" />
                </CardContent>
                <CardFooter className="p-2 flex flex-col gap-4  my-2 h-[30%]">
                  <Skeleton className="h-3 rounded-full w-full" />
                  <div className="flex gap-4 w-full justify-between items-center">
                    <Skeleton className="h-3 w-[80%]  rounded-full " />
                    <Skeleton className="h-3 w-[20%]  rounded-full " />
                  </div>{" "}
                  <div className="flex gap-4 w-full justify-between items-center">
                    <Skeleton className="h-3 w-[80%]  rounded-full " />
                    <Skeleton className="h-3 w-[20%]  rounded-full " />
                  </div>
                </CardFooter>
              </Card>
            ))
        : pant.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
    </div>
  );
};

export default Pant;
