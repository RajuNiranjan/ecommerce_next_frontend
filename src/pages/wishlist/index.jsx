import { useToast } from "@/components/ui/use-toast";
import WishListCard from "@/components/wishListCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const WishList = () => {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast({
        title: "please login ",
        duration: 1000,
      });
    }
  }, [user, router, toast]);
  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      <WishListCard />
    </div>
  );
};

export default WishList;
