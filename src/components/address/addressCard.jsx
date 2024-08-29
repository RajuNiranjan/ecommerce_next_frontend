import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit3 } from "lucide-react";
import AddAddressCard from "./addAddressCard";

const AddressCard = () => {
  const { address } = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const formattedAddress = `D.No: ${address.doorNo}, ${address.addressLine1}, ${address.addressLine2}, ${address.landMark}`;

  return (
    <div className="relative">
      <Card className="bg-transparent hover:shadow-xl transition-all duration-300 p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-sm underline">ADDRESS DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-4">
          <p className="text-xs">{formattedAddress}</p>
        </CardContent>
        <CardFooter className="p-0">
          <small>
            <span className="font-semibold">Ph:</span>
            {address.mobileNumber}
          </small>
        </CardFooter>
      </Card>
      <div className="absolute -top-2 -right-2">
        <Dialog>
          <DialogTrigger
            className="bg-blue-300 hover:bg-blue-400 transition-all duration-300 p-1 rounded-full text-white"
            onClick={() => setSelectedAddress(address)}>
            <Edit3 size={14} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                EDIT ADDRESS
              </DialogTitle>
              <DialogDescription>
                <AddAddressCard address={selectedAddress} />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddressCard;
