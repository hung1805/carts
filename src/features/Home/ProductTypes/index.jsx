import React from "react";
import { Link } from "react-router-dom";
import furniture from "../../../assets/img/furniture.jpg";
import glasses from "../../../assets/img/glasses.jpg";
import shoes from "../../../assets/img/shoes.jpg";
import sports from "../../../assets/img/sport.jpg";
import watches from "../../../assets/img/watches.jpg";

const ProductTypes = () => {
  return (
    <div className="container mt-10 grid grid-rows-1 gap-8 overflow-hidden grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:text-lg xl:text-xl">
      <Link to="category/sports" className="relative group overflow-hidden group">
        <div className="absolute bottom-0 left-0 w-full h-full pl-4 uppercase flex flex-col justify-center overflow-hidden transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <h4 className="font-medium mb-1">Sports</h4>
          <p className="lg:text-xs text-base tracking-wide mb-1">
            Get 10% off your order
          </p>
          <span className="lg:text-xs text-base capitalize text-custom_orange mb-1 transition-all duration-1000 opacity-0 group-hover:opacity-100">
            1 Products
          </span>
        </div>
        <img src={sports} className="object-cover" alt="sports" />
      </Link>
      <Link to="category/shoes" className="relative group">
        <div className="absolute bottom-0 left-0 w-full h-full pl-4 uppercase flex flex-col justify-center overflow-hidden transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <h4 className="font-medium mb-1">Shoes</h4>
          <p className="lg:text-xs text-base tracking-wide mb-1">
            Casual, stylish and trendy
          </p>
          <span className="lg:text-xs text-base capitalize text-custom_orange mb-1 transition-all duration-1000 opacity-0 group-hover:opacity-100">
            5 Products
          </span>
        </div>
        <img src={shoes} className="object-cover" alt="shoes" />
      </Link>
      <Link to="category/furniture" className="relative group">
        <div className="absolute bottom-0 left-0 w-full h-full pl-4 uppercase flex flex-col justify-center overflow-hidden transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <h4 className="font-medium mb-1">Furniture</h4>
          <p className="lg:text-xs text-base tracking-wide mb-1">Free delivery in town</p>
          <span className="lg:text-xs text-base capitalize text-custom_orange mb-1 transition-all duration-1000 opacity-0 group-hover:opacity-100">
            4 Products
          </span>
        </div>
        <img src={furniture} className="object-cover" alt="furniture" />
      </Link>
      <Link to="category/watches" className="relative group">
        <div className="absolute bottom-0 left-0 w-full h-full pl-4 uppercase flex flex-col justify-center overflow-hidden transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <h4 className="font-medium mb-1">Watches</h4>
          <p className="lg:text-xs text-base tracking-wide mb-1">
            Source for luxury watches
          </p>
          <span className="lg:text-xs text-base capitalize text-custom_orange mb-1 transition-all duration-1000 opacity-0 group-hover:opacity-100">
            2 Products
          </span>
        </div>
        <img src={watches} className="object-cover" alt="watches" />
      </Link>
      <Link to="category/glasses" className="relative group ">
        <div className="absolute bottom-0 left-0 w-full h-full pl-4 uppercase flex flex-col justify-center overflow-hidden transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
          <h4 className="font-medium mb-1">Glasses</h4>
          <p className="lg:text-xs text-base tracking-wide mb-1">
            Fashion glasses frames
          </p>
          <span className="lg:text-xs text-base capitalize text-custom_orange mb-1 transition-all duration-1000 opacity-0 group-hover:opacity-100">
            10 Products
          </span>
        </div>
        <img src={glasses} className="object-cover" alt="glasses" />
      </Link>
    </div>
  );
};

export default ProductTypes;
