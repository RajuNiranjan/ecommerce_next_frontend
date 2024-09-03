import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import {
  Heart,
  LogIn,
  LogOut,
  MenuIcon,
  ShoppingBag,
  UserCircle2,
  X,
} from "lucide-react";
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { authLogOut } from "@/store/actions/auth.slice";
import { usePathname } from "next/navigation";
import { useToast } from "./ui/use-toast";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { toast } = useToast();

  const handleLogOutAccount = () => {
    localStorage.clear();
    dispatch(authLogOut());
    toast({
      title: "Log Out successfully",
    });
  };
  return (
    <nav className="flex justify-between items-center h-20 px-5 md:px-20 shadow-lg sticky top-0 z-50 bg-white">
      <div>
        <Link
          href="/"
          className="hover:text-red-500 transition-all duration-100">
          LOGO
        </Link>
      </div>
      <div></div>
      <div>
        {/* WEB MENU */}
        <div className=" hidden md:flex gap-4 items-center">
          <Link
            href="/wishlist"
            className={`${
              pathName === "/wishlist" && "text-red-500 "
            } transition-all duration-100`}>
            <Heart />
          </Link>
          <Link
            href="/viewcart"
            className={`${
              pathName === "/viewcart" && "text-red-500 "
            } transition-all duration-100`}>
            <ShoppingBag />
          </Link>

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

        {/* MOBILE MENU */}
        <div className="md:hidden">
          {user ? (
            <Sheet>
              <SheetTrigger>
                <UserCircle2 />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col justify-between  h-full">
                <SheetHeader>
                  <SheetTitle>{user.userName}</SheetTitle>
                  <Link
                    href="/profile"
                    className="w-full h-10 flex justify-start items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
                    PROFILE
                  </Link>
                  <Link
                    href="/wishlist"
                    className="w-full h-10 flex justify-start items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
                    WISH LIST
                  </Link>
                  <Link
                    href="/viewcart"
                    className="w-full h-10 flex justify-start items-center p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
                    CART
                  </Link>
                </SheetHeader>
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
