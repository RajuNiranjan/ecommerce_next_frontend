import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { ENV_VAR } from "@/config/envVar";
import { useDispatch, useSelector } from "react-redux";
import { cartData, cartFailure, cartStart } from "@/store/actions/cart.slice";
import axios from "axios";

const ViewCartProductCard = () => {
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.cart);

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
      {cartItems.map((cart, index) => (
        <Card key={index} className="h-max w-full sm:h-[200px] relative">
          <Badge className="absolute cursor-pointer -right-2  -top-2 p-1 bg-gray-300 text-gray-500 hover:bg-gray-200 ">
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
                  <p>
                    Fabric :{" "}
                    <span className="font-semibold">{cart.product.fabric}</span>
                  </p>
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
