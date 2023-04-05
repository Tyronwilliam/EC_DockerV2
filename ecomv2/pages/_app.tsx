import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { NavBar } from "@/features/Home";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar itemNumber={0} />
      <Component {...pageProps} />
    </Provider>
  );
}
