import WishListCard from "@/components/wishListCard";
import React from "react";

const WishList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-4">
      {/* <Card className="h-max sm:h-[200px] ">
        <CardContent className="h-full p-2 grid grid-cols-1 sm:grid-cols-2">
          <div className="flex items-start justify-start">
            <div className="h-[180px]">
              <Image
                width={150}
                height={500}
                src="https://d30b9hrf6faw09.cloudfront.net/upload/20240808200545WhatsApp%20Image%202024-08-08%20at%208.04.53%20PM.jpeg"
                alt=""
                className="h-full object-contain rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-col gap-4">
                <h1 className="text-xl font-semibold">T-Shirt</h1>
                <div className="flex items-center gap-1">
                  <span>Size : </span>{" "}
                  <span className="h-7 w-7 border bg-red-500 text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
                    S
                  </span>
                </div>
                <p>
                  Fabric : <span className="font-semibold">Cotton</span>
                </p>
                <div className="font-mono flex gap-2 items-center">
                  <span className="text-2xl font-semibold">$569</span>
                  <span className="line-through text-gray-500">$899</span>
                  <span className="font-medium text-green-600">22% off</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:justify-end sm:items-end w-full">
            <div className=" flex sm:items-end w-full  gap-4">
              <Button className="border transition-all duration-300 rounded-sm flex justify-center items-center w-full ">
                Remove
              </Button>{" "}
              <Link href="/products/123" className="w-full">
                <Button className="border w-full bg-transparent  bg-red-500 text-white  hover:bg-red-600 hover:text-white transition-all duration-300 rounded-sm flex justify-center items-center ">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card> */}
      <WishListCard />
      <WishListCard />
      <WishListCard />
      <WishListCard />
      <WishListCard />
      <WishListCard />
    </div>
  );
};

export default WishList;
