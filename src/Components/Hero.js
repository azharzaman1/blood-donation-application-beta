import React, { useState } from "react";
import ForwardArrow from "./files/forward.png";
import BackArrow from "./files/back.png";
import BannerImg from "./files/banner.jpg";
import { Button } from "@material-ui/core";
import "./Hero.css";

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([
    BannerImg,
    ForwardArrow,
    BackArrow,
  ]);

  const firstSlideIndex = 0;
  const lastSlideIndex = sliderImages.length - 1;

  function sliderImageSetter(arg) {
    if (slideIndex >= firstSlideIndex && slideIndex <= lastSlideIndex) {
      return arg[slideIndex];
    }
  }

  // Dynamic Slider Controllers(Forward)

  function increment() {
    if (slideIndex >= firstSlideIndex && slideIndex < lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex + 1);
    } else {
      setSlideIndex(firstSlideIndex);
    }
  }

  // Dynamic Slider Controllers(Backward)

  function decrement() {
    if (slideIndex > firstSlideIndex && slideIndex <= lastSlideIndex) {
      setSlideIndex((prevIndex) => prevIndex - 1);
    } else {
      setSlideIndex(lastSlideIndex);
    }
  }

  return (
    <div className="hero">
      <div className="slider flexRow">
        <Button
          onClick={decrement}
          className="slider__controller slider__controllerBack"
        >
          <img className="slider__arrows" src={BackArrow} alt="<" />
        </Button>
        <img className="slide" src={sliderImageSetter(sliderImages)} />
        <Button
          onClick={increment}
          className="slider__controller slider__controllerForw"
        >
          <img className="slider__arrows" src={ForwardArrow} alt=">" />
        </Button>
      </div>
      <div className="slider__fade"></div>
    </div>
  );
};

export default Hero;
