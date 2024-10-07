import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Not_Found from "@/assets/json/no_data.json";
import CartSkeleton from "@/skeletons/cart.skeleton";
import { useCart } from "@/hooks/useCart.hook";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ViewCartProductCard = () => {
  const { cartItems, loading } = useSelector((state) => state.cart);

  const { fetchCartItems, removeFromCart } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id) => {
    await removeFromCart(id);
    fetchCartItems();
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
        [...Array(12)].map((_, idx) => <CartSkeleton key={idx} />)
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
                      height={150}
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
                        ₹{cart.product.offerPrice}
                      </span>
                      <span className="line-through text-gray-500">
                        ₹{cart.product.price}
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
