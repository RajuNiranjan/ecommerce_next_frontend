import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CldUploadWidget } from "next-cloudinary";

import { useStore } from "@/hooks/useStore.hook";
import { useParams } from "next/navigation";

const AddProduct = ({ setShowAddProduct, editProduct }) => {
  const { id: storeId } = useParams();

  let productId = editProduct?._id;
  const { user } = useSelector((state) => state.auth);
  const { seller } = useSelector((state) => state.seller);
  const { loading } = useSelector((state) => state.products);
  const [addProduct, setAddProduct] = useState({
    productName: "",
    description: "",
    categories: "",
    size: [],
    price: 699,
    offerPrice: 599,
    stockLevel: 50,
    images: [],
    colors: [],
    fabric: "",
    brand: "",
    saleType: "",
    userId: user?._id,
    storeId: seller?._id,
  });

  useEffect(() => {
    if (editProduct) {
      setAddProduct({
        productName: editProduct?.productName,
        description: editProduct?.description,
        categories: editProduct?.categories,
        size: editProduct?.size,
        price: editProduct?.price,
        offerPrice: editProduct?.offerPrice,
        stockLevel: editProduct?.stockLevel,
        images: editProduct?.images,
        colors: editProduct?.colors,
        fabric: editProduct?.fabric,
        brand: editProduct?.brand,
        saleType: editProduct?.saleType,
        userId: user?._id,
        storeId: seller?._id,
      });
    }
  }, [editProduct, user?._id, seller?._id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddProduct((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRemoveImage = (index) => {
    setAddProduct((prevState) => {
      const newImages = prevState.images.filter((_, i) => i !== index);
      return {
        ...prevState,
        images: newImages,
      };
    });
  };

  const handleSingleSelection = (field, value) => {
    setAddProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const { addOrUpdateProduct, fetchStoreProducts } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addOrUpdateProduct({
      productName: addProduct?.productName,
      description: addProduct?.description,
      categories: addProduct?.categories,
      size: addProduct?.size,
      price: addProduct?.price,
      offerPrice: addProduct?.offerPrice,
      stockLevel: addProduct?.stockLevel,
      images: addProduct?.images,
      colors: addProduct?.colors,
      fabric: addProduct?.fabric,
      brand: addProduct?.brand,
      saleType: addProduct?.saleType,
      userId: user?._id,
      storeId: seller?._id,
      editProduct,
      productId,
      setShowAddProduct,
    });
    fetchStoreProducts(storeId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {editProduct ? "EDIT PRODUCT" : "ADD NEW PRODUCT"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  type="text"
                  id="productName"
                  value={addProduct.productName}
                  onChange={handleInputChange}
                  placeholder="Classic Pullover Hoodie"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories">Product Category</Label>
                <Select
                  id="categories"
                  value={addProduct.categories}
                  onValueChange={(value) =>
                    setAddProduct((prevState) => ({
                      ...prevState,
                      categories: value,
                    }))
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tshirt">T-SHIRT</SelectItem>
                    <SelectItem value="hoddie">HODDIE</SelectItem>
                    <SelectItem value="shirt">SHIRT</SelectItem>
                    <SelectItem value="pant">PANT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Product Description</Label>
              <Textarea
                id="description"
                value={addProduct.description}
                onChange={handleInputChange}
                placeholder="A cozy and comfortable pullover hoodie made from a soft cotton blend. Features a classic design with a kangaroo pocket and adjustable drawstrings. Perfect for casual wear or lounging."
              />
            </div>
            <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-2">
              <div>
                <Label htmlFor="size">Sizes</Label>
                <ToggleGroup
                  type="multiple"
                  className="flex items-start justify-start gap-2"
                  value={addProduct.size}
                  onValueChange={(value) =>
                    handleSingleSelection("size", value)
                  }>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="xs">
                    XS
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="s">
                    S
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="m">
                    M
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="l">
                    L
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="xl">
                    XL
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="colors">Colors</Label>
                <ToggleGroup
                  type="multiple"
                  className="flex justify-start items-start gap-2"
                  value={addProduct.colors}
                  onValueChange={(value) =>
                    handleSingleSelection("colors", value)
                  }>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="black">
                    Black
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="white">
                    White
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="red">
                    Red
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="blue">
                    Blue
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    className="border border-blue-200 "
                    value="green">
                    Green
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  value={addProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offerPrice">Offer Price</Label>
                <Input
                  type="number"
                  id="offerPrice"
                  value={addProduct.offerPrice}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 items-end md:grid-cols-2 gap-2">
              <div>
                <Label htmlFor="images">Images</Label>
                <div className="flex gap-2">
                  {addProduct.images.length === 0
                    ? "No Images"
                    : addProduct.images.map((item, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={item}
                            width={50}
                            height={50}
                            alt=""
                            className="rounded-sm"
                          />
                          <X
                            size={10}
                            className="absolute cursor-pointer -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white"
                            onClick={() => handleRemoveImage(index)}
                          />
                        </div>
                      ))}
                </div>
              </div>
              <div>
                <CldUploadWidget
                  uploadPreset="cloudinary-yt"
                  onSuccess={(results) => {
                    const newImageUrl = results.info.url;
                    setAddProduct((prevState) => ({
                      ...prevState,
                      images: [...prevState.images, newImageUrl],
                    }));
                  }}>
                  {({ open, isLoading }) => {
                    return (
                      <>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Button
                            type="button"
                            className="w-full"
                            onClick={() => open()}>
                            UPLOAD IMAGES
                          </Button>
                        )}
                      </>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="fabric">Material/Fabric</Label>
                <Select
                  id="fabric"
                  value={addProduct.fabric}
                  onValueChange={(value) =>
                    handleSingleSelection("fabric", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Fabric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COTTON">COTTON</SelectItem>
                    <SelectItem value="JEANS">JEANS</SelectItem>
                    <SelectItem value="NYLON">NYLON</SelectItem>
                    <SelectItem value="POLYSTER">POLYSTER</SelectItem>
                    <SelectItem value="WOOL">WOOL</SelectItem>
                    <SelectItem value="LINEN">LINEN</SelectItem>
                    <SelectItem value="SILK">SILK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  type="text"
                  id="brand"
                  value={addProduct.brand}
                  placeholder="Tomy"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="saleType">Sale Type</Label>
                <Select
                  id="saleType"
                  value={addProduct.saleType}
                  onValueChange={(value) =>
                    handleSingleSelection("saleType", value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a sale type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">NONE</SelectItem>
                    <SelectItem value="HOT SALE">HOT SALE</SelectItem>
                    <SelectItem value="NEW ARRIVALS">NEW ARRIVALS</SelectItem>
                    <SelectItem value="LIMITED TIME OFFER">
                      LIMITED TIME OFFER
                    </SelectItem>
                    <SelectItem value="FLASH SALE">FLASH SALE</SelectItem>
                    <SelectItem value="CLEARANCE">CLEARANCE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockLevel">Stock Levels</Label>
                <Input
                  type="number"
                  id="stockLevel"
                  value={addProduct.stockLevel}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button className="w-full" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editProduct ? "UPDATE PRODUCT" : "ADD PRODUCT"}
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddProduct;
