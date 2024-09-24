import React, { useEffect, useCallback } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { ENV_VAR } from "@/config/envVar";
import { useDispatch, useSelector } from "react-redux";
import {
  cartData,
  cartFailure,
  cartStart,
  cartSuccess,
} from "@/store/actions/cart.slice";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import dynamic from "next/dynamic";
import Not_Found from "@/assets/json/no_data.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ViewCartProductCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();

  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchCartData = useCallback(async () => {
    if (!user || !TOKEN) return;

    dispatch(cartStart());
    try {
      const res = await axios.get(`${API_URI}/api/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      dispatch(cartData(res.data.cartItems));
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      dispatch(cartFailure(error));
    }
  }, [API_URI, dispatch, TOKEN, user]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleRemoveFromCart = async (id) => {
    if (!user || !TOKEN) return;

    dispatch(cartStart());
    try {
      await axios.delete(`${API_URI}/api/cart/${user._id}/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      dispatch(cartSuccess());
      fetchCartData();
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      dispatch(cartFailure(error));
    }
  };

  const getContrastColor = (backgroundColor) => {
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? "black" : "white";
  };

  return (
    <>
      {loading ? (
        Array(12)
          .fill(0)
          .map((_, index) => (
            <Card key={index} className="h-max w-full sm:h-[200px] relative">
              <CardContent className="h-full p-2">
                <div className="grid grid-cols-2 gap-2 items-start justify-start">
                  <div className="h-[180px]">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-[80%]" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-10" />
                        <Skeleton className="h-4 w-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-10" />
                        <Skeleton className="h-4 w-6" />
                      </div>
                    </div>
                    <Skeleton className="w-full h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
      ) : cartItems.length === 0 ? (
        <div className="w-screen">
          <Lottie animationData={Not_Found} loop autoplay />
        </div>
      ) : (
        cartItems.map((cart) => (
          <Card
            key={cart.product._id}
            className="h-max w-full sm:h-[200px] relative"
          >
            <Badge
              onClick={() => handleRemoveFromCart(cart.product._id)}
              className="absolute cursor-pointer -right-2 -top-2 p-1 bg-gray-300 text-gray-500 hover:bg-gray-200"
            >
              <X size={12} />
            </Badge>
            <CardContent className="h-full p-2">
              <div className="flex gap-2 items-start justify-start">
                <div className="h-[180px]">
                  <Link href={`/products/${cart.product._id}`}>
                    <Image
                      width={150}
                      height={150} // Adjust height to maintain aspect ratio
                      src={cart.product.images[0]}
                      alt={cart.product.productName}
                      className="h-full object-contain rounded-xl"
                    />
                  </Link>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-semibold">
                      {cart.product.productName}
                    </h1>
                    <div className="flex items-center gap-1">
                      <span>Size:</span>
                      <span className="h-7 w-7 border bg-red-500 text-white transition-all duration-300 rounded-sm flex justify-center items-center uppercase">
                        {cart.size}
                      </span>
                    </div>
                    <p className="flex items-center gap-2">
                      Color:
                      <p
                        style={{
                          backgroundColor: cart.color,
                          color: getContrastColor(cart.color),
                        }}
                        className="h-5 w-5 rounded-full"
                      />
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <small>
                        Fabric:{" "}
                        <span className="font-semibold">
                          {cart.product.fabric}
                        </span>
                      </small>
                      <small>
                        Quantity:{" "}
                        <span className="font-semibold">{cart.quantity}</span>
                      </small>
                    </div>
                    <div className="font-mono flex gap-2 items-center">
                      <span className="text-2xl font-semibold">
                        ₹{cart.product.price}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹{cart.product.offerPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};

export default ViewCartProductCard;
