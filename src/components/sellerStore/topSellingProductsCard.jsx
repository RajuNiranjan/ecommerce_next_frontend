import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TopSellingProductsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top SellingProducts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Product</TableHead>
              <TableHead className="w-[150px]">Price</TableHead>
              <TableHead className="w-[150px]">Quantity</TableHead>
              <TableHead className="w-[150px]">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Casuual T-Shirt</TableCell>
              <TableCell>$29.99</TableCell>
              <TableCell>500</TableCell>
              <TableCell>$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSellingProductsCard;
