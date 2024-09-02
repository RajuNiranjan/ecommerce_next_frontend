import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeOff } from "lucide-react";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";
import { authFailure, authStart, userInfo } from "@/store/actions/auth.slice";
import { useRouter } from "next/navigation";

const BecomeSellerRegCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const [sellerForm, setSellerForm] = useState({
    businessName: "",
    storeName: "",
    storeEmail: "",
    storeAddress: "",
    storeDescription: "",
    storePassword: "",
    userId: user._id,
  });

  const { API_URI } = ENV_VAR;
  const TOKEN = localStorage.getItem("token");
  const router = useRouter();
  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setSellerForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSumbitSellerForm = async (e) => {
    e.preventDefault();
    dispatch(authStart());
    try {
      const res = await axios.post(`${API_URI}/api/seller`, sellerForm, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = res.data;

      dispatch(userInfo({ seller: data.data }));
      router.push(`/store/${data.seller._id}`);
    } catch (error) {
      console.error(error);
      dispatch(authFailure(error));
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              name="businessName"
              type="text"
              autoComplete="name"
              value={sellerForm.businessName}
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
            <Label htmlFor="storePassword">Store Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="storePassword"
                name="storePassword"
                value={sellerForm.storePassword}
                onChange={handleChangeText}
                required
              />
              <div className="absolute top-2 right-5">
                {showPassword ? (
                  <EyeIcon
                    className="cursor-pointer"
                    onClick={handleShowPassword}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="storeAddress">Store Address</Label>
            <Textarea
              id="storeAddress"
              name="storeAddress"
              rows={3}
              required
              className="block w-full rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="123 Main St, City, State"
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
