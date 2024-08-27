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

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    userName: "",
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
    setRegisterForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitRegisterForm = async (e) => {
    e.preventDefault();
    if (!registerForm.email || !registerForm.userName || !registerForm.password)
      return;
    dispatch(authStart());
    try {
      const res = await axios.post(`${apiUri}/api/auth/register`, registerForm);
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
          Register
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmitRegisterForm}
            className="flex flex-col gap-4"
          >
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
            <Button type="submit">Register</Button>
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
