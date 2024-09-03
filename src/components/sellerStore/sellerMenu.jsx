import React from "react";

const SellerMenu = ({ onTabClick }) => {
  return (
    <div>
      <ul className="flex gap-4 h-20 justify-center items-center">
        <li
          onClick={() => onTabClick && onTabClick("recentorders")}
          className="cursor-pointer"
        >
          Orders
        </li>
        <li
          onClick={() => onTabClick && onTabClick("topselling")}
          className="cursor-pointer"
        >
          Products
        </li>
        <li
          onClick={() => onTabClick && onTabClick("newcustomers")}
          className="cursor-pointer"
        >
          Customers
        </li>
        <li
          onClick={() => onTabClick && onTabClick("analytics")}
          className="cursor-pointer"
        >
          Analytics
        </li>
      </ul>
    </div>
  );
};

export default SellerMenu;
