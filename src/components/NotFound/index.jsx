import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container w-full min-h-[calc(100vh-430px)] flex flex-col justify-center items-center mt-16 -mb-16">
      <p className="text-2xl">
        <span className="text-custom_blue text-8xl ">Opp...</span> Page Not Found
      </p>
      <Link
        to="/"
        className="px-3 py-2 bg-custom_orange rounded-md shadow mt-4 text-white uppercase"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
