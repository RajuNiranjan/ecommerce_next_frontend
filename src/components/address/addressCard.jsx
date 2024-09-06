import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit3, TrashIcon } from "lucide-react";
import AddAddressCard from "./addAddressCard";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import {
  addressDelete,
  addressFailure,
  addressStart,
} from "@/store/actions/address.slice";

const AddressCard = () => {
  const { address } = useSelector((state) => state.address);
  const { API_URI } = ENV_VAR;
  const TOKEN = localStorage.getItem("token");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const formattedAddress = address
    ? `D.No: ${address.doorNo}, ${address.addressLine1}, ${address.addressLine2}, ${address.landMark}`
    : "";

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = async (id) => {
    dispatch(addressStart());
    try {
      const res = await axios.delete(`${API_URI}/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const data = res.data;
      console.log(data);
      toast({
        title: data.message,
      });
      dispatch(addressDelete());
    } catch (error) {
      console.error(error?.response?.data);
      dispatch(addressFailure(error?.response?.data));

      const errorMessage =
        typeof error?.response?.data === "string"
          ? error?.response?.data
          : error?.response?.data?.message || "An error occurred";

      toast({
        title: errorMessage,
        duration: 1000,
      });
    }
  };

  return (
    <div className="relative">
      {address ? (
        <Card className="bg-transparent space-y-1 hover:shadow-xl transition-all duration-300 p-2">
          <CardHeader className="p-0">
            <CardTitle className="text-sm flex items-center gap-4 flex-wrap font-medium tracking-wide">
              {address.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <p className="text-xs text-gray-500">{formattedAddress}</p>
          </CardContent>
          <CardFooter className="p-0">
            <small>
              <span className="font-semibold">Ph:</span> {address.mobileNumber}
            </small>
          </CardFooter>
        </Card>
      ) : (
        <div>No address available. Please add an address.</div>
      )}
      {/* EDIT ADDRESS */}
      {address && (
        <div className="absolute -top-2 -right-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="bg-blue-300 hover:bg-blue-400 transition-all duration-300 p-1 rounded-full text-white">
              <Edit3 size={14} />
            </DialogTrigger>
            <DialogContent className="w-[650px]">
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  EDIT ADDRESS
                </DialogTitle>
                <DialogDescription>
                  <AddAddressCard
                    address={address}
                    onSuccess={handleDialogClose}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {/* DELETE ADDRESS */}
      {address && (
        <div className="absolute bottom-2 right-2">
          <TrashIcon
            size={16}
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteAddress(address._id)}
          />
        </div>
      )}
    </div>
  );
};

export default AddressCard;
