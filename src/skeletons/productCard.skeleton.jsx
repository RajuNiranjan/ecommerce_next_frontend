import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-full h-full max-h-[450px] min-h-[300px]">
      <CardContent className="p-0 h-[70%] ">
        <Skeleton className="h-full w-full bg-gray-300" />
      </CardContent>
      <CardFooter className="p-2 flex flex-col gap-4  my-2 h-[30%]">
        <Skeleton className="h-3 rounded-full w-full bg-gray-300" />
        <div className="flex gap-4 w-full justify-between items-center">
          <Skeleton className="h-3 w-[80%]  rounded-full bg-gray-300" />
          <Skeleton className="h-3 w-[20%]  rounded-full bg-gray-300 " />
        </div>
        <div className="flex gap-4 w-full justify-between items-center">
          <Skeleton className="h-3 w-[80%]  rounded-full bg-gray-300 " />
          <Skeleton className="h-3 w-[20%]  rounded-full bg-gray-300 " />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
