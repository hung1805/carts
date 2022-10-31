import React from "react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import electronic from "assets/img/headphone.jpg";
import jewerly from "assets/img/jewerly.jpg";
import menclothes from "assets/img/men-clothes.jpg";
import sale from "assets/img/sale.jpg";
import womenclothes from "assets/img/women-clothes.jpg";

const BannerSlider = () => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  return (
    <>
      <Swiper
        loop={true}
        speed={1500}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        navigation={true}
        pagination={{ clickable: true }}
        className="relative w-full lg:w-9/12 overflow-hidden"
      >
        <SwiperSlide className="w-full overflow-hidden">
          <img src={sale} alt="" className="min-h-full w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide className="w-full overflow-hidden">
          <img src={menclothes} alt="" className="min-h-full w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={jewerly} alt="" className="min-h-full w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide className="w-full overflow-hidden">
          <img src={womenclothes} alt="" className="min-h-full w-full object-cover" />
        </SwiperSlide>
        <SwiperSlide className="w-full overflow-hidden">
          <img src={electronic} alt="" className="min-h-full w-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerSlider;
