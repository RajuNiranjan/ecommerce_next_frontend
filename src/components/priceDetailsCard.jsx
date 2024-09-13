import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

const PriceDetailsCard = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate total price, discount, and total amount
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const totalOfferPrice = cartItems.reduce(
    (acc, item) => acc + item.product.offerPrice * item.quantity,
    0
  );
  const totalDiscount = totalPrice - totalOfferPrice;
  const deliveryCharges = 0; // Assuming delivery is free

  return (
    <>
      {cartItems.length >= 1 && (
        <Card className="w-full sticky top-20">
          <CardHeader className="p-2">
            <h1 className="text-xl font-bold">PRICE DETAILS</h1>
          </CardHeader>
          <hr />
          <CardContent className="flex flex-col gap-4 my-2">
            <div className="flex justify-between items-center">
              <p>Price ({cartItems.length} Items)</p>
              {/* Total Price is based on individual quantities */}
              <p>₹ {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Discount</p>
              <p className="text-green-500">- ₹ {totalDiscount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Delivery Charges</p>
              <p className="text-green-500">
                {deliveryCharges === 0
                  ? "Free"
                  : `₹ ${deliveryCharges.toFixed(2)}`}
              </p>
            </div>
            <hr />
            <div className="flex font-bold text-xl justify-between items-center">
              <p>Total Amount</p>
              {/* Total Offer Price (after discounts) */}
              <p>₹ {(totalOfferPrice + deliveryCharges).toFixed(2)}</p>
            </div>
            <hr />
          </CardContent>
          <CardFooter className="flex gap-2 flex-col w-full p-2">
            <Button className="border bg-red-500 w-full hover:bg-red-600 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center">
              CHECK OUT
            </Button>
            <small className="text-green-500">
              You will save ₹ {totalDiscount.toFixed(2)} on this order
            </small>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default PriceDetailsCard;
