import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { FcCdLogo } from "react-icons/fc";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { open } from "@/features/common/slice";
type Props = {
  itemNumber: number;
};
export default function NavBar({ itemNumber }: Props) {
  const [openNav, setOpenNav] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(open());
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
            setOpenNav(!open);
          }}
        />
        <div></div>
      </div>
      {/* Navigation */}
      <nav className={`default_nav ${openNav ? "open" : "close"}`}>
        <ul>
          {/* Main content */}
          <li>Boutique</li>
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
          <li onClick={handleOpen}>Se connecter</li>

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
