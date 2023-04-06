import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store, persistor } from "@/app/store";
import { NavBar } from "@/features/Home";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavBar itemNumber={0} />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
