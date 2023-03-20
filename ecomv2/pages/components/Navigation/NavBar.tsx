import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { FcCdLogo } from "react-icons/fc";
import { AiOutlineShopping } from "react-icons/ai";

type Props = {
  itemNumber: number;
};
const NavBar = ({ itemNumber }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="header_container">
      {/* Handle Close /Open */}
      <div className="container_logo_hamburger">
        <div className="container_emoji">
          {!open && (
            <CiMenuBurger
              className="hamburger"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
          {open && (
            <AiOutlineClose
              className="hamburger"
              onClick={() => {
                setOpen(!open);
              }}
            />
          )}
        </div>
        <FcCdLogo
          className="logo"
          onClick={() => {
            setOpen(!open);
          }}
        />
        <div></div>
      </div>
      {/* Navigation */}
      <nav className={`default_nav ${open ? "open" : "close"}`}>
        <ul>
          {/* Main content */}
          <li>Boutique</li>
          <li>LookBook</li>
          <li>La Marque</li>
          <li>Carte Cadeaux</li>
        </ul>

        {/* User and panier */}
        <ul>
          <li>Mon compte</li>
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
};

export default NavBar;
