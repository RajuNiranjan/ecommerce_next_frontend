import { ENV_VAR } from "@/config/envVar";
import {
  addressFailure,
  addressStart,
  addressSuccess,
} from "@/store/actions/address.slice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useAddress = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { API_URI } = ENV_VAR;

  const fetchAddress = async () => {
    dispatch(addressStart());
    try {
      const res = await axios.get(`${API_URI}/api/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("address", res.data.address);

      dispatch(addressSuccess(res.data.address));
    } catch (error) {
      console.log(error);
      dispatch(addressFailure(error));
    }
  };

  return { fetchAddress };
};
