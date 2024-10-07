import React, { useEffect } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

import { useWishList } from "@/hooks/useWishList.hook";
import { useToast } from "./ui/use-toast";

const saleTypeColors = {
  "HOT SALE": "bg-red-500",
  "NEW ARRIVALS": "bg-blue-500",
  "LIMITED TIME OFFER": "bg-yellow-500",
  "FLASH SALE": "bg-orange-500",
  CLEARANCE: "bg-purple-500",
};

const ProductCard = ({ product }) => {
  const { wishListItems } = useSelector((state) => state.wishList);
  const { toast } = useToast();
  const { fetchWishList, addOrRemoveFromWishList } = useWishList();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchWishList();
  }, []);

  const isInWishlist = (productId) => {
    return wishListItems.find((item) => item._id === productId);
  };

  const handleAddOrRemoveWishList = async (id) => {
    if (!user) {
      toast({
        title: "Please login to modify your wishlist",
        duration: 1000,
      });
      return;
    }
    await addOrRemoveFromWishList(id);
    fetchWishList();
  };

  return (
    <div>
      {
        <Card
          key={product._id}
          className="w-full h-full overflow-hidden bg-white  hover:shadow-xl transition-all duration-700 relative hover:-translate-y-2 ease-in-out"
        >
          {product.saleType !== "NONE" && (
            <Badge
              className={`${
                saleTypeColors[product.saleType]
              } rounded-l absolute top-0 left-0 tracking-widest`}
            >
              {product.saleType}
            </Badge>
          )}
          <div className="absolute top-2 right-2">
            {isInWishlist(product._id) ? (
              <svg
                onClick={() => handleAddOrRemoveWishList(product._id)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-red-500 cursor-pointer"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                onClick={() => handleAddOrRemoveWishList(product._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-white cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </div>
          <CardContent className="p-0 h-max md:h-[70%]   ">
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.images[0]}
                width={500}
                height={500}
                alt={product.productName}
                className="rounded-sm"
                loading="lazy"
              />
            </Link>
          </CardContent>
          <CardFooter className="p-2 my-2 h-max md:h-[30%] w-full flex justify-center flex-col items-start">
            <Link
              href={`/products/${product._id}`}
              className="transition-all duration-200 hover:text-red-500"
            >
              <h1 className="text-md font-medium">{product.productName}</h1>
            </Link>
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-1">
                <p className="text-xs md:text-sm">
                  <span>Fabric:</span> <span>{product.fabric}</span>
                </p>
                <p className="text-xs md:text-sm">
                  <span>Brand:</span> <span>{product.brand}</span>
                </p>
              </div>
              <div className="flex flex-col items-end">
                <h1 className="text-sm md:text-lg text-green-500 font-medium">
                  ₹ {product.offerPrice}
                </h1>
                <small className="text-xs line-through text-slate-500">
                  ₹ {product.price}
                </small>
              </div>
            </div>
          </CardFooter>
        </Card>
      }
    </div>
  );
};

export default ProductCard;
