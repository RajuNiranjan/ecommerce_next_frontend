import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, UserCircle } from "lucide-react";
import { useSelector } from "react-redux";
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
import Link from "next/link";
import AddressSkeleton from "@/skeletons/address.skeleton";
import SellerSkeleton from "@/skeletons/seller.skeleton";
import { useAddress } from "@/hooks/useAddress.hook";
import { useSeller } from "@/hooks/useSelller.hook";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  const { address, loading: addressLoading } = useSelector(
    (state) => state.address
  );
  const { seller, loading: sellerLoading } = useSelector(
    (state) => state.seller
  );

  const { fetchAddress } = useAddress();
  const { fetchSeller } = useSeller();

  useEffect(() => {
    fetchAddress();
    fetchSeller();
  }, []);

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
          <AddressSkeleton />
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
        <SellerSkeleton />
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
