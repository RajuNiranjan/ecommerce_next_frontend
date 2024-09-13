import PriceDetailsCard from "@/components/priceDetailsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ViewCartProductCard from "@/components/viewCartPorductCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ViewCart = () => {
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
  }, [user, router]);

  return (
    <div className="p-4 flex flex-wrap gap-2 w-full">
      <div className="md:w-[70%] w-full gap-2 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 ">
        <ViewCartProductCard />
      </div>
      <div className="md:w-[28%] w-full ">
        <PriceDetailsCard />
      </div>
    </div>
  );
};

export default ViewCart;
