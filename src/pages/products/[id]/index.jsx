import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleProduct = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 space-x-2 ">
      {/* LEFT CONTAINER */}
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="relative rounded-sm overflow-hidden ">
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
          />
          <Badge className="absolute rounded-l bg-yellow-500 top-0 left-0">
            BESTSELLER
          </Badge>
        </div>
      </div>
      {/* RIGHT CONTAINER */}
      <div className=" flex flex-col  gap-4 ">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold  cursor-default">T-Shirt</h1>
          <h3 className="text-xl text-gray-500 font-medium">
            Men&apos;s Green Oversized T-shirt
          </h3>
        </div>
        <div>
          <div className="font-mono flex gap-2 items-center">
            <span className="text-2xl font-semibold">$569</span>
            <span className="line-through text-gray-500">$899</span>
            <span className="font-medium text-green-600">22% off</span>
          </div>
          <h3 className="text-gray-500 text-lg">inclusive of all taxes</h3>
        </div>
        <div className="space-x-2">
          <Badge className="rounded-sm bg-gray-500">OVERSIZE FIT</Badge>
          <Badge className="rounded-sm border border-black text-black bg-transparent">
            100% COTTON
          </Badge>
        </div>
        <div className="flex h-20 w-[60px] gap-2 ">
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
            className="rounded-sm shadow-lg cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl ">Select Size</h1>
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
            <Button className="h-7 w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
              XL
            </Button>
            <Button className="h-7 w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
              XXL
            </Button>
          </div>
        </div>
        <div className="flex gap-4 w-full flex-col md:flex-row">
          <Link href="/viewcart" className="w-full">
            <Button className="bg-red-500 hover:bg-red-600 w-full flex gap-1">
              <ShoppingBag size={16} />
              ADD TO BAG
            </Button>
          </Link>
          <Link href="/wishlist" className="w-full">
            <Button className="w-full bg-transparent text-black border hover:bg-transparent flex items-center gap-1">
              <Heart size={15} />
              WISHLIST
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
