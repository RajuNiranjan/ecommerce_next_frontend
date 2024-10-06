import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SellerSkeleton = () => {
  return (
    <div className="space-y-4 w-full">
      <Skeleton className="w-full h-[30px] rounded-lg bg-gray-300" />
      <Card className="hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-2">
          <Skeleton className="w-full  h-[20px] rounded-full bg-gray-300" />
          <CardContent className="p-0 space-y-2">
            <Skeleton className="w-[150px] h-[20px] rounded-full bg-gray-300" />
            <Skeleton className="w-full h-[60px] rounded-lg bg-gray-300" />
          </CardContent>
        </CardHeader>
        <CardFooter className="w-full p-2">
          <Skeleton className="w-full h-[40px] rounded-lg bg-gray-300" />
        </CardFooter>
      </Card>
      <Skeleton className="w-full h-[40px] rounded-lg bg-gray-300" />
    </div>
  );
};

export default SellerSkeleton;
