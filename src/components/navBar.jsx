import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Heart, LogOut, ShoppingBag, UserCircle2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShirtSvg from "@/assets/svg/shirt.svg";
import TShirtSvg from "@/assets/svg/tshirt.svg";
import PantSvg from "@/assets/svg/pant.svg";
import HoodieSvg from "@/assets/svg/hoodie.svg";
import { authLogOut } from "@/store/actions/auth.slice";
import { usePathname } from "next/navigation";
import { useToast } from "./ui/use-toast";
import Image from "next/image";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { toast } = useToast();
  const { wishListItems } = useSelector((state) => state.wishList);
  const { cartItems } = useSelector((state) => state.cart);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const handleLogOutAccount = () => {
    localStorage.clear();
    dispatch(authLogOut());
    toast({
      title: "Log Out successfully",
    });
  };
  return (
    <nav className="flex justify-between items-center h-20 px-5 md:px-20 shadow-lg sticky top-0 z-50 bg-grey-500">
      <div>
        <Link
          href="/"
          className="text-red-500 text-xl font-bold flex items-center">
          TREND
          <Image src={ShirtSvg} alt="shirt" width={30} height={30} /> SET
        </Link>
      </div>
      <div className="hidden lg:flex justify-center items-center gap-6">
        <Link
          href="/products/shirt"
          className={`${
            pathName === "/products/shirt" && "text-red-500 font-bold"
          } transition-all duration-500 hover:text-red-500 flex justify-center items-center hover:-translate-y-1 ease-in-out`}>
          <Image src={ShirtSvg} alt="shirt" width={30} height={30} /> SHIRT
        </Link>
        <Link
          href="/products/pant"
          className={`${
            pathName === "/products/pant" && "text-red-500 font-bold"
          } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out flex justify-center items-center`}>
          <Image src={PantSvg} alt="shirt" width={30} height={30} /> PANT
        </Link>
        <Link
          href="/products/tshirt"
          className={`${
            pathName === "/products/tshirt" && "text-red-500 font-bold"
          } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out flex justify-center items-center`}>
          <Image src={TShirtSvg} alt="shirt" width={30} height={30} />
          T-SHIRT
        </Link>
        <Link
          href="/products/hoodie"
          className={`${
            pathName === "/products/hoodie" && "text-red-500 font-bold"
          } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out flex justify-center items-center`}>
          <Image src={HoodieSvg} alt="shirt" width={30} height={30} /> HOODIE
        </Link>
      </div>
      <div>
        {/* WEB MENU */}
        <div className=" hidden lg:flex gap-10 items-center justify-center">
          <Link
            href="/wishlist"
            className={`${
              pathName === "/wishlist" && "text-red-500 "
            } transition-all duration-500  hover:-translate-y-1 ease-in-out`}>
            <div className="">
              <Heart className="absolute" />

              <p className="relative -top-3 -right-2 bg-red-500 h-5 w-5 flex justify-center items-center text-white rounded-full text-xs">
                {wishListItems.length}
              </p>
            </div>
          </Link>

          <Link
            href="/viewcart"
            className={`${
              pathName === "/viewcart" && "text-red-500 "
            } transition-all duration-500 hover:-translate-y-1 ease-in-out`}>
            <div className="">
              <ShoppingBag className="absolute" />
              <p className="relative -top-3 -right-2 bg-red-500 h-5 w-5 flex justify-center items-center text-white rounded-full text-xs">
                {cartItems.length}
              </p>
            </div>
          </Link>

          <div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserCircle2 />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile" className="cursor-pointer">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogOutAccount}
                    className="flex justify-between items-center">
                    Log Out <LogOut size={16} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href={pathName === "/login" ? "/register" : "/login"}
                className="transition-all duration-500">
                <Button className="transition-all duration-500">
                  {pathName === "/login" ? "REGISTER" : "LOGIN"}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden">
          {user ? (
            <Sheet
              open={isSheetOpen}
              onOpenChange={setIsSheetOpen}
              className="p-0">
              <SheetTrigger>
                <UserCircle2 />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col p-0 justify-between h-full">
                <SheetHeader className="m-2 sticky top-0">
                  <div>
                    <SheetTitle className="text-black p-2 text-start flex gap-2 items-center">
                      <UserCircle2 /> {user.email}
                    </SheetTitle>
                  </div>
                </SheetHeader>
                <div className="flex flex-col w-full h-full overflow-scroll">
                  <div className="flex flex-col gap-4">
                    <Link
                      onClick={handleLinkClick}
                      href="/products/shirt"
                      className={`${
                        pathName === "/products/shirt" &&
                        "text-red-500 font-bold"
                      } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                      <Image
                        src={ShirtSvg}
                        alt="shirt"
                        width={30}
                        height={30}
                      />{" "}
                      SHIRT
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      href="/products/pant"
                      className={`${
                        pathName === "/products/pant" &&
                        "text-red-500 font-bold"
                      } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                      <Image src={PantSvg} alt="shirt" width={30} height={30} />{" "}
                      PANT
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      href="/products/tshirt"
                      className={`${
                        pathName === "/products/tshirt" &&
                        "text-red-500 font-bold"
                      } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                      <Image
                        src={TShirtSvg}
                        alt="shirt"
                        width={30}
                        height={30}
                      />{" "}
                      T-SHIRT
                    </Link>
                    <Link
                      onClick={handleLinkClick}
                      href="/products/hoodie"
                      className={`${
                        pathName === "/products/hoodie" &&
                        "text-red-500 font-bold"
                      } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                      <Image
                        src={HoodieSvg}
                        alt="shirt"
                        width={30}
                        height={30}
                      />{" "}
                      HOODIE
                    </Link>
                  </div>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className={`${
                      pathName === "/profile" && "text-red-500 font-bold"
                    } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                    <UserCircle2 size={26} /> PROFILE
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className={`${
                      pathName === "/wishlist" && "text-red-500 font-bold"
                    } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                    <Heart size={26} /> WISH LIST
                  </Link>
                  <Link
                    href="/viewcart"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className={`${
                      pathName === "/viewcart" && "text-red-500 font-bold"
                    } transition-all duration-500 hover:text-red-500 hover:-translate-y-1 ease-in-out  w-full h-14 border-b-[1px] flex gap-2 items-center p-2 hover:bg-red-100`}>
                    <ShoppingBag size={26} /> CART
                  </Link>
                </div>
                <SheetFooter className="m-2">
                  <Button
                    type="button"
                    onClick={handleLogOutAccount}
                    className="flex justify-between bg-red-500 hover:bg-red-600 items-center">
                    Log Out <LogOut size={16} />
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ) : (
            <Link
              href={pathName === "/login" ? "/register" : "/login"}
              className="transition-all duration-500">
              <Button className="transition-all duration-500">
                {pathName === "/login" ? "REGISTER" : "LOGIN"}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
