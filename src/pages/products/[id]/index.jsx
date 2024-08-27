import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleProduct = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      <div>
        <Image
          src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
          width={500}
          height={500}
          alt=""
          className="rounded-sm shadow-lg"
        />
      </div>
      <div className="  flex flex-col gap-4 ">
        <h1 className="text-4xl font-semibold  cursor-default">T-Shirt</h1>

        <div className="font-mono flex gap-2 items-center">
          <span className="text-2xl font-semibold">$569</span>
          <span className="line-through text-gray-500">$899</span>
          <span className="font-medium text-green-600">22% off</span>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={50}
            height={50}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold font-xl ">Select Size</h1>
          <div className="flex gap-4">
            <Button className="h-7 w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white  transition-all duration-300 rounded-sm flex justify-center items-center ">
              S
            </Button>
            <Button className="h-7 w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white  transition-all duration-300 rounded-sm flex justify-center items-center ">
              M
            </Button>
            <Button className="h-7 w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
              L
            </Button>
          </div>
        </div>
        <p>
          Fabric : <span>Nylon</span>
        </p>
        <div className="flex gap-4 w-full">
          <Link href="/viewcart">
            <Button className="bg-red-500 hover:bg-red-600 w-full flex gap-1">
              <ShoppingBag size={16} />
              ADD TO BAG
            </Button>
          </Link>
          <Link href="/wishlist">
            {" "}
            <Button className="w-full flex gap-1">
              <Heart size={16} />
              WISHLIST
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
