import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";
import {
  wishListFailure,
  wishListStart,
  wishListSuccess,
  wishListData,
} from "@/store/actions/wishList.slice";

const saleTypeColors = {
  "HOT SALE": "bg-red-500",
  "NEW ARRIVALS": "bg-blue-500",
  "LIMITED TIME OFFER": "bg-yellow-500",
  "FLASH SALE": "bg-orange-500",
  CLEARANCE: "bg-purple-500",
};

const WishListCard = () => {
  const { wishListItems } = useSelector((state) => state.wishList);
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { API_URI } = ENV_VAR;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();

  const fetchWishList = async () => {
    dispatch(wishListStart());
    try {
      const res = await axios.get(`${API_URI}/api/wishlist/${user._id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      dispatch(wishListData(res.data.wishList));
    } catch (error) {
      console.log(error);
      dispatch(wishListFailure(error));
    }
  };

  useEffect(() => {
    if (user && TOKEN) {
      fetchWishList();
    }
  }, [API_URI, dispatch, TOKEN, user]);

  const isInWishlist = (productId) => {
    return wishListItems.some((item) => item._id === productId);
  };

  const handleAddOrRemoveWishList = async (productId) => {
    if (!user) {
      toast({
        title: "Please login to modify your wishlist",
        duration: 1000,
      });
      return;
    }
    dispatch(wishListStart());
    try {
      let res;
      if (isInWishlist(productId)) {
        // Remove from wishlist
        res = await axios.delete(
          `${API_URI}/api/wishlist/${user._id}/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        toast({
          title: "Item Removed from Wishlist",
          duration: 1000,
        });
      } else {
        // Add to wishlist
        res = await axios.post(
          `${API_URI}/api/wishList`,
          {
            userId: user._id,
            productId,
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        toast({
          title: "Item Added to Wishlist",
          duration: 1000,
        });
      }
      dispatch(wishListSuccess(res.data.wishList));
      fetchWishList();
    } catch (error) {
      console.error(error);
      dispatch(wishListFailure(error));
    }
  };

  return (
    <>
      {wishListItems.length === 0
        ? "NO ITEMS IN WIHS LIST"
        : wishListItems.map((wishListItem, index) => (
            <Card
              key={index}
              className="w-full overflow-hidden h-full flex flex-col justify-between md:gap-4 hover:shadow-xl transition-all duration-300 relative">
              {wishListItem.saleType && (
                <Badge
                  className={`${
                    saleTypeColors[wishListItem.saleType]
                  } rounded-l absolute top-0 left-0 tracking-widest`}>
                  {wishListItem.saleType}
                </Badge>
              )}

              <div className="absolute top-2 right-2">
                {isInWishlist(wishListItem._id) ? (
                  <svg
                    onClick={() => handleAddOrRemoveWishList(wishListItem._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-red-500 cursor-pointer">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg
                    onClick={() => handleAddOrRemoveWishList(wishListItem._id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-white cursor-pointer">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </div>
              <CardContent className="p-0 h-[70%]">
                <Link href={`/products/${wishListItem._id}`}>
                  <Image
                    src={wishListItem.images[0]}
                    width={500}
                    height={500}
                    alt=""
                    className="rounded-sm"
                  />
                </Link>
              </CardContent>
              <CardFooter className="p-2 my-2 h-[30%] w-full flex justify-center flex-col items-start">
                <Link
                  href={`/products/${wishListItem._id}`}
                  className="transition-all duration-200 hover:text-red-500">
                  <h1 className="text-md font-medium">
                    {wishListItem.productName}
                  </h1>
                </Link>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs md:text-sm">
                      <span>Fabric:</span> <span>{wishListItem.fabric}</span>
                    </p>
                    <p className="text-xs md:text-sm">
                      <span>Brand:</span> <span>{wishListItem.brand}</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <h1 className="text-sm md:text-lg text-green-500 font-medium">
                      ₹{wishListItem.price}
                    </h1>
                    <small className="text-xs line-through text-slate-500">
                      ₹{wishListItem.offerPrice}
                    </small>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
    </>
  );
};

export default WishListCard;
