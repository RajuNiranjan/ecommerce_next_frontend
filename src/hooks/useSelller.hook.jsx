import { ENV_VAR } from "@/config/envVar";
import { sellerFailure, sellerSuccess } from "@/store/actions/seller.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useSeller = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;

  const fetchSeller = async () => {
    dispatch(sellerSuccess());
    try {
      const res = await axios.get(`${API_URI}/api/seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("seller", res.data.seller);
      dispatch(sellerSuccess(res.data.seller));
    } catch (error) {
      dispatch(sellerFailure(error));
    }
  };

  return { fetchSeller };
};
