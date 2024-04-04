import React from "react";
import { addImageToStorage } from "../utils/firebase/firebase.utils";
import Bubble from "../assets/product-images/bubble.jpg";
import Couple from "../assets/product-images/couple-lavender.jpg";
import MiniBubble from "../assets/product-images/mini-bubble-vanilla.jpg";
import Pillar from "../assets/product-images/pillar-vanilla.jpg";
import Shell from "../assets/product-images/shell-lemongrass.jpg";
import Swirl from "../assets/product-images/swirl-lavender.jpg";
import TeddyBear from "../assets/product-images/teddy-bear-rose.jpg";

const UploadImage = () => {
  const imageList = [
    // {
    //   category: "Couple",
    //   image: Couple,
    //   name: "Couple.jpg",
    // },
    {
      category: "Mini Bubble",
      image: MiniBubble,
      name: "Mini_Bubble.jpg",
    },
    {
      category: "Pillar",
      image: Pillar,
      name: "pillar.jpg",
    },
    {
      category: "Shell",
      image: Shell,
      name: "shell.jpg",
    },
    {
      category: "Swirl",
      image: Swirl,
      name: "swirl.jpg",
    },
    {
      category: "Teddy Bear",
      image: TeddyBear,
      name: "teddy_bear.jpg",
    },
  ];

  const handleSubmit = () => {
    imageList.forEach(({ category, image, name }) =>
      console.log(addImageToStorage(category, image, name))
    );
  };
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent:'center', alignItems:'center'}}>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadImage;
