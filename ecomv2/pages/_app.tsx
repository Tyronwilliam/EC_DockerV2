import type { AppProps } from "next/app";
import NavBar from "./components/Navigation/NavBar";
import "../styles/globals.scss";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar itemNumber={1} />
      <Component {...pageProps} />
    </>
  );
}
