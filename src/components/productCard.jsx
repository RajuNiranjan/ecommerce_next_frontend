import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";

const ProductCard = () => {
  return (
    <Card className="w-[250px] h-[400px] p-4 hover:shadow-xl transition-all duration-300 relative">
      <Badge className="bg-green-500 absolute top-5 left-5 rounded-md">
        latest
      </Badge>
      <CardContent className="p-0 md:h-[300px] ">
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
      <CardFooter className="p-0 my-2  w-full flex flex-col items-start">
        <Link
          href="/"
          className="transition-all duration-200 hover:text-red-500"
        >
          <h1 className="text-md font-medium ">Winter T-Shirt</h1>
        </Link>
        <div className="flex justify-between  w-full ">
          <div className="flex flex-col gap-1 ">
            <p className="text-sm">
              <span>Fabric:</span> <span>cotton</span>
            </p>
            <p className="text-sm">
              <span>Brand:</span> <span>Tomy Finland</span>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="text-lg text-green-500 font-medium">$599</h1>
            <small className="line-through text-slate-500">$899</small>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
