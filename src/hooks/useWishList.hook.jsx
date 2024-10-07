import { ENV_VAR } from "@/config/envVar";
import {
  wishListData,
  wishListFailure,
  wishListStart,
} from "@/store/actions/wishList.slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const useWishList = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;
  const { user } = useSelector((state) => state.auth);

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

  return { fetchWishList };
};
