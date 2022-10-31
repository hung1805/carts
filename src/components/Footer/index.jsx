import {
  faCcAmazonPay,
  faCcApplePay,
  faCcDiscover,
  faCcMastercard,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faSkype,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import appstore from "assets/img/appstore.png";
import ggplay from "assets/img/ggplay.png";

const Footer = () => {
  return (
    <div className="mt-16 border-custom_grey bg-white container">
      <div className="w-full px-6 pt-10 gap-x-6 grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 md:pl-0">
        <div className="md:ml-4 col-span-1 row-span-1">
          <span className="text-3xl xl:text-4xl italic font-bold text-custom_orange block mb-4">
            ShoppingCart
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quam rerum vel,
            commodi nesciunt sunt fugit velit tempora recusandae eaque.
          </p>
        </div>
        <div className="col-span-1 row-span-1 text-black md:ml-4 lg:ml-6 xl:ml-12">
          <span className="text-xl font-semibold xl:text-2xl">
            We accept Payment Methods
          </span>
          <div className="flex flex-wrap mt-4 xl:mt-8">
            <FontAwesomeIcon
              icon={faCcPaypal}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcAmazonPay}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcMastercard}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcApplePay}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcDiscover}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcStripe}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
            <FontAwesomeIcon
              icon={faCcVisa}
              size="3x"
              className="mr-2 cursor-pointer text-custom_grey hover:text-custom_orange"
            />
          </div>
        </div>
        <div className="col-span-1 row-span-1 flex flex-col mt-2 md:ml-4 lg:pl-6">
          <span className="text-xl font-semibold xl:text-2xl">Shop Location</span>
          <span className=" hover:text-custom_orange cursor-pointer md:mt-4 lg:mt-2">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-custom_blue mr-2" />
            123 Truong Chinh, Da Nang, Vn
          </span>
          <span className=" hover:text-custom_orange cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} className="text-custom_blue mr-2" />
            abc@gmail.com
          </span>
          <span className="hover:text-custom_orange cursor-pointer">
            <FontAwesomeIcon icon={faPhoneSquare} className="text-custom_blue mr-2" />
            0123456789
          </span>
          <span className=" hover:text-custom_orange cursor-pointer">
            <FontAwesomeIcon icon={faSkype} className="text-custom_blue mr-2" />
            shoppingcart
          </span>
        </div>
        <div className="col-span-1 row-span-1">
          <span className="text-xl font-semibold block py-2 xl:text-2xl">
            Download App Via
          </span>

          <div className="flex items-center justify-around">
            <a href="https://www.apple.com/app-store/">
              <img
                src={appstore}
                alt="app store"
                className="max-h-12 md:mt-12 lg:mt-8 xl:mt-6"
              />
            </a>
            <a href="https://play.google.com/store?utm_source=apac_med&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-vn-1003227-Med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7cONSEM_kwid_43700064211720884_creativeid_525822890288_device_c&gclid=Cj0KCQiAqbyNBhC2ARIsALDwAsBprKNUSTnTLtrg1U6BqMkX1gYZtPR9Zz7WL3uXfy3K_x6kpCcwfMEaAjLjEALw_wcB&gclsrc=aw.ds">
              <img src={ggplay} alt="gg play" className="max-h-16 ml-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
