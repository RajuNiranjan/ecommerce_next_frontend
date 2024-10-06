import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AddressSkeleton = () => {
  return (
    <Card className="bg-transparent hover:shadow-xl transition-all duration-300 space-y-2 p-2">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-3 rounded-full bg-gray-300" />
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <Skeleton className="w-full h-3 rounded bg-gray-300" />
      </CardContent>
      <CardFooter className="p-0 flex justify-between items-center">
        <Skeleton className="w-[80px] h-3 rounded bg-gray-300" />
        <Skeleton className="w-[80px] h-3 rounded bg-gray-300" />
        <Skeleton className="w-[80px] h-3 rounded bg-gray-300" />
        <Skeleton className="w-4 h-4 rounded-full bg-gray-300" />
      </CardFooter>
    </Card>
  );
};

export default AddressSkeleton;
