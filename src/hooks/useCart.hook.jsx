import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
  const { cartItems } = useSelector((state) => state.cart);
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

  const addOrRemoveFromCart = async ({ productId, size, color, quantity }) => {
    if (!user) {
      toast({
        title: "Please login to add to cart",
        duration: 1000,
      });
      return;
    }
    if (!size) {
      toast({
        title: "Please select a size",
        duration: 1000,
      });
      return;
    }

    if (!color) {
      toast({
        title: "Please select a color",
        duration: 1000,
      });
      return;
    }

    if (quantity <= 0) {
      toast({
        title: "Quantity must be at least 1",
        duration: 1000,
      });
      return;
    }
    console.log("product id", productId);

    const isInCart = cartItems.find((item) => item.product._id === productId);

    console.log("isInCart", isInCart);

    dispatch(cartStart());
    try {
      let res;
      if (isInCart) {
        res = await axios.delete(
          `${API_URI}/api/cart/${user._id}/remove/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await axios.post(
          `${API_URI}/api/cart`,
          {
            userId: user._id,
            productId,
            size,
            color,
            quantity,
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

      dispatch(cartSuccess());
    } catch (error) {
      console.log(error);
      dispatch(cartFailure(error));
    }
  };

  return { fetchCartItems, removeFromCart, addOrRemoveFromCart };
};
