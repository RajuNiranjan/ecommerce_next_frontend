import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentOrdersCard from "@/components/sellerStore/recentOrdersCard";
import TopSellingProductsCard from "@/components/sellerStore/topSellingProductsCard";
import NewCustomersCard from "@/components/sellerStore/newCustomersCard";
import AnalyticsCard from "@/components/sellerStore/analyticsCard";
import SettingsCard from "@/components/sellerStore/settingsCard";

const StoreHome = () => {
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
