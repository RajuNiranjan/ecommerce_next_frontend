import Link from "next/link";
import React, { useState } from "react";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { authLogOut } from "@/store/actions/auth.slice";
import { usePathname } from "next/navigation";
import { useToast } from "./ui/use-toast";

const NavigationData = [
  {
    id: 1,
    title: "SHIRT",
    subItems: [
      {
        id: 11,
        title: "FULL HANDS",
        href: "/",
      },
      {
        id: 12,
        title: "HALF HANDS",
        href: "/",
      },
      {
        id: 13,
        title: "3/4 HANDS",
        href: "/",
      },
    ],
  },
  {
    id: 3,
    title: "PANT",
    subItems: [
      {
        id: 31,
        title: "JEANS",
        href: "/",
      },
      {
        id: 32,
        title: "COTTON",
        href: "/",
      },
      {
        id: 33,
        title: "3/4 HANDS",
        href: "/",
      },
    ],
  },
  {
    id: 2,
    title: "T-SHIRT",
    subItems: [
      {
        id: 21,
        title: "FULL HANDS",
        href: "/",
      },
      {
        id: 22,
        title: "HALF HANDS",
        href: "/",
      },
      {
        id: 23,
        title: "3/4 HANDS",
        href: "/",
      },
    ],
  },
];

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { toast } = useToast();
  const { wishListItems } = useSelector((state) => state.wishList);
  const { cartItems } = useSelector((state) => state.cart);

  const [accordionValue, setAccordionValue] = useState(null);
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
    <nav className="flex justify-between items-center h-20 px-5 md:px-20 shadow-lg sticky top-0 z-50 bg-white">
      <div>
        <Link
          href="/"
          className="hover:text-red-500 transition-all duration-100">
          LOGO
        </Link>
      </div>
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            {NavigationData.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {item.subItems.map((items, index) => (
                    <div key={index} className="w-[200px] flex flex-col gap-2">
                      <Link
                        href={items.href}
                        className="hover:bg-blue-50 transition-all duration-300 p-2">
                        <NavigationMenuLink>{items.title}</NavigationMenuLink>
                      </Link>
                    </div>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        {/* WEB MENU */}
        <div className=" hidden md:flex gap-10 items-center justify-center">
          <Link
            href="/wishlist"
            className={`${
              pathName === "/wishlist" && "text-red-500 "
            } transition-all duration-500 hover:-translate-y-2 ease-in-out`}>
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
            } transition-all duration-500 hover:-translate-y-2 ease-in-out`}>
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
        <div className="md:hidden">
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
                  <div className="bg-white shadow-lg border rounded-lg">
                    <SheetTitle className="text-black p-2 text-start flex gap-2 items-center">
                      <UserCircle2 /> {user.email}
                    </SheetTitle>
                  </div>
                </SheetHeader>
                <div className="flex flex-col w-full h-full overflow-scroll">
                  <div>
                    {NavigationData.map((item, index) => (
                      <Accordion
                        key={index}
                        value={accordionValue}
                        onValueChange={(value) => setAccordionValue(value)} // Manage the active accordion
                        className="p-0 m-2 bg-transparent border-none"
                        type="single"
                        collapsible>
                        <AccordionItem value={`item-${index}`}>
                          <AccordionTrigger>{item.title}</AccordionTrigger>
                          <AccordionContent>
                            {item.subItems.map((items, idx) => (
                              <Link
                                key={idx}
                                href={items.href}
                                onClick={handleLinkClick} // Close sheet on navigation
                                className="w-full h-10 flex gap-2 items-center p-2 transition-all duration-300 hover:bg-red-100">
                                {items.title}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </div>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className="w-full h-20 border-b-[1px] flex gap-2 items-center p-2 transition-all duration-300 hover:bg-red-100">
                    <UserCircle2 size={18} /> PROFILE
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className="w-full h-20 border-b-[1px] flex gap-2 items-center p-2 transition-all duration-300 hover:bg-red-100">
                    <Heart size={18} /> WISH LIST
                  </Link>
                  <Link
                    href="/viewcart"
                    onClick={handleLinkClick} // Close sheet on navigation
                    className="w-full h-20 border-b-[1px] flex gap-2 items-center p-2 transition-all duration-300 hover:bg-red-100">
                    <ShoppingBag size={18} /> CART
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
