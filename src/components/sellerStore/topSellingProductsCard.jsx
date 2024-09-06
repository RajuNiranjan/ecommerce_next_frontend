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
import { useDispatch } from "react-redux";

import axios from "axios";
import { useParams } from "next/navigation";

const TopSellingProductsCard = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const { id } = useParams();
  const { API_URI } = ENV_VAR;
  const TOKEN = localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleShowAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URI}/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = res.data;

        console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Error fetching product:", error.message || error);
      }
    };

    fetchData();
  }, [TOKEN, API_URI, dispatch, id]);

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
                    <TableCell className="font-medium">
                      Casuual T-Shirt
                    </TableCell>
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
        )}
      </div>
    </div>
  );
};

export default TopSellingProductsCard;
