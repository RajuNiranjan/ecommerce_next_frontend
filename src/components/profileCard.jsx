import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AddAddressCard from "./address/addAddressCard";
import AddressCard from "./address/addressCard";
import BecomeSellerRegCard from "./becomeSeller/becomeSellerRegCard";
import { Badge } from "./ui/badge";
import { useEffect } from "react";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import Link from "next/link";

import {
  sellerFailure,
  sellerStart,
  sellerSuccess,
} from "@/store/actions/seller.slice";
import { Skeleton } from "./ui/skeleton";
import {
  addressFailure,
  addressStart,
  addressSuccess,
} from "@/store/actions/address.slice";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { API_URI } = ENV_VAR;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();
  const { address, loading: addressLoading } = useSelector(
    (state) => state.address
  );
  const { seller, loading: sellerLoading } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    const fetchAddress = async () => {
      if (!TOKEN) return;
      dispatch(addressStart());
      try {
        const res = await axios.get(`${API_URI}/api/address`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = res.data.address;
        dispatch(addressSuccess(data));
      } catch (error) {
        console.error("Failed to fetch address data:", error);
        dispatch(addressFailure(error));
      }
    };
    fetchAddress();
  }, [TOKEN, dispatch]);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!TOKEN) {
        return;
      }
      dispatch(sellerStart());
      try {
        const response = await axios.get(`${API_URI}/api/seller`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const sellerData = response.data;

        dispatch(sellerSuccess(sellerData.seller));
      } catch (error) {
        console.error("Failed to fetch seller data:", error);
        dispatch(sellerFailure(error));
      }
    };

    if (!seller) {
      fetchSeller();
    }
  }, [API_URI, TOKEN, dispatch]);

  return (
    <Card className="w-full h-full border border-gray-300 hover:shadow-lg transition-all duration-300 p-4 space-y-4">
      <div className="flex justify-center items-center flex-col text-center ">
        <div>
          <UserCircle size={34} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{user.userName}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      {/* ADDRESS */}
      <div className="w-full">
        {addressLoading ? (
          <Card className="bg-transparent hover:shadow-xl transition-all duration-300 space-y-2 p-2">
            <CardHeader className="p-0">
              <Skeleton className="w-full h-3 rounded-full" />
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <Skeleton className="w-full h-3 rounded" />
            </CardContent>
            <CardFooter className="p-0 flex justify-between items-center">
              <Skeleton className="w-[80px] h-3 rounded" />
              <Skeleton className="w-[80px] h-3 rounded" />
              <Skeleton className="w-[80px] h-3 rounded" />
              <Skeleton className="w-4 h-4 rounded-full" />
            </CardFooter>
          </Card>
        ) : address ? (
          <div>
            <h1 className="font-medium text-md">Address</h1>
            <AddressCard />
          </div>
        ) : (
          <Dialog>
            <DialogTrigger className=" w-full">
              <Button className="w-full bg-transparent border text-black hover:bg-transparent ">
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center font-bold">
                  ADD ADDRESS
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <AddAddressCard />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <hr />
      {/* BECOME A SELLER */}
      {sellerLoading ? (
        <div className="space-y-4">
          <Skeleton className="w-full h-[30px] rounded-lg" />
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-2">
              <Skeleton className="w-[200px] h-[20px] rounded-full" />
              <CardContent className="p-0 space-y-2">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
                <Skeleton className="w-full h-[60px] rounded-lg" />
              </CardContent>
            </CardHeader>
            <CardFooter className="w-full p-2">
              <Skeleton className="w-full h-[40px] rounded-lg" />
            </CardFooter>
          </Card>
          {/* Skeleton for the "Become a Seller" button */}
          <Skeleton className="w-full h-[40px] rounded-lg" />
        </div>
      ) : seller ? (
        <div className="space-y-2">
          <h1 className="font-medium">Store Information</h1>
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-2">
              <CardTitle className="text-xl font-semibold tracking-wide">
                <span>{seller.storeName}</span>
              </CardTitle>
              <CardContent className="p-0 space-y-2">
                <Badge className="w-max bg-transparent border border-gray-300 hover:bg-transparent flex items-center gap-1 text-md font-medium">
                  <Mail size={16} className="text-gray-500" />
                  <p className="text-sm text-blue-500">{seller.storeEmail}</p>
                </Badge>
                <div>
                  <h1>Bio</h1>
                  <p className="text-sm text-gray-500">
                    {seller.storeDescription}
                  </p>
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter className="w-full p-2">
              <Link className="w-full" href={`/store/${seller._id}`}>
                <Button className="w-full">VISIT STORE</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="w-full space-y-4">
          <div className="space-y-2">
            <h1 className="font-medium text-lg ">Become a Seller</h1>
            <p>
              Apply to become a seller on our platform and start sharing your
              unique fashion designs with our community.
            </p>
          </div>
          <Dialog>
            <DialogTrigger className=" w-full">
              <Button className="w-full">Become a Seller</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-xl font-bold">
                  Become a Seller
                </DialogTitle>
                <DialogDescription>
                  <BecomeSellerRegCard />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
