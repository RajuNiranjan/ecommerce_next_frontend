import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { LogOut, UserCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authLogOut } from "@/store/actions/auth.slice";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOutAccount = () => {
    localStorage.clear();
    dispatch(authLogOut());
  };
  return (
    <nav className="flex justify-between items-center h-20 px-20 shadow-lg">
      <div>LOGO</div>
      <div></div>
      <div>
        {user ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <UserCircle2 />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogOutAccount}
                  className="flex justify-between items-center"
                >
                  Log Out <LogOut size={16} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/login">
            <Button>LogIn</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
