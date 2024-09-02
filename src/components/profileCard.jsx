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
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import AddAddressCard from "./address/addAddressCard";
import AddressCard from "./address/addressCard";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import BecomeSellerRegCard from "./becomeSeller/becomeSellerRegCard";
import { Badge } from "./ui/badge";
import { useEffect } from "react";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";
import {
  authFailure,
  authStart,
  userInfo as setUserInfo,
} from "@/store/actions/auth.slice";
import { useToast } from "./ui/use-toast";
import Link from "next/link";

const ProfileCard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { API_URI } = ENV_VAR;
  const TOKEN = localStorage.getItem("token");
  const dispatch = useDispatch();
  console.log("user info from profile card", userInfo);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserInfo = async () => {
      dispatch(authStart());

      try {
        if (!TOKEN) {
          throw new Error("Authorization token is missing.");
        }

        const res = await axios.get(`${API_URI}/api/user/userInfo`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const data = res.data;

        dispatch(
          setUserInfo({
            user: data.user,
            address: data.address,
            seller: data.seller,
          })
        );
      } catch (error) {
        console.error(error?.response?.data);
        dispatch(authFailure(error?.response?.data));

        const errorMessage =
          typeof error?.response?.data === "string"
            ? error?.response?.data
            : error?.response?.data?.message || "An error occurred in login";

        toast({
          title: errorMessage,
          duration: 1000,
        });
      }
    };

    fetchUserInfo();
  }, [API_URI, TOKEN, dispatch]);

  return (
    <Card className="w-full h-full border border-gray-300 hover:shadow-lg transition-all duration-300 p-4 space-y-4">
      <div className="flex justify-center items-center flex-col text-center ">
        <div>
          <UserCircle size={34} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{userInfo?.user?.userName}</h1>
          <p className="text-gray-500">{userInfo?.user?.email}</p>
        </div>
      </div>
      {/* ADDRESS */}
      <div className="w-full">
        {userInfo.address ? (
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
      {userInfo.seller ? (
        <div className="space-y-2">
          <h1 className="font-medium">Store Information</h1>
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader className="p-2">
              <CardTitle className="text-xl font-semibold tracking-wide">
                <span>{userInfo.seller.storeName}</span>
              </CardTitle>
              <CardContent className="p-0 space-y-2">
                <Badge className="w-max bg-transparent border border-gray-300 hover:bg-transparent flex items-center gap-1 text-md font-medium">
                  <Mail size={16} className="text-gray-500" />
                  <p className="text-sm text-blue-500">
                    {userInfo.seller.storeEmail}
                  </p>
                </Badge>
                <div>
                  <h1>Bio</h1>
                  <p className="text-sm text-gray-500">
                    {userInfo.seller.storeDescription}
                  </p>
                </div>
              </CardContent>
            </CardHeader>
            <CardFooter className="w-full p-2">
              <Link className="w-full" href={`/store/${userInfo.seller._id}`}>
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
