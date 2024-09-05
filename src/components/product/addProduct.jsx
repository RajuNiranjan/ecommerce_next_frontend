import React, { useState } from "react";
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
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const { seller } = useSelector((state) => state.seller);

  const [addProduct, setAddProduct] = useState({
    productName: "",
    description: "",
    categories: "",
    size: [],
    price: "",
    offerPrice: "",
    stockLevel: "",
    images: [],
    sku: "",
    colors: [],
    userId: user?._id,
    storeId: seller?._id,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddProduct((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSingleSelection = (field, value) => {
    setAddProduct((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addProduct);
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl">ADD NEW PRODUCT</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                type="text"
                id="productName"
                value={addProduct.productName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                id="sku"
                value={addProduct.sku}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>
            <Textarea
              id="description"
              value={addProduct.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-2">
            <div>
              <Label htmlFor="size">Sizes</Label>
              <ToggleGroup
                type="multiple"
                className="flex gap-2"
                value={addProduct.size}
                onValueChange={(value) => handleSingleSelection("size", value)}
              >
                <ToggleGroupItem value="xs">XS</ToggleGroupItem>
                <ToggleGroupItem value="s">S</ToggleGroupItem>
                <ToggleGroupItem value="m">M</ToggleGroupItem>
                <ToggleGroupItem value="l">L</ToggleGroupItem>
                <ToggleGroupItem value="xl">XL</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="colors">Colors</Label>
              <ToggleGroup
                type="multiple"
                className="flex gap-2"
                value={addProduct.colors}
                onValueChange={(value) =>
                  handleSingleSelection("colors", value)
                }
              >
                <ToggleGroupItem value="black">Black</ToggleGroupItem>
                <ToggleGroupItem value="white">White</ToggleGroupItem>
                <ToggleGroupItem value="red">Red</ToggleGroupItem>
                <ToggleGroupItem value="blue">Blue</ToggleGroupItem>
                <ToggleGroupItem value="green">Green</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="categories">Product Category</Label>
              <Select
                id="categories"
                onValueChange={(value) =>
                  setAddProduct((prevState) => ({
                    ...prevState,
                    categories: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tshirt">T-SHIRT</SelectItem>
                  <SelectItem value="shirt">SHIRT</SelectItem>
                  <SelectItem value="pant">PANT</SelectItem>
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
                default="500"
                value={addProduct.offerPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <div className="flex gap-2">
                <Input
                  type="file"
                  multiple={true}
                  id="images"
                  value={addProduct.images}
                  onChange={handleInputChange}
                />
                <Button>UPLOAD</Button>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Image
                  src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
                  width={50}
                  height={50}
                  alt=""
                  className="rounded-sm"
                />
                <X
                  size={10}
                  className="absolute cursor-pointer -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="w-full" type="submit">
            UPLOAD PRODUCT
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
