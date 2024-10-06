import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import { Heart, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  wishListFailure,
  wishListStart,
  wishListSuccess,
  wishListData,
} from "@/store/actions/wishList.slice";
import {
  cartData,
  cartFailure,
  cartStart,
  cartSuccess,
} from "@/store/actions/cart.slice";
import {
  productsFailure,
  productStart,
  singleProductDataSuccess,
} from "@/store/actions/product.slice";
import { Skeleton } from "@/components/ui/skeleton";

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
  const dispatch = useDispatch();
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, SingleProduct } = useSelector((state) => state.products);

  const [singleProductData, setSingleProductData] = useState({
    size: "",
    color: "",
    quantity: 1,
  });

  const offer =
    ((SingleProduct.price - SingleProduct.offerPrice) / SingleProduct.price) *
    100;
  const roundedOffer = Math.round(offer);

  const fetchSingeProduct = async () => {
    dispatch(productStart());
    try {
      if (id) {
        const res = await axios.get(
          `${API_URI}/api/product/singel_product/${id}`
        );
        const data = res.data;

        dispatch(singleProductDataSuccess(data.product));
      }
    } catch (error) {
      console.log(error);
      dispatch(productsFailure(error));
    }
  };

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
    fetchSingeProduct();
    if (user && TOKEN) {
      fetchWishList();
      fetchCartData();
    }
  }, [API_URI, dispatch, TOKEN, user, id]);

  const isInWishlist = (productId) => {
    return wishListItems.some((item) => item._id === productId);
  };

  const isInCartList = (productId) => {
    return cartItems.some((item) => item.product._id === productId);
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

  const getContrastColor = (backgroundColor) => {
    const hex = backgroundColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? "black" : "white";
  };

  const handleAddOrRemoveToCart = async (e, productId) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Please login to modify your wishlist",
        duration: 1000,
      });
      return;
    }
    const { size, color, quantity } = singleProductData;

    if (!size) {
      toast({
        title: "Please select a size",
        duration: 1000,
      });
      return;
    }

    if (!color) {
      toast({
        title: "Please select a color",
        duration: 1000,
      });
      return;
    }

    if (quantity <= 0) {
      toast({
        title: "Quantity must be at least 1",
        duration: 1000,
      });
      return;
    }
    dispatch(cartStart());
    try {
      let res;

      if (isInCartList(productId)) {
        res = await axios.delete(
          `${API_URI}/api/cart/${user._id}/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        toast({
          title: "Removed from cart",
          duration: 1000,
        });
      } else {
        res = await axios.post(
          `${API_URI}/api/cart`,
          {
            userId: user?._id,
            productId: productId,
            size,
            color,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        toast({
          title: "Added to cart",
          duration: 1000,
        });
      }
      dispatch(cartSuccess());
      fetchCartData();
    } catch (error) {
      console.log(error);
      dispatch(cartFailure());
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 space-x-2">
      {/* LEFT CONTAINER */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="relative rounded-sm overflow-hidden">
            <Skeleton className="w-[450px] h-[500px] rounded bg-gray-300" />
            <Skeleton className="absolute top-5 right-5 w-8 h-8 bg-gray-300 rounded-full" />
            {SingleProduct?.saleType !== "NONE" && (
              <Skeleton className="absolute top-0 left-0 w-20 h-6 rounded-lg bg-gray-300" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="relative rounded-sm overflow-hidden">
            <Carousel className="w-[450px]">
              <CarouselContent>
                {SingleProduct?.images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={image}
                      className="cursor-pointer"
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
            {SingleProduct.saleType !== "NONE" && (
              <Badge
                className={`${
                  saleTypeColors[SingleProduct.saleType]
                } rounded-l absolute top-0 left-0 tracking-widest`}>
                {SingleProduct?.saleType}
              </Badge>
            )}

            <div className="absolute top-5 right-5">
              {isInWishlist(SingleProduct._id) ? (
                <svg
                  onClick={() => handleAddOrRemoveWishList(SingleProduct._id)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-8 text-red-500 cursor-pointer">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg
                  onClick={() => handleAddOrRemoveWishList(SingleProduct._id)}
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
      )}

      {/* RIGHT CONTAINER */}

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="w-[200px] h-[40px] rounded-md bg-gray-300" />

          <Skeleton className="w-[150px] h-[30px] rounded-md bg-gray-300" />

          <div className="flex flex-col gap-2">
            <Skeleton className="w-[100px] h-[30px] rounded-md bg-gray-300" />
            <Skeleton className="w-[50px] h-[20px] rounded-md bg-gray-300" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="w-[100px] h-[20px] rounded-md bg-gray-300" />
            <Skeleton className="w-[100px] h-[20px] rounded-md bg-gray-300" />
          </div>

          <div className="flex flex-col gap-2">
            <Skeleton className="w-[150px] h-[20px] rounded-md bg-gray-300" />
            <div className="flex gap-4">
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-300" />
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-300" />
              <Skeleton className="w-[40px] h-[40px] rounded-full bg-gray-300" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton className="w-[40px] h-[40px] rounded-md bg-gray-300" />
            <Skeleton className="w-[50px] h-[30px] rounded-md bg-gray-300" />
            <Skeleton className="w-[40px] h-[40px] rounded-md bg-gray-300" />
          </div>

          <div className="flex gap-4 w-full flex-col md:flex-row">
            <Skeleton className="w-full h-[50px] rounded-md bg-gray-300" />
            <Skeleton className="w-full h-[50px] rounded-md bg-gray-300" />
          </div>

          <Skeleton className="w-full h-[80px] rounded-md bg-gray-300" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold cursor-default">
              {SingleProduct?.categories}
            </h1>
            <h3 className="text-xl text-gray-500 font-medium">
              {SingleProduct.productName}
            </h3>
          </div>
          <div>
            <div className="font-mono flex gap-2 items-center">
              <span className="text-2xl font-semibold">
                ₹{SingleProduct.offerPrice}
              </span>
              <span className="line-through text-gray-500">
                ₹{SingleProduct.price}
              </span>
              <span className="font-medium text-green-600">
                {roundedOffer}% off
              </span>
            </div>
            <h3 className="text-gray-500 text-lg">inclusive of all taxes</h3>
          </div>
          <div className="space-x-2">
            <Badge className="rounded-sm bg-gray-500">OVERSIZE FIT</Badge>
            <Badge className="rounded-sm border hover:bg-transparent border-black text-black bg-transparent">
              100% {SingleProduct?.fabric}
            </Badge>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => handleAddOrRemoveToCart(e, SingleProduct._id)}>
            {/* Size Selector */}
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-xl">Select Size</h1>
              <div className="flex gap-4">
                {SingleProduct?.size?.map((size, index) => (
                  <ToggleGroup key={index} type="single">
                    <ToggleGroupItem
                      className={`h-7 uppercase w-7 border bg-transparent text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center hover:-translate-y-2 ease-in-out ${
                        singleProductData.size === size
                          ? "bg-red-500 text-white"
                          : ""
                      }`}
                      value={size}
                      onClick={() =>
                        setSingleProductData({
                          ...singleProductData,
                          size: size,
                        })
                      }>
                      {size}
                    </ToggleGroupItem>
                  </ToggleGroup>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-xl">Select Color</h1>
              <div className="flex gap-4">
                {SingleProduct?.colors?.map((color, index) => (
                  <ToggleGroup key={index} type="single">
                    <ToggleGroupItem
                      className={`transition-all border-2 duration-300 rounded-full h-7 w-7 hover:-translate-y-2 ease-in-out ${
                        singleProductData.color === color ? "border-black" : ""
                      }`}
                      style={{
                        backgroundColor: color,
                        color: getContrastColor(color),
                      }}
                      value={color}
                      onClick={() =>
                        setSingleProductData({ ...singleProductData, color })
                      }></ToggleGroupItem>
                  </ToggleGroup>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() =>
                  setSingleProductData({
                    ...singleProductData,
                    quantity: Math.max(1, singleProductData.quantity - 1),
                  })
                }>
                -
              </Button>
              <h1 className="text-2xl">{singleProductData.quantity}</h1>
              <Button
                type="button"
                onClick={() =>
                  setSingleProductData({
                    ...singleProductData,
                    quantity: singleProductData.quantity + 1,
                  })
                }>
                +
              </Button>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4 w-full flex-col md:flex-row">
              <Button
                onClick={(e) => handleAddOrRemoveToCart(e, SingleProduct?._id)}
                className="bg-red-500 hover:bg-red-600 w-full flex gap-1 hover:-translate-y-2 ease-in-out transition-all duration-500"
                type="submit">
                {isInCartList(SingleProduct?._id) ? (
                  <>
                    <X className="mr-2 h-4 w-4" /> Remove from Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" /> Add to Bag
                  </>
                )}
              </Button>
              <Button
                type="button"
                onClick={() => handleAddOrRemoveWishList(SingleProduct._id)}
                className={`w-full bg-transparent ${
                  isInWishlist(SingleProduct._id)
                    ? "bg-black text-white"
                    : "text-black"
                } border hover:text-white transition-all duration-500 flex items-center gap-1 hover:-translate-y-2 ease-in-out`}>
                {isInWishlist(SingleProduct._id) ? (
                  <svg
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
          </form>

          <div>
            <h1>
              <b>Description:</b> {SingleProduct.description}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
