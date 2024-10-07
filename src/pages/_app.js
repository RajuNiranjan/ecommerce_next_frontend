import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/toaster";
import { authSuccess, fetchUser } from "@/store/actions/auth.slice";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppContent Component={Component} pageProps={pageProps} />
    </Provider>
  );
}

const AppContent = ({ Component, pageProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      dispatch(authSuccess(token));
      dispatch(fetchUser(token));
    }
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Toaster />
      <div className="h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
};
