import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/provider";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <AuthProvider>
      <NavBar />
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  </Provider>;
}
