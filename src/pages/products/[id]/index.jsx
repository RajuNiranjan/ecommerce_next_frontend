import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

const SingleProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const { API_URI } = ENV_VAR;
  const [heart, setHeart] = useState(false); // Manage heart icon state
  const dispatch = useDispatch();
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList); // Get wishlist items from Redux store
  const [productData, setProductData] = useState({});
  const offer =
    ((productData.price - productData.offerPrice) / productData.price) * 100;
  const roundedOffer = Math.round(offer);

  // Fetch single product details
  useEffect(() => {
    const fetchSingeProduct = async () => {
      try {
        if (id) {
          const res = await axios.get(
            `${API_URI}/api/product/singel_product/${id}`
          );
          const data = res.data;
          setProductData(data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingeProduct();
  }, [API_URI, id]);

  // Fetch wishlist items for the user
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

  // Fetch wishlist when user and token are available
  useEffect(() => {
    if (user && TOKEN) {
      fetchWishList();
    }
  }, [API_URI, dispatch, TOKEN, user]);

  // Helper function to check if the product is already in the wishlist
  const isInWishlist = (productId) => {
    return wishListItems.some((item) => item._id === productId);
  };

  // Handle adding or removing from wishlist
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
          title: "Removed from wishlist",
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
          title: "Added to wishlist",
          duration: 1000,
        });
      }
      dispatch(wishListSuccess(res.data.wishList));
      fetchWishList(); // Refetch wishlist to update UI
    } catch (error) {
      console.error(error);
      dispatch(wishListFailure(error));
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 space-x-2 ">
      {/* LEFT CONTAINER */}
      <div className="flex justify-center items-center">
        <div className="relative rounded-sm overflow-hidden ">
          <Carousel className="w-[450px]">
            <CarouselContent>
              {productData?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    className="cursor-pointer "
                    width={500}
                    height={500}
                    alt="Product Image"
                    priority
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {productData.saleType !== "NONE" && (
            <Badge
              className={`${
                saleTypeColors[productData.saleType]
              } rounded-l absolute top-0 left-0 tracking-widest`}>
              {productData?.saleType}
            </Badge>
          )}

          <div className="absolute top-5 right-5 ">
            {isInWishlist(productData._id) ? (
              <svg
                onClick={() => handleAddOrRemoveWishList(productData._id)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8 text-red-500 cursor-pointer">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                onClick={() => handleAddOrRemoveWishList(productData._id)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-white cursor-pointer">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      {/* RIGHT CONTAINER */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold  cursor-default">
            {productData?.categories}
          </h1>
          <h3 className="text-xl text-gray-500 font-medium">
            {productData.productName}
          </h3>
        </div>
        <div>
          <div className="font-mono flex gap-2 items-center">
            <span className="text-2xl font-semibold">
              ₹{productData.offerPrice}
            </span>
            <span className="line-through text-gray-500">
              ₹{productData.price}
            </span>
            <span className="font-medium text-green-600">
              {roundedOffer}% off
            </span>
          </div>
          <h3 className="text-gray-500 text-lg">inclusive of all taxes</h3>
        </div>
        <div className="space-x-2">
          <Badge className="rounded-sm bg-gray-500">OVERSIZE FIT</Badge>
          <Badge className="rounded-sm border border-black text-black bg-transparent">
            100% {productData?.fabric}
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl ">Select Size</h1>
          <div className="flex gap-4">
            {productData?.size?.map((size, index) => (
              <Button
                key={index}
                className="h-7 uppercase w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white  transition-all duration-300 rounded-sm flex justify-center items-center ">
                {size}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 w-full flex-col md:flex-row">
          <Link href="/viewcart" className="w-full">
            <Button className="bg-red-500 hover:bg-red-600 w-full flex gap-1">
              <ShoppingBag size={16} />
              ADD TO BAG
            </Button>
          </Link>

          <Button
            onClick={() => handleAddOrRemoveWishList(productData._id)}
            className={`w-full bg-transparent   ${
              isInWishlist(productData._id)
                ? "bg-black text-white"
                : "text-black"
            } border hover:text-white transition-all duration-500 flex items-center gap-1`}>
            {isInWishlist(productData._id) ? (
              <svg
                onClick={() => handleAddOrRemoveWishList(productData._id)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-red-500 cursor-pointer">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <Heart size={16} />
            )}
            WISHLIST
          </Button>
        </div>
        <div>
          <h1>
            <b>Description:</b> {productData.description}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
