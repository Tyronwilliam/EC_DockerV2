import React from "react";
import Men from "../../../public/boutique.jpg";
import Image from "next/image";
import { Block } from "@/features/common";
export default function Newsletter() {
  return (
    <Block myStyle="find_us">
      <div className="container_photo">
        <Image src={Men} fill alt="Photo Boutique" className="find_us_photo" />
      </div>
      <div className="container_content">
        <div className="container_flex">
          <p>Tenez-vous au courant de nos prochaines collections</p>
          <p>Vous saurez tout avant les autres.</p>
          <div>
            <div>
              <input type="radio" />
              <label htmlFor="men">Mode Homme</label>
            </div>
            <div>
              <input type="radio" />
              <label htmlFor="women">Mode Femme</label>
            </div>{" "}
            <input type="email" placeholder="Email*" />
          </div>
          <button>S'inscrire</button>
          <span>
            En laissant votre e-mail, vous obtenez l'accès à nos newsletters
            riches en conseils, inspirations et vêtements de qualité. Bien sûr,
            se désinscrire est possible à tout moment. Et si le cœur vous en
            dit, voici nos mentions légales.
          </span>{" "}
        </div>
      </div>
    </Block>
  );
}
