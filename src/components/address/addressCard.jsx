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
import { Button } from "../ui/button";
import {
  deleteAddress,
  addAddressFailure,
  addAddressStart,
} from "@/store/actions/address.slice";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";

const AddressCard = () => {
  const apiUri = ENV_VAR.API_URI;
  const { address } = useSelector((state) => state.address);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const formattedAddress = `D.No: ${address.doorNo}, ${address.addressLine1}, ${address.addressLine2}, ${address.landMark}`;

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = async (e) => {
    e.preventDefault();
    dispatch(addAddressStart());
    try {
      const res = await axios.delete(`${apiUri}/api/address/${address._id}`);
      const data = res.data;
      dispatch(deleteAddress());
      setIsDialogOpen(false);
      toast({
        title: data.message,
        duration: 1000,
      });
    } catch (error) {
      console.error("Error deleting address:", error);
      dispatch(addAddressFailure(error?.response?.data));
      toast({
        title: error?.response?.data || "An error occured in deleting address",
        duration: 1000,
      });
    }
  };

  return (
    <div className="relative">
      <Card className="bg-transparent space-y-1  hover:shadow-xl transition-all duration-300 p-2">
        <CardHeader className="p-0">
          <CardTitle className="text-sm flex  items-center gap-4 flex-wrap font-medium tracking-wide">
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
      {/* EDIT ADDRESS */}
      <div className="absolute -top-2 -right-2">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="bg-blue-300 hover:bg-blue-400 transition-all duration-300 p-1 rounded-full text-white">
            <Edit3 size={14} />
          </DialogTrigger>
          <DialogContent>
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
      {/* DELETE ADDRESS */}
      <div className="absolute bottom-0 right-2">
        <Dialog>
          <DialogTrigger>
            <TrashIcon size={16} className="text-red-500" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="space-y-4">
              <DialogTitle>
                <h1 className="font-medium">
                  Are you sure{" "}
                  <span className="font-semibold text-red-500">
                    {address.name}
                  </span>
                  , you want to delete the address ?
                </h1>
              </DialogTitle>
              <DialogDescription className="space-x-2 flex items-center">
                <Button
                  onClick={handleDeleteAddress}
                  className="w-full tracking-wide bg-red-500 hover:bg-red-600"
                >
                  CONFIRM DELETE
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddressCard;
