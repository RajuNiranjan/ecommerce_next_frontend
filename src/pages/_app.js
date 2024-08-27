import NavBar from "@/components/navBar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/provider";
import { store } from "@/store/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavBar />
        <Toaster />
        <div className="p-4 md:p-10">
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </Provider>
  );
}
