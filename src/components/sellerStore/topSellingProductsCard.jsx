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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import AddProduct from "../product/addProduct";
import { EllipsisVerticalIcon } from "lucide-react";

const TopSellingProductsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h1>PRODUCT DETAILS</h1>
          <Dialog>
            <DialogTrigger>
              <Button>Add Product</Button>
            </DialogTrigger>
            <DialogContent>
              <AddProduct />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">PRODUCT NAME</TableHead>
              <TableHead className="w-[50px]">CATEGORY</TableHead>
              <TableHead className="w-[50px]">PRICE</TableHead>
              <TableHead className="w-[50px]">STOCKS</TableHead>
              <TableHead className="w-[100px]">SIZES</TableHead>
              <TableHead className="w-[100px]">COLORS</TableHead>
              <TableHead className="w-[50px]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Casuual T-Shirt</TableCell>
              <TableCell>T-SHIRT</TableCell>
              <TableCell>$50.0</TableCell>
              <TableCell>250</TableCell>
              <TableCell>X</TableCell>
              <TableCell>Black</TableCell>
              <TableCell>
                <EllipsisVerticalIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSellingProductsCard;
