import React from "react";
import Boutique from "../../../public/boutique.jpg";
import Image from "next/image";
import { Block } from "@/features/common";
export default function FindUs() {
  return (
    <Block myStyle="find_us">
      <div className="container_photo">
        <Image
          src={Boutique}
          fill
          alt="Photo Boutique"
          className="find_us_photo"
        />
      </div>
      <div className="container_content">
        <div className="container_flex">
          <h3>Nos Boutiques</h3>
          <p>
            De vrais lieux de vie dans lesquels on aime vous rencontrer, vous
            écouter et vous conseiller. Et même mieux : nous vous consacrons
            toute notre attention lors d'un rendez-vous personnalisé. Une heure
            rien qu'à vous en visio ou en physique.
          </p>
          <button>Nos Boutiques</button>
          <button>Prendre rendez-vous</button>
        </div>
      </div>
    </Block>
  );
}
