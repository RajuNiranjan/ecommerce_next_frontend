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
import { ENV_VAR } from "@/config/envVar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  productStart,
  productsFailure,
  productsSuccess,
} from "@/store/actions/product.slice";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const TopSellingProductsCard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [token, setToken] = useState("");
  const { id } = useParams();
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const handleShowAddProduct = () => {
    setShowAddProduct((prev) => !prev);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token || !id) return;

    const fetchProducts = async () => {
      dispatch(productStart());
      try {
        const { data } = await axios.get(`${API_URI}/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(productsSuccess(data.products));
      } catch (error) {
        console.error("Error fetching product:", error.message || error);
        dispatch(productsFailure(error));
      }
    };

    fetchProducts();
  }, [token, API_URI, dispatch, id]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end items-end">
          <Button
            onClick={handleShowAddProduct}
            className="flex justify-center items-center gap-2"
          >
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
          <AddProduct setShowAddProduct={setShowAddProduct} />
        ) : (
          <Card>
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
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="w-[100px] h-[50px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[150px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[50px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[50px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[50px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[100px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[100px] h-[20px] rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[50px] h-[20px] rounded-md" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8}>No Product Available</TableCell>
                    </TableRow>
                  ) : (
                    products.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Image
                            src={item.images[0] || "/placeholder.jpg"}
                            alt="Product Image"
                            width={50}
                            height={50}
                            className="object-cover"
                          />
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.categories}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>{item.stockLevel}</TableCell>
                        <TableCell>{item.size.join(", ")}</TableCell>
                        <TableCell>{item.colors.join(", ")}</TableCell>
                        <TableCell>
                          <EllipsisVerticalIcon />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TopSellingProductsCard;
