import React from "react";
import { useSelector } from "react-redux";
import { AccessDialog } from "@/features/auth";
import { useDispatch } from "react-redux";
import { close, selectShow } from "@/features/common/slice";
interface Props {
  children: React.ReactElement;
}
export default function Page(props: Props): JSX.Element {
  const show = useSelector(selectShow);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  };
  const { children } = props;
  return (
    <main>
      {show && <AccessDialog func={handleClose} />}
      <section className="container_fluid">{children}</section>
    </main>
  );
}
