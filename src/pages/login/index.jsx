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
import { useDispatch, useSelector } from "react-redux";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/store/actions/auth.slice";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";
import { useToast } from "@/components/ui/use-toast";
import { useLogIn } from "@/hooks/useLogIn.hook";

const LogIn = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  const apiUri = ENV_VAR.API_URI;
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeInputText = (e) => {
    const { id, value } = e.target;
    setLogInForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const { login } = useLogIn();

  const handleSubmitLogInForm = async (e) => {
    e.preventDefault();
    await login(logInForm);
  };

  return (
    <div className="flex justify-center items-center bg-[url('http://res.cloudinary.com/dlgewrscf/image/upload/v1726078618/yyr8v6cqzx9uc1lwcnii.webp')] bg-cover bg-center h-screen ">
      <Card className="w-[450px] backdrop-blur-lg  bg-white/30">
        <CardHeader className="text-center text-4xl font-bold">
          Log In
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitLogInForm}
            className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="john@gmail.com"
                value={logInForm.email}
                onChange={handleChangeInputText}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={logInForm.password}
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
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center">
          <small>
            Don&apos;t have an account ? <Link href="/register">Register</Link>
          </small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LogIn;
