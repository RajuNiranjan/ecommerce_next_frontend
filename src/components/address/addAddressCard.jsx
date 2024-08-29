import React, { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";

const AddAddressCard = ({ address, onSuccess }) => {
  const { user } = useSelector((state) => state.auth);
  const [addAddress, setAddAddress] = useState({
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
    ) {
      return toast({ title: "Please fill all the fields", duration: 1000 });
    }

    dispatch(addAddressStart());

    try {
      let res;
      if (address) {
        res = await axios.patch(
          `${apiUri}/api/address/${address._id}`,
          addAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${apiUri}/api/address/${user._id}`,
          addAddress,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const data = res.data;
      console.log("data", data.message);

      dispatch(addAddressSuccess(data.address));
      toast({
        title: data.message,
        duration: 1000,
      });

      onSuccess();
    } catch (error) {
      console.error(error?.response?.data);
      dispatch(addAddressFailure(error?.response?.data));
      toast({
        title: error?.response?.data,
        duration: 1000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmitAddressForm} className="space-y-2">
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
