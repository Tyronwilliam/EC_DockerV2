import React from "react";
import { useDispatch } from "react-redux";
import { close } from "../slice";

interface Props {
  children?: React.ReactElement;
}
function Dialog({ children }: Props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close());
  };
  return (
    <div className="Dialog_container">
      <div className="background" onClick={() => handleClose()}></div>
      {children}
    </div>
  );
}

export default Dialog;
