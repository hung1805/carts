import React from "react";
import womenshopping from "assets/img/women-shopping.jpg";
import menshopping from "assets/img/men-shopping.jpg";
import jewerlyshopping from "assets/img/jewerly-shopping.jpg";
import { Link } from "react-router-dom";
const BannerLink = () => {
  return (
    <div className="gap-6 mt-6 w-full flex-row items-stretch hidden lg:w-4/12 lg:ml-8 lg:mt-0 lg:grid lg:grid-rows-3 lg:grid-cols-1 lg:gap-4">
      <Link
        to="/products/men's clothing"
        className="lg:overflow-hidden lg:col-span-1 lg:row-span-1"
      >
        <img src={menshopping} alt="" className="sm:min-h-full object-cover" />
      </Link>
      <Link
        to="/products/women's clothing"
        className="lg:overflow-hidden lg:col-span-1 lg:row-span-1"
      >
        <img
          src={womenshopping}
          alt=""
          className="sm:min-h-full lg:w-full object-cover"
        />
      </Link>
      <Link
        to="/products/jewelery"
        className="lg:overflow-hidden lg:col-span-1 lg:row-span-1"
      >
        <img
          src={jewerlyshopping}
          alt=""
          className="sm:min-h-full lg:w-full object-cover"
        />
      </Link>
    </div>
  );
};

export default BannerLink;
// md:hidden lg:grid-cols-1 lg:grid-rows-3 gap-4 lg:ml-8 lg:mr-4 lg:block lg:w-4/12
// md:col-span-1 md:row-span-1
// md:col-span-1 md:row-span-1
