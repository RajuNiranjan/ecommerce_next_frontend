import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSelector } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddressCard = () => {
  const { address } = useSelector((state) => state.address);

  const formattedAddress = `D.No: ${address.doorNo}, ${address.addressLine1}, ${address.addressLine2}, ${address.landMark}`;

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">ADDRESS DETAILS</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-4">
        <div className="space-y-1">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input type="text" id="mobileNumber" value={address.mobileNumber} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Textarea value={formattedAddress} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
