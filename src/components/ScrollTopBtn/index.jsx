import { faAngleDoubleUp, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ScrollTopBtn = (props) => {
  const { isScrolled } = props;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`${
        isScrolled ? "fixed hidden md:flex md:right-6" : "hidden"
      } bottom-11 right-11 flex-col items-center justify-center group rounded-sm cursor-pointer bg-custom_orange overflow-hidden `}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon
        icon={faAngleUp}
        size="1x"
        color="white"
        className="m-4 transition-all duration-700 opacity-100 transform translate-y-0 group-hover:-translate-y-full  group-hover:opacity-0"
      />
      <FontAwesomeIcon
        icon={faAngleDoubleUp}
        size="1x"
        color="white"
        className="absolute top-0 left-0 m-4 transition-all duration-700 opacity-0 transform translate-y-full group-hover:translate-y-0  group-hover:opacity-100"
      />
    </div>
  );
};

export default ScrollTopBtn;
