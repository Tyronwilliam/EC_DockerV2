import React from "react";
import NavBar from "./NavBar";

interface Props {
  children: React.ReactElement;
}
export default function Page(props: Props): JSX.Element {
  const { children } = props;
  return (
    <main>
      <NavBar itemNumber={0} />
      <section className="container_fluid">{children}</section>
    </main>
  );
}

