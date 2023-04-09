import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNotification, clearNotification, Utility } from "../slice";
function useUtilityModal() {
  const dispatch = useDispatch();

  const displayNotification = (notification: Utility) => {
    dispatch(addNotification(notification));
  };

  const clearNotifications = () => {
    dispatch(clearNotification());
  };

  return { clearNotifications, displayNotification };
}

export default useUtilityModal;
