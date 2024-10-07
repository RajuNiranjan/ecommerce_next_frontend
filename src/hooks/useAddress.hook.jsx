import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import {
  addressDelete,
  addressFailure,
  addressStart,
  addressSuccess,
} from "@/store/actions/address.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useAddress = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const { toast } = useToast();

  const fetchAddress = async () => {
    dispatch(addressStart());
    try {
      const res = await axios.get(`${API_URI}/api/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addressSuccess(res.data.address));
    } catch (error) {
      console.error(error);
      dispatch(addressFailure(error));
      toast({
        title: "Failed to fetch address",
        duration: 1000,
      });
    }
  };

  const addressRegistrationOrUpdate = async ({
    name,
    addressLine1,
    addressLine2,
    landMark,
    doorNo,
    mobileNumber,
    userId,
    address,
    onSuccess = () => {},
  }) => {
    if (
      !name ||
      !addressLine1 ||
      !addressLine2 ||
      !landMark ||
      !doorNo ||
      !mobileNumber
    ) {
      return toast({ title: "Please fill all the fields", duration: 1000 });
    }

    dispatch(addressStart());

    try {
      let res;
      if (address) {
        res = await axios.patch(
          `${API_URI}/api/address/${address._id}`,
          {
            name,
            addressLine1,
            addressLine2,
            landMark,
            doorNo,
            mobileNumber,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${API_URI}/api/address`,
          {
            name,
            addressLine1,
            addressLine2,
            landMark,
            doorNo,
            mobileNumber,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      toast({ title: res.data.message, duration: 1000 });
      dispatch(addressSuccess(res.data.address));
      onSuccess();
    } catch (error) {
      console.error(error);
      dispatch(addressFailure(error?.response?.data));

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

  const deleteAddress = async (id) => {
    dispatch(addressStart());
    try {
      const res = await axios.delete(`${API_URI}/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: res.data.message,
        duration: 1000,
      });
      dispatch(addressDelete());
    } catch (error) {
      console.error(error);
      dispatch(addressFailure(error?.response?.data));

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

  return { fetchAddress, addressRegistrationOrUpdate, deleteAddress };
};
