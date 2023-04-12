import Box from "@/features/common/components/Box";
import Link from "next/link";
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
import { VscAccount } from "react-icons/vsc";
import { QueryUserType } from "../models";
import MyAccount from "./MyAccount";
import { capitalizeFirstLetter } from "@/constants/function";
function ProfilView({ user }: { user?: QueryUserType["user"] }) {
  const [showCommandPage, setShowCommandPage] = useState("command");

  const handleUrlChange = () => {
    if (
      window.location.href ===
      `http://localhost:3000/auth/profil/infos?id=${user?.id}
`
    ) {
      setShowCommandPage("infos");
    } else if (
      window.location.href ===
      `http://localhost:3000/auth/profil/command?id=${user?.id}`
    ) {
      setShowCommandPage("command");
    } else if (
      window.location.href ===
      `http://localhost:3000/auth/profil/my-account?id=${user?.id}`
    ) {
      setShowCommandPage("my-account");
    } else setShowCommandPage("profil");
  };
  const handleCommandClick = (e: React.SyntheticEvent, arg: string): void => {
    setShowCommandPage(arg);
    window.history.pushState(
      null,
      "",
      "/auth/profil/" + arg + `?id=${user?.id}`
    );
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
                  <li onClick={(e) => handleCommandClick(e, "my-account")}>
                    {" "}
                    <div>
                      <VscAccount className="emoji" />
                      <p>Aperçu du compte</p>
                    </div>
                  </li>
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
          {showCommandPage === "my-account" && <MyAccount />}

          {showCommandPage === "command" && <CommandPage />}
          {showCommandPage === "infos" && <InfosPage />}
        </>
      </Box>
    </div>
  );
}

export default ProfilView;
