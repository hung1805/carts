import React from "react";
import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <div className='absolute top-0 l-0 w-full min-h-full  bg-custom_background flex items-center justify-center'>
      <Loader
        type='MutatingDots'
        color='#4F46E5'
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};

export default Spinner;
