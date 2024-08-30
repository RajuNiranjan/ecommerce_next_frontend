import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";

const BecomeSellerRegCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [sellerForm, setSellerForm] = useState({
    bussinessName: "",
    storeName: "",
    storeEmail: "",
    storeAddress: "",
    storeDescription: "",
    userId: user._id,
  });

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setSellerForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSumbitSellerForm = (e) => {
    e.preventDefault();
    try {
      console.log(sellerForm);
      // Assuming there's a function to handle the form submission
      // handleFormSubmission(sellerForm);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div>
        <p className="text-sm text-center text-muted-foreground">
          Join our vibrant community of sellers and expand your reach.
        </p>
      </div>
      <form onSubmit={handleSumbitSellerForm} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bussinessName">Bussiness Name</Label>
          <Input
            id="bussinessName"
            name="bussinessName"
            type="text"
            autoComplete="name"
            value={sellerForm.bussinessName}
            onChange={handleChangeText}
            required
            placeholder="Cloths Marketing"
          />
        </div>
        <div>
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            id="storeName"
            name="storeName"
            type="text"
            required
            value={sellerForm.storeName}
            onChange={handleChangeText}
            placeholder="Acme Clothing Co."
          />
        </div>
        <div>
          <Label htmlFor="storeEmail">Email address</Label>
          <Input
            id="storeEmail"
            name="storeEmail"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={sellerForm.storeEmail}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <Label htmlFor="storeAddress">Store Address</Label>
          <Textarea
            id="storeAddress"
            name="storeAddress"
            rows={3}
            required
            className="block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Describe the products you sell..."
            value={sellerForm.storeAddress}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <Label htmlFor="storeDescription">Store Description</Label>
          <Textarea
            id="storeDescription"
            name="storeDescription"
            rows={3}
            required
            className="block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
            placeholder="Describe the products you sell..."
            value={sellerForm.storeDescription}
            onChange={handleChangeText}
          />
        </div>
        <div>
          <Button type="submit" className="w-full">
            Apply to Become a Seller
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BecomeSellerRegCard;
