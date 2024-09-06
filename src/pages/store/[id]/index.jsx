import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentOrdersCard from "@/components/sellerStore/recentOrdersCard";
import TopSellingProductsCard from "@/components/sellerStore/topSellingProductsCard";
import NewCustomersCard from "@/components/sellerStore/newCustomersCard";
import AnalyticsCard from "@/components/sellerStore/analyticsCard";
import SettingsCard from "@/components/sellerStore/settingsCard";
import { ENV_VAR } from "@/config/envVar";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  sellerSuccess,
  sellerFailure,
  sellerStart,
} from "@/store/actions/seller.slice";
import { useParams } from "next/navigation";

const StoreHome = () => {
  const { API_URI } = ENV_VAR;
  const params = useParams(); // Get the params object first
  const id = params?.id; // Check if `params` is defined, then extract `id`
  const TOKEN =
    typeof window !== "undefined" ? localStorage.getItem("token") : null; // Ensure token retrieval on the client-side
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && TOKEN) {
      // Only make the API call if id and TOKEN are available
      const fetchStore = async () => {
        dispatch(sellerStart());
        try {
          const res = await axios.get(`${API_URI}/api/seller/${id}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
          const storeData = res.data;
          dispatch(sellerSuccess(storeData.seller));
        } catch (error) {
          console.log(error);
          dispatch(sellerFailure(error));
        }
      };
      fetchStore();
    }
  }, [id, API_URI, TOKEN, dispatch]);

  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList className="w-max ">
          <TabsTrigger value="orders">ORDERS</TabsTrigger>
          <TabsTrigger value="products">PRODUCTS</TabsTrigger>
          <TabsTrigger value="customers">CUSTOMERS</TabsTrigger>
          <TabsTrigger value="analytics">ANALYTICS</TabsTrigger>
          <TabsTrigger value="settings">SETTINGS</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <RecentOrdersCard />
        </TabsContent>
        <TabsContent value="products">
          <TopSellingProductsCard />
        </TabsContent>
        <TabsContent value="customers">
          <NewCustomersCard />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsCard />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreHome;
