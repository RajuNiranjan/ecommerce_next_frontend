import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/store/actions/auth.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useAccount = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { API_URI } = ENV_VAR;
  const dispatch = useDispatch();
  const { toast } = useToast();

  const updateUserData = async ({
    password,
    newPassword,
    setUpdateUserInfo,
    userID,
  }) => {
    if (!password || !newPassword)
      return toast({ title: "Please fill in all fields", duration: 1000 });

    dispatch(authStart());
    try {
      const res = await axios.patch(
        `${API_URI}/api/user/${userID}`,
        { password, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({ title: res.data.message, duration: 1000 });
      setUpdateUserInfo({ password: "", newPassword: "" });
      dispatch(authSuccess(res.data.user));
    } catch (error) {
      console.error(error);
      dispatch(authFailure(error?.response?.data));

      const errorMessage =
        typeof error?.response?.data === "string"
          ? error?.response?.data
          : error?.response?.data?.message || "An error occurred";

      toast({
        title: errorMessage,
        duration: 1000,
      });
    }
  };

  return { updateUserData };
};
