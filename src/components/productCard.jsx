import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";

const ProductCard = () => {
  return (
    <Card className="w-full overflow-hidden h-full  flex flex-col justify-between  md:gap-4  hover:shadow-xl transition-all duration-300 relative">
      <Badge className="bg-green-500 rounded-l  absolute top-0 left-0 tracking-widest  ">
        Latest
      </Badge>

      <CardContent className="p-0 h-[70%] ">
        <Link href="/products/123">
          <Image
            src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
            width={500}
            height={500}
            alt=""
            className="rounded-sm"
          />
        </Link>
      </CardContent>
      <CardFooter className="p-2 my-2 h-[30%]   w-full flex justify-center  flex-col items-start">
        <Link
          href="/"
          className="transition-all duration-200 hover:text-red-500"
        >
          <h1 className="text-md font-medium ">Winter T-Shirt</h1>
        </Link>
        <div className="flex justify-between  w-full ">
          <div className="flex flex-col gap-1 ">
            <p className="text-xs md:text-sm">
              <span>Fabric:</span> <span>cotton</span>
            </p>
            <p className="text-xs md:text-sm">
              <span>Brand:</span> <span>Tomy Finland</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="text-sm md:text-lg text-green-500 font-medium">
              $599
            </h1>
            <small className="text-xs line-through text-slate-500">$899</small>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
