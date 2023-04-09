import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { NavBar } from "@/features/Home";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/appli/store";
import SnackBar from "@/features/common/components/SnackBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackBar />
        <NavBar itemNumber={0} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
