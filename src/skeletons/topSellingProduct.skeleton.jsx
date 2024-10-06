import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

const TopSellingProductSkeleton = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell>
          <Skeleton className="w-[100px] h-[50px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[150px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[50px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[50px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[50px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[100px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[100px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-[50px] h-[20px] rounded-md bg-gray-300" />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TopSellingProductSkeleton;
