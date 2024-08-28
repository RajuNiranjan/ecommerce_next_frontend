import CartProductCard from "@/components/cartProductCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

const ViewCart = () => {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      <div className="md:w-[70%] w-full gap-2 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 ">
        <CartProductCard />
        <CartProductCard />
        <CartProductCard />
      </div>
      <div className="md:w-[28%] w-full ">
        <Card className="w-full sticky  top-20">
          <CardHeader className="p-2">
            <h1 className="text-xl font-bold">PRICE DETAILS</h1>
          </CardHeader>
          <hr />
          <CardContent className="flex flex-col gap-4 my-2">
            <div className="flex justify-between items-center">
              <p>Price (2 Items)</p>
              <p>$ 400.99</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Discount</p>
              <p className="text-green-500">- $ 190.99</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Delivery Charges</p>
              <p className="text-green-500">Free</p>
            </div>
            <hr />
            <div className="flex font-bold text-xl justify-between items-center">
              <p>Total Amount</p>
              <p>$ 210</p>
            </div>
            <hr />
          </CardContent>
          <CardFooter className="flex gap-2 flex-col w-full p-2">
            <Button className="border bg-red-500  w-full hover:bg-red-600 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
              CHECK OUT
            </Button>
            <small className="text-green-500">
              You will save $190.99 on this order
            </small>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ViewCart;
