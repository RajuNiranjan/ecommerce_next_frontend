import AccountSettings from "@/components/accountSettings";
import OrderHistory from "@/components/orderHistory";
import ProfileCard from "@/components/profileCard";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className=" container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <ProfileCard />
        </div>

        <div className="md:col-span-2 space-y-4">
          <OrderHistory />
          <AccountSettings />
        </div>
      </div>
    </div>
  );
};

export default Profile;
