import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import AddProduct from "../product/addProduct";
import { EllipsisVerticalIcon, Plus, X } from "lucide-react";

import { useParams } from "next/navigation";

import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/hooks/useStore.hook";
import { useSelector } from "react-redux";
import TopSellingProductSkeleton from "@/skeletons/topSellingProduct.skeleton";

const TopSellingProductsCard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const { id: storeId } = useParams();
  const { products, loading } = useSelector((state) => state.products);

  const handleShowAddProduct = () => {
    setShowAddProduct((prev) => !prev);
    setEditProduct(null);
  };

  const { fetchStoreProducts, deleteStoreProduct } = useStore();

  useEffect(() => {
    fetchStoreProducts(storeId);
  }, []);

  const handleDeleteProduct = async (id) => {
    await deleteStoreProduct(id);
    fetchStoreProducts(storeId);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowAddProduct(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end items-end">
          <Button
            onClick={handleShowAddProduct}
            className="flex justify-center items-center gap-2">
            {showAddProduct ? (
              <>
                <X size={22} /> CANCEL
              </>
            ) : (
              <>
                <Plus size={22} /> ADD PRODUCT
              </>
            )}
          </Button>
        </div>
        {showAddProduct ? (
          <AddProduct
            setShowAddProduct={setShowAddProduct}
            editProduct={editProduct}
          />
        ) : (
          <Card className="h-[650px] overflow-scroll ">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                PRODUCT DETAILS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">PRODUCT IMAGE</TableHead>
                    <TableHead className="w-[150px]">PRODUCT NAME</TableHead>
                    <TableHead className="w-[50px]">CATEGORY</TableHead>
                    <TableHead className="w-[50px]">PRICE</TableHead>
                    <TableHead className="w-[50px]">STOCKS</TableHead>
                    <TableHead className="w-[100px]">SIZES</TableHead>
                    <TableHead className="w-[100px]">COLORS</TableHead>
                    <TableHead className="w-[50px]">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>

                {loading ? (
                  [...Array(6)].map((_, idx) => (
                    <TopSellingProductSkeleton key={idx} />
                  ))
                ) : Array.isArray(products) && products.length === 0 ? (
                  <div>
                    <h1>No Product Available</h1>
                  </div>
                ) : (
                  Array.isArray(products) &&
                  products.length > 0 &&
                  products.map((item, index) => (
                    <TableBody key={index}>
                      <TableRow>
                        <TableCell>
                          <Image
                            src={item.images[0] || "/placeholder.jpg"}
                            alt="Product Image"
                            width={50}
                            height={50}
                            className="object-cover"
                            loading="lazy"
                          />
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.categories}</TableCell>
                        <TableCell>₹ {item.price}</TableCell>
                        <TableCell>{item.stockLevel}</TableCell>
                        <TableCell>{item.size.join(", ")}</TableCell>
                        <TableCell>{item.colors.join(", ")}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <EllipsisVerticalIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => handleEditProduct(item)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(item._id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ))
                )}
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TopSellingProductsCard;
