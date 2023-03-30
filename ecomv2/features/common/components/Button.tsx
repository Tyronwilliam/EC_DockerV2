import React from "react";

type Props = {
  handler: (e: any) => void;
};
export default function Button({ handler }: Props) {
  return <button onClick={handler}>Button</button>;
}
