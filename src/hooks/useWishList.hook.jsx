import { useToast } from "@/components/ui/use-toast";
import { ENV_VAR } from "@/config/envVar";
import {
  wishListData,
  wishListFailure,
  wishListStart,
  wishListSuccess,
} from "@/store/actions/wishList.slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const useWishList = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const { user } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishList);
  const { toast } = useToast();

  const fetchWishList = async () => {
    dispatch(wishListStart());
    try {
      const res = await axios.get(`${API_URI}/api/wishlist/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(wishListData(res.data.wishList));
    } catch (error) {
      console.log(error);
      dispatch(wishListFailure(error));
    }
  };

  const addOrRemoveFromWishList = async (productId) => {
    const isInWishList = wishListItems.find((item) => item._id === productId);

    dispatch(wishListStart());
    try {
      let res;

      if (isInWishList) {
        res = await axios.delete(
          `${API_URI}/api/wishlist/${user._id}/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${API_URI}/api/wishList`,
          {
            userId: user._id,
            productId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      toast({
        title: res.data.message,
        duration: 1000,
      });

      dispatch(wishListSuccess(res.data.wishList));
    } catch (error) {
      console.log(error);
      dispatch(wishListFailure(error));
    }
  };

  return { fetchWishList, addOrRemoveFromWishList };
};
