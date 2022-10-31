import { faBars, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden md:block md:w-1/3 lg:w-1/4 pr-8 text-2xl">
      <FontAwesomeIcon
        icon={faBars}
        className="md:text-base lg:text-xl mx-4 text-custom_grey"
      />
      Products
      <ul className="md:text-sm lg:text-xs xl:text-sm">
        <li className="text-custom_orange py-2 ml-4 pr-4 border-b border-custom_grey">
          <Link
            to="products/deals"
            className="text-black hover:text-custom_orange flex justify-between items-center"
          >
            <div>
              Deals of the Day
              <span className="bg-custom_orange ml-4 inline-block px-2 text-white uppercase">
                Hot
              </span>
            </div>
          </Link>
        </li>
        <li className=" py-2 ml-4 pr-4 border-b border-custom_grey relative group">
          <div className="hover:text-custom_orange flex justify-between items-center ">
            Home & Lifestyle
            <span className="bg-custom_orange ml-3  px-2 text-white uppercase">New</span>
            <span className="text-xs font-light">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <ul className="hidden absolute top-0 left-full w-full z-20 py-2 px-4 bg-white text-black hover:text-custom_orange items-center justify-between shadow-md group-hover:flex">
            <li className="w-full cursor-pointer">
              <Link to="/products/raw-oak-shelf">Raw Oak Shelf</Link>
            </li>
          </ul>
        </li>
        <li className="cursor-pointer text-custom_orange py-2 pr-4 ml-4 border-b border-custom_grey relative group-scope ">
          <div className="text-black hover:text-custom_orange flex justify-between items-center ">
            Women's Fashion
            <span className="text-xs font-light">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <ul className="hidden absolute top-0 left-full w-full z-20 pl-4 bg-white text-black flex-col items-center justify-between shadow-md group-scope-hover:flex">
            <li className="text-black border-b border-custom_grey w-full flex justify-between cursor-pointer py-2 group-scope hover:text-custom_orange">
              Bags
              <span className="text-xs ml-24 pr-4 font-light ">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <ul className="hidden absolute top-0 left-full w-full z-20 pl-4 bg-white text-black flex-col justify-between shadow-md group-scope-hover:flex">
                <li className="py-2 hover:text-custom_orange">
                  <Link to="/products/purse">Golden party Purse</Link>
                </li>
              </ul>
            </li>
            <li className="text-black w-full flex justify-between items-center cursor-pointer py-2  hover:text-custom_orange group-scope">
              Dresses
              <span className="text-xs font-light pr-4">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <ul className="hidden absolute top-1/2 left-full w-full z-20 pl-4 bg-white text-black flex-col  justify-between shadow-md  group-scope-hover:flex">
                <li className="py-2 hover:text-custom_orange border-b border-custom_grey">
                  <Link to="/products/purse">V-neck Blouse</Link>
                </li>
                <li className="py-2 hover:text-custom_orange border-b border-custom_grey">
                  <Link to="/products/purse">High rise Shorts</Link>
                </li>
                <li className="py-2 hover:text-custom_orange">
                  <Link to="/products/purse">Puffy Sleeves</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="text-black py-2 ml-4 pr-4 border-b border-custom_grey cursor-pointer relative group-scope">
          <div className="hover:text-custom_orange flex justify-between items-center ">
            Men's Fashion
            <span className="text-xs font-light">
              <FontAwesomeIcon icon={faChevronRight} />
            </span>
          </div>
          <ul className="hidden absolute top-0 left-full w-full z-20 py-2 px-4 bg-white text-black hover:text-custom_orange items-center justify-between shadow-md group-scope-hover:flex">
            <li className="w-full cursor-pointer">
              <Link to="/products/vests">Vests</Link>
            </li>
          </ul>
        </li>
        <li className="text-custom_orange py-2 ml-4 pr-4  border-b border-custom_grey cursor-pointer">
          <Link
            to="/products/electronics"
            className="text-black hover:text-custom_orange flex justify-between items-center"
          >
            Electronics
          </Link>
        </li>
        <li className="text-custom_orange py-2 ml-4 pr-4 border-b border-custom_grey cursor-pointer">
          <Link
            to="products/jewerly"
            className="text-black hover:text-custom_orange flex justify-between items-center"
          >
            Jewelery
          </Link>
        </li>
        <li className="text-custom_orange py-2 ml-4 pr-4 border-b border-custom_grey cursor-pointer">
          <Link
            to="products/watches"
            className="text-black hover:text-custom_orange flex justify-between items-center"
          >
            Watches & Accessories
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
