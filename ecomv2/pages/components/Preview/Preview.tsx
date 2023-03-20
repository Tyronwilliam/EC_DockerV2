import Image from "next/image";
import React from "react";
import People from "../../../public/mode-people.jpg";
import MakeUp from "../../../public/mode-makeup.jpg";
import Clothing from "../../../public/mode-clothing.jpg";
import ClothingOne from "../../../public/mode-clothing-one.jpg";

function Preview() {
  return (
    <div className="container_photo_maker">
      <div className="single_container_photo">
        <Image src={People} fill alt="Photo" className="photo" />
        <p>0</p>
      </div>
      <div className="single_container_photo">
        <Image src={MakeUp} fill alt="Photo" className="photo" />
      </div>
      <div className="single_container_photo">
        <Image src={Clothing} fill alt="Photo" className="photo" />
      </div>
      <div className="single_container_photo">
        <Image src={ClothingOne} fill alt="Photo" className="photo" />
      </div>
    </div>
  );
}

export default Preview;
