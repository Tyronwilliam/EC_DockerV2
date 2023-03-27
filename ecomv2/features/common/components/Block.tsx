import React from "react";
type Props = {
  children: string | JSX.Element | JSX.Element[];
  myStyle: string;
};

function Block({ children, myStyle }: Props) {
  return <div className={myStyle}>{children}</div>;
}

export default Block;
