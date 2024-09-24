import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useSelector } from "react-redux";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const SettingsCard = () => {
  const { seller } = useSelector((state) => state.seller);
  console.log("seller", seller);

  const [storeData, setStoreData] = useState({
    bussinessName: seller?.bussinessName || "",
    storeName: seller?.storeName || "",
    storeAddress: seller?.storeAddress || "",
    storeDescription: seller?.storeDescription || "",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>SETTINGS</div>
          <Button className="bg-red-500 hover:bg-red-400 tracking-wide">
            DELETE STORE
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action="" className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="bussinessName">Business Name</label>
            <Input value={storeData.bussinessName} />
          </div>
          <div className="space-y-2">
            <label htmlFor="storeName">Store Name</label>
            <Input value={storeData.storeName} />
          </div>
          <div className="space-y-2">
            <label htmlFor="storeEmail">Store Email</label>
            <Input
              value={seller?.storeEmail}
              className="text-blue-500"
              disabled
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="storeId">Store ID</label>
            <Input value={seller._id} disabled />
          </div>
          <div className="space-y-2">
            <label htmlFor="storeAddress">Store Address</label>
            <Textarea value={storeData.storeAddress} className="resize-none" />
          </div>
          <div className="space-y-2">
            <label htmlFor="storeDescription">Store Description</label>
            <Textarea
              value={storeData.storeDescription}
              className="resize-none"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
