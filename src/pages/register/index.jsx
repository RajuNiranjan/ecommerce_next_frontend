import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useRegister } from "@/hooks/useRegister.hook";

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeInputText = (e) => {
    const { id, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const { register } = useRegister();

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    await register(registerForm);
  };

  return (
    <div className="flex justify-center items-center bg-[url('http://res.cloudinary.com/dlgewrscf/image/upload/v1726078634/tgejfdkb2b5mkltiqfku.webp')] bg-cover bg-center h-screen ">
      <Card className="w-[450px] backdrop-blur-lg bg-white/30 ">
        <CardHeader className="text-center  text-4xl font-bold">
          Register
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitRegisterForm}
            className="flex flex-col gap-4 ">
            <div>
              <Label htmlFor="userName">User Name</Label>
              <Input
                type="text"
                id="userName"
                placeholder="John"
                value={registerForm.userName}
                onChange={handleChangeInputText}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="john@gmail.com"
                value={registerForm.email}
                onChange={handleChangeInputText}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={registerForm.password}
                  onChange={handleChangeInputText}
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
            <Button type="submit">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <small>
            Already have an account ? <Link href="/login">LogIn</Link>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
