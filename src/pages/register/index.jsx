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

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const apiUri = ENV_VAR.API_URI;
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
      return toast({ title: "Please fill all the fields" });
    dispatch(authStart());
    try {
      const res = await axios.post(`${apiUri}/api/auth/register`, registerForm);
      const data = res.data;
      localStorage.setItem("token", data.token);
      dispatch(authSuccess(data.user));
      toast({
        title: data.message,
        duration: 1000,
      });
      router.push("/");
    } catch (error) {
      console.error(error.response.data);
      dispatch(authFailure(error.response.data));
      toast({
        title: error.response.data.message,
        duration: 1000,
      });
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
            {error && (
              <small className="text-red-500 text-center">
                {error.message}
              </small>
            )}
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
