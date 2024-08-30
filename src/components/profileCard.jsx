import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import {
  addAddressFailure,
  addAddressStart,
  addAddressSuccess,
} from "@/store/actions/address.slice";
import { useEffect } from "react";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";
import { useToast } from "./ui/use-toast";
import AddAddressCard from "./address/addAddressCard";
import AddressCard from "./address/addressCard";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import BecomeSellerRegCard from "./becomeSeller/becomeSellerRegCard";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const apiUri = ENV_VAR.API_URI;
  const { toast } = useToast();
  const dispatch = useDispatch();
  const token = ENV_VAR.TOKEN;

  useEffect(() => {
    const fetchAddress = async () => {
      dispatch(addAddressStart());
      try {
        const res = await axios.get(`${apiUri}/api/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch(addAddressSuccess(data.address));
      } catch (error) {
        console.log(error);
        dispatch(addAddressFailure(error?.response?.data));
        toast({
          title: error?.response?.data.message,
          duration: 1000,
        });
      }
    };
    fetchAddress();
  }, []);

  return (
    <Card className="w-full h-full border border-gray-300 hover:shadow-lg transition-all duration-300 p-4 space-y-4">
      <div className="flex justify-center items-center flex-col text-center ">
        <div>
          <UserCircle size={34} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.userName}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
      {/* ADDRESS */}
      <div className="w-full">
        {address ? (
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
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <h1 className="font-bold text-xl">Become a Seller</h1>
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
    </Card>
  );
};

export default ProfileCard;
