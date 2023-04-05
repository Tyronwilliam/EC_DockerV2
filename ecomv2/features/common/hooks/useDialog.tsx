import { useRouter } from "next/router";
import { useState, useEffect } from "react";
function useDialog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const openModal = () => {
    setIsModalOpen(true);
    router.replace("/connexion", undefined, { shallow: true });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    const newUrl = `${window.location.origin}`;
    console.log(newUrl, "newUrl");
    window.history.pushState({}, "", newUrl);
  };
  useEffect(() => {
    console.log("Current URL pathname:", window.location.pathname);
    if (window.location.pathname === "/connexion") {
      openModal();
    } else {
      closeModal();
    }
  }, []);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };
  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,
    openLoginModal,
    closeLoginModal,
    showLoginModal,
  };
}

export default useDialog;
