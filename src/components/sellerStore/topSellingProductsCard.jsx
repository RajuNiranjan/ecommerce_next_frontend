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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopSellingProductsCard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [token, setToken] = useState("");
  const [editProduct, setEditProduct] = useState(null); // State to hold the product being edited
  const { id } = useParams();
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const TOKEN = localStorage.getItem("token");

  const handleShowAddProduct = () => {
    setShowAddProduct((prev) => !prev);
    setEditProduct(null); // Reset edit product when opening AddProduct without editing
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
        if (Array.isArray(data.products)) {
          dispatch(productsSuccess(data.products));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching product:", error.message || error);
        dispatch(productsFailure(error));
      }
    };

    fetchProducts();
  }, [token, API_URI, dispatch, id]);

  const handleDeleteProduct = async (id) => {
    dispatch(productStart());
    try {
      const res = await axios.delete(`${API_URI}/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = res.data;
      dispatch(productsSuccess(data.products));
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
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
          <AddProduct
            setShowAddProduct={setShowAddProduct}
            editProduct={editProduct}
          />
        ) : (
          <Card className="h-[650px] overflow-scroll">
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
                  ) : Array.isArray(products) && products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8}>No Product Available</TableCell>
                    </TableRow>
                  ) : Array.isArray(products) && products.length > 0 ? (
                    products.map((item, index) => (
                      <TableRow key={index}>
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
                                onClick={() => handleEditProduct(item)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteProduct(item._id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>Invalid data format</TableCell>
                    </TableRow>
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
