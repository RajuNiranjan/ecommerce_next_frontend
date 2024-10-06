import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import {
  sellerFailure,
  sellerStart,
  sellerSuccess,
} from "@/store/actions/seller.slice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useSeller = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const { toast } = useToast();
  const router = useRouter();

  const fetchSeller = async () => {
    dispatch(sellerSuccess());
    try {
      const res = await axios.get(`${API_URI}/api/seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(sellerSuccess(res.data.seller));
    } catch (error) {
      console.log(error);

      dispatch(sellerFailure(error));
    }
  };

  const sellerRegistration = async ({
    bussinessName,
    storeName,
    storeEmail,
    storeAddress,
    storeDescription,
    storePassword,
    userId,
  }) => {
    if (
      !bussinessName ||
      !storeName ||
      !storeEmail ||
      !storeAddress ||
      !storeDescription ||
      !storePassword ||
      !userId
    ) {
      toast({
        title: "All fields are required",
        duration: 1000,
      });
    }
    dispatch(sellerStart());
    try {
      const res = await axios.post(
        `${API_URI}/api/seller`,
        {
          bussinessName,
          storeName,
          storeEmail,
          storeAddress,
          storeDescription,
          storePassword,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("seller post", res.data.seller);

      dispatch(sellerSuccess(res.data.seller));

      router.push(`/store/${res.data.seller._id}`);
    } catch (error) {
      console.error(error);
      dispatch(sellerFailure(error?.response?.data));

      const errorMessage =
        typeof error?.response?.data === "string"
          ? error?.response?.data
          : error?.response?.data?.message ||
            "An error occurred in to register as seller";

      toast({
        title: errorMessage,
        duration: 1000,
      });
    }
  };

  return { fetchSeller, sellerRegistration };
};
