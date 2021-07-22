import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import "./Homepage.css";
import BannerImg from "../Components/files/banner.jpg";

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero type="slider" location="homepage" slideImages={[BannerImg]} />
    </div>
  );
};

export default HomePage;
