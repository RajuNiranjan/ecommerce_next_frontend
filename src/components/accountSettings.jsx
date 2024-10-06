import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useAccount } from "@/hooks/useAccount.hook";

const AccountSettings = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const userID = user?._id;
  const [updateUserInfo, setUpdateUserInfo] = useState({
    password: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setUpdateUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { updateUserData } = useAccount();

  const handleSubmitUpdateUserInfo = async (e) => {
    e.preventDefault();
    const { password, newPassword } = updateUserInfo;
    await updateUserData({ password, newPassword, setUpdateUserInfo, userID });
  };

  return (
    <Card className="w-full h-max border border-gray-300 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Account Settings</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmitUpdateUserInfo} className="grid gap-4">
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={user?.userName} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user?.email} disabled />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="password">Current Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={updateUserInfo.password}
                  onChange={handleChangeText}
                />
                <div className="absolute top-2 right-5">
                  {showPassword ? (
                    <EyeIcon
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={updateUserInfo.newPassword}
                  onChange={handleChangeText}
                />
                <div className="absolute top-2 right-5">
                  {showPassword ? (
                    <EyeIcon
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "UPDATE PROFILE"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AccountSettings;
