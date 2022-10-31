import React from "react";
import brand1 from "assets/img/client-logos-1.png";
import brand2 from "assets/img/client-logos-2.png";
import brand3 from "assets/img/client-logos-3.png";
import brand4 from "assets/img/client-logos-4.png";
import brand5 from "assets/img/client-logos-5.png";
import brand6 from "assets/img/client-logos-6.png";
import brand7 from "assets/img/client-logos-7.png";
import brand8 from "assets/img/client-logos-8.png";
import SwiperCore, { Autoplay, Navigation, Lazy } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
const Brands = () => {
  SwiperCore.use([Navigation, Autoplay, Lazy]);
  const breakpoints = {
    468: {
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 3,
      slidesPerGroup: 2,
    },
    999: {
      slidesPerView: 4,
    },
    1206: {
      slidesPerView: 5,
    },
    1700: {
      slidesPerView: 6,
    },
  };
  return (
    <div className="container mt-16 overflow-hidden">
      <Swiper
        module={[Navigation, Autoplay, Lazy]}
        loop={true}
        speed={1500}
        lazy={true}
        spaceBetween={30}
        breakpoints={breakpoints}
        autoplay={{ delay: 3000 }}
        navigation={true}
        className=" w-full py-8"
      >
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand1} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand2} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand3} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand4} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand5} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="overflow-hidden">
            <img src={brand6} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={brand7} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={brand8} alt="brand-logo" className="cursor-pointer" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Brands;
