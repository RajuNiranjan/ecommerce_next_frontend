import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentOrdersCard from "@/components/sellerStore/recentOrdersCard";
import TopSellingProductsCard from "@/components/sellerStore/topSellingProductsCard";
import NewCustomersCard from "@/components/sellerStore/newCustomersCard";
import AnalyticsCard from "@/components/sellerStore/analyticsCard";
import SettingsCard from "@/components/sellerStore/settingsCard";
import { useSelector } from "react-redux";

import { useParams, useRouter } from "next/navigation";
import { useSeller } from "@/hooks/useSelller.hook";

const StoreHome = () => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const params = useParams();
  const storeId = params?.id;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  const { fetchSellerById } = useSeller();

  useEffect(() => {
    fetchSellerById(storeId);
  }, []);

  return (
    <div className="p-4">
      <Tabs defaultValue="orders">
        <TabsList className="mb-14 sticky top-20 z-40 bg-white flex flex-wrap ">
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
