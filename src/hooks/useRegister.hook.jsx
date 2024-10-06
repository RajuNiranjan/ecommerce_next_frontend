import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/store/actions/auth.slice";
import axios from "axios";

export const useRegister = () => {
  const { API_URI } = ENV_VAR;
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const register = async ({ userName, email, password }) => {
    if (!userName || !email || !password) {
      return toast({
        title: "All fields are required",
        duration: 1000,
      });
    }
    dispatch(authStart());
    try {
      const res = await axios.post(`${API_URI}/api/auth/register`, {
        userName,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(authSuccess(res.data.user));
      toast({
        title: res.data.message,
        duration: 1000,
      });
      router.push("/");
    } catch (error) {
      console.log(error);

      console.error(error?.response?.data);
      dispatch(authFailure(error?.response?.data));

      const errorMessage =
        typeof error?.response?.data === "string"
          ? error?.response?.data
          : error?.response?.data?.message || "An error occurred in register";

      toast({
        title: errorMessage,
        duration: 1000,
      });
    }
  };

  return { register };
};
