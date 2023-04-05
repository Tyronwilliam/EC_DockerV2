import React from "react";

interface Props {
  children: React.ReactElement;
}
export default function Page(props: Props): JSX.Element {
  const { children } = props;
  return (
    <main>
      <section className="container_fluid">{children}</section>
    </main>
  );
}
