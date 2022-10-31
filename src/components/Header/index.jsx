import {
  faDribbble,
  faFacebookF,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTwitter,
  faWeibo,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faMapMarkerAlt,
  faPhoneSquareAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserCart, getUserData } from "configs/firebase";
import { logout, updateUserData } from "features/Auth/authSlice";
import { clearCartWhenSignOut, initializeUserCart } from "features/Cart/cartSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NavCart from "./NavCart";
import NavWishList from "./NavWishList";
import Search from "./Search";
import Toast from "./Toast";

const Header = (props) => {
  const { isScrolled } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user.role);
  const avatar = useSelector((state) => state.auth.user.photoURL);
  const userName = useSelector((state) => state.auth.user.name);
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const loadUserData = async () => {
      if (userId) {
        const data = await getUserData(userId);
        await dispatch(updateUserData(data));
      }
    };
    loadUserData();
  }, [userId, dispatch]);
  useEffect(() => {
    const loadUserCart = async () => {
      if (userId) {
        const data = await getUserCart(userId);
        await dispatch(initializeUserCart(data));
      }
    };
    loadUserCart();
  }, [userId, dispatch]);

  const handleSignOut = async () => {
    await dispatch(logout());
    await dispatch(clearCartWhenSignOut());
    navigate("/");
  };

  return (
    <header
      className={`${
        isScrolled ? "fixed z-30" : ""
      } bg-white top-0 inset-x-0 border-custom_grey`}
    >
      <div
        className={`hidden container flex-col items-center lg:flex-row  sm:flex md:justify-between md:items-center ${
          isScrolled && "sm:hidden"
        }`}
      >
        <div className="py-3 flex flex-row text-sm md:text-xs lg:py-1">
          <div className="mr-3 lg:mr-6">
            <FontAwesomeIcon icon={faMapMarkerAlt} color="#4f46e5" />
            <span className="ml-1">123 Truong Chinh, Da Nang, Viet Nam</span>
          </div>
          <div className="mr-3 lg:mr-6">
            <FontAwesomeIcon icon={faEnvelope} color="#4F46E5" />
            <span className="ml-1">abc@gmail.com</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faPhoneSquareAlt} color="#4F46E5" />
            <span className="ml-1">0123456789</span>
          </div>
        </div>
        <div className=" py-3 lg:py-1">
          <ul className="flex flex-row text-xs lg:text-base">
            <li className="mr-8 hover:text-custom_blue">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faFacebookF} className="btn-search" />
              </a>
            </li>
            <li className="mr-8 hover:text-custom_pink">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="mr-8 hover:text-custom_lightblue">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="mr-8 hover:text-custom_red">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
            </li>
            <li className="mr-8 hover:text-custom_blue">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li className="mr-8 hover:text-custom_yellow">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faWeibo} />
              </a>
            </li>
            <li className="hover:text-custom_red">
              <a href="https://facebook.com">
                <FontAwesomeIcon icon={faDribbble} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <nav
        className={`${
          isScrolled ? "md:pt-1 lg:pt-4" : "pt-6"
        } container pb-4 justify-between relative flex flex-col items-center xl:flex-row xl:items-end`}
      >
        <Link to="/" className="logo">
          <span
            className={`font-bold font-poppins text-custom_orange text-3xl md:text-4xl xl:text-5xl ${
              isScrolled && "hidden"
            } xl:block`}
          >
            ShoppingCart
          </span>
        </Link>
        <Toast />
        <div className="mt-4 flex">
          <div className="flex items-end">
            <Search />
            <div className="flex mx-12 lg:mx-8">
              <>
                <NavWishList />
                <NavCart />
              </>
            </div>
          </div>
          <div className="flex items-end md:text-base lg:text-lg xl:text-xl">
            {userId ? (
              <>
                <Link
                  to="/user/profile"
                  className={`${avatar ? "inline-flex items-end" : ""}`}
                >
                  {avatar ? (
                    <div className="w-8 max-h-8 overflow-hidden">
                      <img src={avatar} alt="avatar" className="w-full object-cover" />
                    </div>
                  ) : (
                    <FontAwesomeIcon icon={faUser} />
                  )}
                  <span className="ml-1">{userName}</span>
                </Link>
                {role === "admin" ? (
                  <Link className="ml-4 lg:ml-2" to="/dashboard">
                    Dashboard
                  </Link>
                ) : null}
                <div className="cursor-pointer ml-4 lg:ml-2" onClick={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span className="ml-1">Log Out</span>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <FontAwesomeIcon icon={faLock} />
                  <span className="ml-1">Sign In</span>
                </Link>
                <Link to="/register" className="ml-4">
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span className="ml-1">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
