import Box from "@/features/common/components/Box";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import CommandPage from "./CommandPage";
import InfosPage from "./InfosPage";
import Image from "next/image";
import Fake from "../../../public/men-walking.jpg";
import { BsBox2 } from "react-icons/bs";
import { GrDocumentUser } from "react-icons/gr";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { MdOutlineDiscount } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUser } from "../slice";
function ProfilView() {
  const [showCommandPage, setShowCommandPage] = useState("command");
  const [url, setUrl] = useState(window.location.href);
  const user = useSelector(selectUser);

  const handleUrlChange = () => {
    setUrl(window.location.href);
    if (window.location.href === "http://localhost:3000/auth/profil/infos") {
      setShowCommandPage("infos");
    } else if (
      window.location.href === "http://localhost:3000/auth/profil/command"
    ) {
      setShowCommandPage("command");
    } else setShowCommandPage("profil");
  };
  const handleCommandClick = (e: React.SyntheticEvent, arg: string): void => {
    setShowCommandPage(arg);
    window.history.pushState(null, "", "/auth/profil/" + arg);
  };
  const capitalizeFirstLetter = (string: string | undefined) => {
    let nameCap;
    return (nameCap = string
      ? string.charAt(0).toUpperCase() + string?.slice(1)
      : null);
  };
  const nameCapitalise = useMemo(
    () => capitalizeFirstLetter(user?.name),
    [user]
  );
  const lastnameCapitalise = useMemo(
    () => capitalizeFirstLetter(user?.lastname),
    [user]
  );
  useEffect(() => {
    window.addEventListener("popstate", handleUrlChange);
    handleUrlChange();
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);
  return (
    <div className="container_profil">
      <Box myStyle="box_profil">
        <>
          <div className="user_content">
            <div className="profile_picture">
              <div className="hover_profile_change">
                <MdOutlineAddAPhoto className="emoji_picture" />
              </div>
              <Image
                src={Fake}
                alt="proflie picture"
                fill
                className="img_profile"
              />
            </div>
            <div>
              <p>Bonjour,</p>
              <p>
                {nameCapitalise}
                {"  "}
                {lastnameCapitalise}
              </p>
            </div>
          </div>
          <Box myStyle="user_navigation">
            <>
              <nav>
                <ul>
                  <li onClick={(e) => handleCommandClick(e, "command")}>
                    {" "}
                    <div>
                      <BsBox2 className="emoji" />
                      <p>Mes commandes</p>
                    </div>
                  </li>
                  <li onClick={(e) => handleCommandClick(e, "infos")}>
                    <div>
                      <GrDocumentUser className="emoji" />
                      <p>Mes informations</p>
                    </div>
                  </li>{" "}
                  <li onClick={(e) => handleCommandClick(e, "infos")}>
                    <div>
                      <MdOutlineDiscount className="emoji" />
                      <p>Code promo</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <RiLogoutBoxLine className="emoji" />
                      <Link href="/auth/deco">Déconnexion</Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </>
          </Box>
        </>
      </Box>
      <Box myStyle="box_profil main">
        <>
          {showCommandPage === "command" && <CommandPage />}
          {showCommandPage === "infos" && <InfosPage />}
        </>
      </Box>
    </div>
  );
}

export default ProfilView;
