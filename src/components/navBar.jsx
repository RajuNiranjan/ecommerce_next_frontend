import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="flex justify-between items-center h-20 px-20 shadow-lg">
      <div>LOGO</div>
      <div></div>
      <div>
        {user ? (
          "user"
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
