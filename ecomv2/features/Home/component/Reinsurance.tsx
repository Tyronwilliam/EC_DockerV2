import React from "react";
import { TfiWorld } from "react-icons/tfi";
import { TfiLoop } from "react-icons/tfi";
import { MdOutlinePayments } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { Block } from "@/features/common";

export default function Reinsurance() {
  return (
    <section className="reinsurance_container">
      <Block myStyle="reinsurance_item">
        <TfiWorld className="reinsurance_emoji" />
        <div className="container_rein_content">
          <p>Livraison offerte</p>
          <p>Dans toute l'Union Européenne</p>
          <p>Dès 100€ achat</p>
        </div>
      </Block>
      <Block myStyle="reinsurance_item">
        <TfiLoop className="reinsurance_emoji" />
        <div className="container_rein_content">
          <p>Retours gratuits</p>
          <p>30 jours pour changer d'avis</p>
          <p> On s'occupe de tout</p>
        </div>
      </Block>
      <Block myStyle="reinsurance_item">
        <MdOutlinePayments className="reinsurance_emoji" />
        <div className="container_rein_content">
          <p>Paiement en 3x 4x</p>
          <p>Par carte bancaire</p>
          <p>Option sécurisée</p>
        </div>
      </Block>
      <Block myStyle="reinsurance_item">
        <BsFillPeopleFill className="reinsurance_emoji" />
        <div className="container_rein_content">
          <p>Service client express</p>
          <p>Réponse éclair de 10h à 19h</p>
          <p>du lundi au vendredi</p>
        </div>
      </Block>
    </section>
  );
}
