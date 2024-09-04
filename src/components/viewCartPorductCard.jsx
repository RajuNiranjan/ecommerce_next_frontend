import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import X from "../assets/svg/x.svg";

const ViewCartProductCard = () => {
  return (
    <Card className="h-max w-full sm:h-[200px] relative">
      <Badge className="absolute cursor-pointer -right-2  -top-2 p-1 bg-gray-300 text-gray-500 hover:bg-gray-200 ">
        <Image src={X} alt="cross" width={10} height={10} />
      </Badge>

      <CardContent className="h-full p-2  ">
        <div className="flex gap-2 items-start justify-start">
          <div className="h-[180px]">
            <Link href="/products/123">
              <Image
                width={150}
                height={500}
                src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
                alt=""
                className="h-full object-contain rounded-xl"
              />
            </Link>
          </div>
          <div>
            <div className="flex flex-col gap-2">
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewCartProductCard;
