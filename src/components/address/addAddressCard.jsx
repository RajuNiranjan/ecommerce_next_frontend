import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { Loader2 } from "lucide-react";

import { useAddress } from "@/hooks/useAddress.hook";
import { useSelector } from "react-redux";

const AddAddressCard = ({ address, onSuccess }) => {
  const { user } = useSelector((state) => state.auth);
  const [addAddress, setAddAddress] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    landMark: "",
    doorNo: "",
    mobileNumber: "",
    userId: user._id,
  });

  useEffect(() => {
    if (address) {
      setAddAddress({
        name: address.name || "",
        addressLine1: address.addressLine1 || "",
        addressLine2: address.addressLine2 || "",
        landMark: address.landMark || "",
        doorNo: address.doorNo || "",
        mobileNumber: address.mobileNumber || "",
        userId: user._id,
      });
    }
  }, [address, user._id]);
  const { loading } = useSelector((state) => state.address);

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setAddAddress((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { addressRegistrationOrUpdate } = useAddress();

  const handleSubmitAddressForm = async (e) => {
    e.preventDefault();
    await addressRegistrationOrUpdate({
      name: addAddress.name,
      addressLine1: addAddress.addressLine1,
      addressLine2: addAddress.addressLine2,
      landMark: addAddress.landMark,
      doorNo: addAddress.doorNo,
      mobileNumber: addAddress.mobileNumber,
      userId: addAddress.userId,
      address,
      onSuccess,
    });
  };

  return (
    <form onSubmit={handleSubmitAddressForm} className="space-y-2">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={addAddress.name}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="addressLine1">Address Line 1</Label>
          <Input
            type="text"
            id="addressLine1"
            value={addAddress.addressLine1}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="addressLine2">Address Line 2</Label>
          <Input
            type="text"
            id="addressLine2"
            value={addAddress.addressLine2}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="doorNo">Door Number</Label>
          <Input
            type="text"
            id="doorNo"
            value={addAddress.doorNo}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input
            type="number"
            id="mobileNumber"
            value={addAddress.mobileNumber}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Label htmlFor="landMark">Land Mark</Label>
          <Input
            type="text"
            id="landMark"
            value={addAddress.landMark}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {address ? "UPDATE ADDRESS" : "ADD ADDRESS"}
        </Button>
      </div>
    </form>
  );
};

export default AddAddressCard;
