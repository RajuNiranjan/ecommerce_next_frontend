import React, { useEffect } from "react";
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

const ViewCartProductCard = () => {
  const { user } = useSelector((state) => state.auth);

  const { cartItems, loading } = useSelector((state) => state.cart);

  const { API_URI } = ENV_VAR;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();

  const fetchCartData = async () => {
    dispatch(cartStart());
    try {
      const res = await axios.get(`${API_URI}/api/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = res.data;
      dispatch(cartData(data.cartItems));
    } catch (error) {
      console.log(error);
      dispatch(cartFailure(error));
    }
  };

  useEffect(() => {
    if (user && TOKEN) {
      fetchCartData();
    }
  }, [API_URI, dispatch, TOKEN, user]);

  const handleRemoveFromCart = async (id) => {
    dispatch(cartStart());

    try {
      const res = await axios.delete(
        `${API_URI}/api/cart/${user._id}/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );
      dispatch(cartSuccess());
      fetchCartData();
    } catch (error) {
      console.log(error);
      dispatch(cartFailure());
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
      {loading
        ? Array(6)
            .fill(0)
            .map((_, index) => (
              <Card key={index} className="h-max w-full sm:h-[200px] relative">
                <CardContent>
                  <div className="flex gap-2 items-start justify-start">
                    <div className="h-[180px] w-50%">
                      <Skeleton className="h-[200px] w-[150px] rounded-sm" />
                    </div>
                    <div>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                      <Skeleton className="w-[150px] h-[15px] mt-2 rounded-full" />
                      <Skeleton className="w-[80px] h-[15px] mt-2 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        : cartItems.map((cart, index) => (
            <Card key={index} className="h-max w-full sm:h-[200px] relative">
              <Badge
                onClick={() => handleRemoveFromCart(cart.product._id)}
                className="absolute cursor-pointer -right-2  -top-2 p-1 bg-gray-300 text-gray-500 hover:bg-gray-200 "
              >
                <X size={12} />
              </Badge>
              <CardContent key={index} className="h-full p-2  ">
                <div className="flex gap-2 items-start justify-start">
                  <div className="h-[180px]">
                    <Link href={`/products/${cart.product._id}`}>
                      <Image
                        width={150}
                        height={500}
                        src={cart.product.images[0]}
                        alt=""
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
                        <span>Size : </span>
                        <span className="h-7 w-7 border bg-red-500 text-white transition-all duration-300 rounded-sm flex justify-center items-center uppercase ">
                          {cart.size}
                        </span>
                      </div>
                      <p className="flex items-center gap-2">
                        Color :{" "}
                        <p
                          style={{
                            backgroundColor: cart.color,
                            color: getContrastColor(cart.color),
                          }}
                          className="h-5 w-5 bg-red-500 rounded-full"
                        />
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <small>
                          Fabric :{" "}
                          <span className="font-semibold">
                            {cart.product.fabric}
                          </span>
                        </small>
                        <small>
                          Quantity :{" "}
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
          ))}
    </>
  );
};

export default ViewCartProductCard;
