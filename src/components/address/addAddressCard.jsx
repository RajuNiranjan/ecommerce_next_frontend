import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import {
  addAddressFailure,
  addAddressStart,
  addAddressSuccess,
} from "@/store/actions/address.slice";

const AddAddressCard = () => {
  const { user } = useSelector((state) => state.auth);
  const [addAddress, setAddAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    landMark: "",
    doorNo: "",
    mobileNumber: "",
    userId: user._id,
  });

  const { toast } = useToast();
  const dispatch = useDispatch();
  const apiUri = ENV_VAR.API_URI;
  const token = ENV_VAR.TOKEN;

  const handleChangeInput = (e) => {
    const { id, value } = e.target;
    setAddAddress((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitAddressForm = async (e) => {
    e.preventDefault();
    if (
      !addAddress.addressLine1 ||
      !addAddress.addressLine2 ||
      !addAddress.landMark ||
      !addAddress.doorNo ||
      !addAddress.mobileNumber
    )
      return toast({ title: "Please fill all the fields", duration: 1000 });
    dispatch(addAddressStart());
    try {
      const res = await axios.post(
        `${apiUri}/api/address/${user._id}`,
        addAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = res.data;
      dispatch(addAddressSuccess(data.address));
      toast({
        title: data.message,
        duration: 1000,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch(addAddressFailure(error.response.data));
      toast({
        title: error.response.data,
        duration: 1000,
      });
    }
  };

  return (
    <Card className="bg-transparent border-none shadow-none space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-center">ADD ADDRESS</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmitAddressForm}>
        <CardContent className="p-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              type="text"
              id="addressLine1"
              value={addAddress.addressLine1}
              onChange={handleChangeInput}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              type="text"
              id="addressLine2"
              value={addAddress.addressLine2}
              onChange={handleChangeInput}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="doorNo">Door Number</Label>
            <Input
              type="text"
              id="doorNo"
              value={addAddress.doorNo}
              onChange={handleChangeInput}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              type="number"
              id="mobileNumber"
              value={addAddress.mobileNumber}
              onChange={handleChangeInput}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landMark">Land Mark</Label>
            <Input
              type="text"
              id="landMark"
              value={addAddress.landMark}
              onChange={handleChangeInput}
            />
          </div>
        </CardContent>
        <CardFooter className="p-0 mt-4">
          <Button type="submit" className="w-full">
            ADD ADDRESS
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddAddressCard;
