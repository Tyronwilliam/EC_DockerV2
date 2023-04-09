import React from "react";
interface Props {
  children: React.ReactElement;
  myStyle: string;
}
function Box(props: Props): JSX.Element {
  const { children } = props;

  return <div className={`${props.myStyle}`}>{children}</div>;
}

export default Box;
