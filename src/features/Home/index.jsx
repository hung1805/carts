import React, { useEffect } from "react";
import ScrollTopBtn from "components/ScrollTopBtn";
import Banner from "./Banner";
import Brands from "./Brands";
import Electronics from "components/Electronics/index";
import Jewelery from "components/Jewelery/index";
import MenClothing from "components/MenClothing/index";
import ProductTypes from "./ProductTypes";
import WomenClothing from "components/WomenClothing/index";

const Home = (props) => {
  const { isScrolled } = props;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Banner />
      <ProductTypes />
      <WomenClothing limit={5} />
      <Jewelery limit={4} />
      <MenClothing limit={4} />
      <Electronics limit={5} />
      <Brands />
      <ScrollTopBtn isScrolled={isScrolled} />
    </>
  );
};

export default Home;
