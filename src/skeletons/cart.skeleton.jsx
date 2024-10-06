import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CartSkeleton = () => {
  return (
    <Card className="h-max w-full sm:h-[200px] relative">
      <CardContent className="h-full p-2">
        <div className="grid grid-cols-2 gap-2 items-start justify-start">
          <div className="h-[180px]">
            <Skeleton className="w-full h-full bg-gray-300" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full bg-gray-300" />
            <Skeleton className="h-5 w-[80%] bg-gray-300" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-32 bg-gray-300" />
              <Skeleton className="h-6 w-6 rounded-full bg-gray-300" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 bg-gray-300" />
              <Skeleton className="h-6 w-6 bg-gray-300" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-10 bg-gray-300" />
              <Skeleton className="h-4 w-6 bg-gray-300" />
            </div>
            <Skeleton className="w-full h-5 bg-gray-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSkeleton;
