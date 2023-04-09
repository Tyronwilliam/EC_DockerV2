import React, { useState, useEffect, useMemo } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { FcCdLogo } from "react-icons/fc";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { open } from "@/features/common/slice";
import { useSelector } from "react-redux";
import { logout, selectIsLogged } from "@/features/auth/slice";
import useUtilityModal from "@/features/common/hooks/useUtilityModal";
type Props = {
  itemNumber: number;
};
export default function NavBar({ itemNumber }: Props) {
  const { displayNotification } = useUtilityModal();
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLogged = useSelector(selectIsLogged);
  const handleOpen = () => {
    dispatch(open());
  };
  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/auth/profil");
  };
  return (
    <header className="header_container">
      {/* Handle Close /Open */}
      <div className="container_logo_hamburger">
        <div className="container_emoji">
          {!openNav && (
            <CiMenuBurger
              className="hamburger"
              onClick={() => {
                setOpenNav(!openNav);
              }}
            />
          )}
          {openNav && (
            <AiOutlineClose
              className="hamburger"
              onClick={() => {
                setOpenNav(!openNav);
              }}
            />
          )}
        </div>
        <FcCdLogo
          className="logo"
          onClick={() => {
            router.push("/");
          }}
        />
        <div></div>
      </div>
      {/* Navigation */}
      <nav className={`default_nav ${openNav ? "open" : "close"}`}>
        <ul>
          {/* Main content */}
          <li
            onClick={() => {
              console.log("click");
            }}
          >
            Boutique
          </li>
          <li>LookBook</li>
          <li
            onClick={(e) => {
              e.preventDefault();
              router.push("/Brand");
            }}
          >
            La Marque
          </li>
          <li>Carte Cadeaux</li>
        </ul>

        {/* User and panier */}
        <ul>
          {isLogged ? (
            <li onClick={(e) => handleLogout(e)}>Mon compte</li>
          ) : (
            <li onClick={handleOpen}>Se connecter</li>
          )}

          {/* Panier icone + chiffre */}
          <li className="shopping_item">
            <div>
              <AiOutlineShopping className="shopping_emoji" />
              <span>{itemNumber}</span>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
