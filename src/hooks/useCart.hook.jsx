import { ENV_VAR } from "@/config/envVar";
import {
  cartData,
  cartFailure,
  cartStart,
  cartSuccess,
} from "@/store/actions/cart.slice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
  const { API_URI } = ENV_VAR;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const fetchCartItems = async () => {
    dispatch(cartStart());
    try {
      const res = await axios.get(`${API_URI}/api/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(cartData(res.data.cartItems));
    } catch (error) {
      console.log(error);
      dispatch(cartFailure(error));
    }
  };

  const removeFromCart = async (productId) => {
    dispatch(cartStart());
    try {
      const res = await axios.delete(
        `${API_URI}/api/cart/${user._id}/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(cartSuccess());
    } catch (error) {
      console.log(error);
      dispatch(cartFailure(error));
    }
  };

  return { fetchCartItems, removeFromCart };
};
