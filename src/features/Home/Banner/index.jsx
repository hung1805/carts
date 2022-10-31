import React from "react";
import sale from "assets/img/banner-image1.jpg";
import Sidebar from "../Sidebar";
import BannerLink from "./BannerLink";
import BannerSlider from "./BannerSlider";

const Banner = () => {
  return (
    <div className="container mt-10 overflow-hidden">
      <img src={sale} alt="banner-sale" className="w-full object-cover mb-10" />
      <div className="py-8 flex md:max-h-96 bg-white ">
        <Sidebar />
        <div className="flex overflow-hidden sm:w-full sm:flex-col md:w-2/3 lg:w-3/4 lg:flex-row">
          <BannerSlider />
          <BannerLink />
        </div>
      </div>
    </div>
  );
};

export default Banner;
