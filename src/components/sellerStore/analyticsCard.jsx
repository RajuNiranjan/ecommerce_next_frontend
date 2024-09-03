import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

const AnalyticsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Sales</CardTitle>
        <small className="text-gray-500">$120,000</small>
      </CardHeader>
      <CardFooter>
        <h1 className="text-green-500">+15% from last month</h1>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsCard;
