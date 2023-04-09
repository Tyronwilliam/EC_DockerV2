import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useUtilityModal from "../hooks/useUtilityModal";
import { selectNotification, Utility } from "../slice";

function SnackBar() {
  const notification = useSelector(selectNotification);
  const { clearNotifications } = useUtilityModal();
  const style = notification.type === "error" ? " error" : " success";
  const open = notification.open ? "show" : "hide";
  useEffect(() => {
    if (notification.message) {
      const timeout = setTimeout(() => {
        clearNotifications();
      }, notification.timeout);
      return () => clearTimeout(timeout);
    }
  }, [notification.open]);

  return (
    <div className={` ${open + style}`}>
      <p>{notification.message}</p>
    </div>
  );
}

export default SnackBar;
