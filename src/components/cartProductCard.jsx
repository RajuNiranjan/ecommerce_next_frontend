import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const CartProductCard = () => {
  return (
    <Card className="p-2 flex flex-wrap  hover:shadow-xl w-full">
      <div className="flex  w-[25%] items-center flex-col gap-2">
        <Link href="/products/123">
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={150}
            height={150}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
        </Link>

        <div className="flex items-center gap-2">
          <Button className="h-7 w-7 border bg-transparent text-black    hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
            -
          </Button>
          <h1 className="text-xl">0</h1>
          <Button className="h-7 w-7 border bg-transparent text-black  hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
            +
          </Button>
        </div>
      </div>
      <div className="w-[75%] p-2 flex flex-wrap justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-semibold">T-Shirt</h1>
          <div className="flex items-center gap-1">
            <span>Size : </span>{" "}
            <span className="h-7 w-7 border bg-red-500 text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
              S
            </span>
          </div>
          <p>
            Fabric : <span className="font-semibold">Cotton</span>
          </p>
          <div className="font-mono flex gap-2 items-center">
            <span className="text-2xl font-semibold">$569</span>
            <span className="line-through text-gray-500">$899</span>
            <span className="font-medium text-green-600">22% off</span>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <p>
            Delivery by Fri Aug 16 |{" "}
            <span className="text-green-500">Free</span>
          </p>
          <Button className="border bg-transparent text-black  hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CartProductCard;
