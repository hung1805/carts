import React from "react";
import { ToastContainer, Slide } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      className="absolute top-full right-0 xl:text-xs"
      autoClose={1500}
      transition={Slide}
      hideProgressBar="true"
      newestOnTop="true"
      toastClassName="text-black text-sm"
    />
  );
};
export default Toast;
