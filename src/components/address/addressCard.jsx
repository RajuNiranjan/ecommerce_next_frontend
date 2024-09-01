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
import {
  authFailure,
  authStart,
  userInfo as setUserInfo,
} from "@/store/actions/auth.slice";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const AddressCard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { API_URI, TOKEN } = ENV_VAR;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const formattedAddress = userInfo.address
    ? `D.No: ${userInfo.address.doorNo}, ${userInfo.address.addressLine1}, ${userInfo.address.addressLine2}, ${userInfo.address.landMark}`
    : "";

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = async (id) => {
    dispatch(authStart());
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
      dispatch(setUserInfo({ address: null }));
    } catch (error) {
      console.log(error);
      dispatch(authFailure());
    }
  };

  return (
    <div className="relative">
      {userInfo.address ? (
        <Card className="bg-transparent space-y-1 hover:shadow-xl transition-all duration-300 p-2">
          <CardHeader className="p-0">
            <CardTitle className="text-sm flex items-center gap-4 flex-wrap font-medium tracking-wide">
              {userInfo.address.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <p className="text-xs text-gray-500">{formattedAddress}</p>
          </CardContent>
          <CardFooter className="p-0">
            <small>
              <span className="font-semibold">Ph:</span>{" "}
              {userInfo.address.mobileNumber}
            </small>
          </CardFooter>
        </Card>
      ) : (
        <div>No address available. Please add an address.</div>
      )}
      {/* EDIT ADDRESS */}
      {userInfo.address && (
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
                    address={userInfo.address}
                    onSuccess={handleDialogClose}
                  />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {/* DELETE ADDRESS */}
      {userInfo.address && (
        <div className="absolute bottom-2 right-2">
          <TrashIcon
            size={16}
            className="text-red-500 cursor-pointer"
            onClick={() => handleDeleteAddress(userInfo.address._id)}
          />
        </div>
      )}
    </div>
  );
};

export default AddressCard;
