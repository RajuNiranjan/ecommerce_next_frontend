// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { authSuccess, userInfo } from "@/store/actions/auth.slice";
// import { ENV_VAR } from "@/config/envVar";
// import axios from "axios";

// export const AuthProvider = ({ children }) => {
//   const [fetched, setFetched] = useState(false);
//   const [token, setToken] = useState("");
//   const dispatch = useDispatch();
//   const apiUri = ENV_VAR.API_URI;

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedToken = localStorage.getItem("token");
//       if (storedToken) {
//         setToken(storedToken);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!token || !apiUri || fetched) return;
//     const fetchUserInfo = async () => {
//       try {
//         const userRes = await axios.get(`${apiUri}/api/user`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const userInfoRes = await axios.get(`${apiUri}/api/user/userInfo`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const userData = userRes.data;
//         const userInfoData = userInfoRes.data;
//         dispatch(authSuccess(userData.user));
//         dispatch(userInfo(userInfoData));
//         setFetched(true);
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//       }
//     };
//     fetchUserInfo();
//   }, [token, apiUri, fetched, dispatch]);

//   return <>{children}</>;
// };
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authSuccess, userInfo } from "@/store/actions/auth.slice";
import { ENV_VAR } from "@/config/envVar";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [fetched, setFetched] = useState(false);
  const dispatch = useDispatch();
  const apiUri = ENV_VAR.API_URI;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || fetched || !apiUri) return;

    const fetchUserInfo = async () => {
      try {
        const [userRes, userInfoRes] = await Promise.all([
          axios.get(`${apiUri}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`${apiUri}/api/user/userInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        dispatch(authSuccess(userRes.data.user));
        dispatch(userInfo(userInfoRes.data));
        setFetched(true);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [apiUri, fetched, dispatch]);

  return <>{children}</>;
};
