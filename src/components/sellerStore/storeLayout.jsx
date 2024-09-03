import React, { useState } from "react";
import SellerMenu from "./sellerMenu";
import RecentOrdersCard from "./recentOrdersCard";
import TopSellingProductsCard from "./topSellingProductsCard";
import NewCustomersCard from "./newCustomersCard";
import AnalyticsCard from "./analyticsCard";

const StoreLayout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("recentorders");

  function handleTab(tab) {
    setActiveTab(tab);
  }

  function renderTabContent() {
    if (activeTab === "recentorders") {
      return <RecentOrdersCard />;
    }
    if (activeTab === "topselling") {
      return <TopSellingProductsCard />;
    }
    if (activeTab === "newcustomers") {
      return <NewCustomersCard />;
    }
    if (activeTab === "analytics") {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <AnalyticsCard />
          <AnalyticsCard />
          <AnalyticsCard />
          <AnalyticsCard />
        </div>
      );
    }
    if (activeTab === "product") {
      return <div>product</div>;
    }
  }
  return (
    <div>
      <SellerMenu onTabClick={handleTab} />
      {renderTabContent()}
    </div>
  );
};

export default StoreLayout;
