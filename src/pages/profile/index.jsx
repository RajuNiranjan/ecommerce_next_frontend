import AccountSettings from "@/components/accountSettings";
import OrderHistory from "@/components/orderHistory";
import ProfileCard from "@/components/profileCard";
import { ENV_VAR } from "@/config/envVar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addressFailure,
  addressStart,
  addressSuccess,
} from "@/store/actions/address.slice";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const { address } = useSelector((state) => state.address);
  const { API_URI } = ENV_VAR;
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  useEffect(() => {
    const fetchAddress = async () => {
      if (!TOKEN) {
        return;
      }
      dispatch(addressStart());
      try {
        const response = await axios.get(`${API_URI}/api/address`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        const addressData = response.data;
        console.log("Fetched address data:", addressData); // Log the address data

        dispatch(addressSuccess(addressData.address)); // Ensure this structure matches your state
      } catch (error) {
        console.error("Failed to fetch address data:", error);
        dispatch(addressFailure(error));
      }
    };

    if (!address) {
      fetchAddress();
    }
  }, [API_URI, TOKEN, dispatch, address]);

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
