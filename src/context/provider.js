import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authSuccess } from "@/store/actions/auth.slice";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [fetched, setFetched] = useState(false);
  const dispatch = useDispatch();
  const apiUri = ENV_VAR.API_URI;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || fetched || !apiUri) return;

    const fetchUser = async () => {
      try {
        const userRes = await axios.get(`${apiUri}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(authSuccess(userRes.data.user));
        setFetched(true);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [apiUri, fetched, dispatch]);

  return <>{children}</>;
};
