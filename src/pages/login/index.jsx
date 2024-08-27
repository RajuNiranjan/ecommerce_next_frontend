import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/store/actions/auth.slice";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";

const LogIn = () => {
  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

  const apiUri = ENV_VAR.API_URI;
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmitLogInForm = async (e) => {
    e.preventDefault();
    if (!logInForm.email || !logInForm.password) return;
    dispatch(authStart());
    try {
      const res = await axios.post(`${apiUri}/api/auth/login`, logInForm);
      const data = res.data;
      dispatch(authSuccess({ user: data.user, token: data.token }));
      router.push("/");
    } catch (error) {
      console.error(error.response.data);
      dispatch(authFailure(error.response.data));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[450px]">
        <CardHeader className="text-center text-4xl font-bold">
          Log In
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitLogInForm}
            className="flex flex-col gap-4"
          >
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
            <Button type="submit">Log In</Button>
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
