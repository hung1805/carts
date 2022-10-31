import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCartItem, updateItemQuantity } from "features/Cart/cartSlice";
import { removeItemInWishlist } from "features/Wishlist/wishlistSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { roundedPrice } from "utils/common";

const NavWishList = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.user.id);
  const list = useSelector((state) => state.cart.list);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddItemToCart = async (userId, list, item, count = 1) => {
    if (!userId) {
      navigate("/login");
    } else {
      const data = {
        title: item.title,
        imageURL: item.image,
        id: item.id,
        price: item.price,
        totalPrice: roundedPrice(item.price, count),
        description: item.description,
        count: parseInt(count),
      };
      const index = list.findIndex((ele) => ele.id === item.id);
      await dispatch(removeItemInWishlist(item));
      if (index < 0) {
        await dispatch(addCartItem({ userId, data }));
      } else {
        const value = parseInt(list[index].count) + parseInt(count);
        await dispatch(updateItemQuantity({ userId, list, value, index }));
      }
    }
  };
  return (
    <div className=' block group relative text-2xl cursor-pointer before:absolute before:top-full before:left-0 before:w-12 before:max-h-4 before:bg-white before:content-["a"] before:flex before:items-center before:justify-center before:text-white mr-8 lg:mr-6'>
      <FontAwesomeIcon icon={faHeart} />
      <div className="absolute w-5 max-h-5 flex items-center justify-center rounded-full -top-2 -right-3 text-sm bg-custom_orange">
        {wishlist.length === 0 ? 0 : wishlist.length}
      </div>
      <div className="hidden absolute bg-white z-10 top-full left-0 animate-growOut origin-top-left flex-row w-80 group-hover:flex">
        <>
          {wishlist.length === 0 ? (
            <div className="hidden absolute bg-white z-10 mt-4 top-full left-0 animate-growOut origin-top-left flex-row w-80 overflow-x-hidden cursor-default group-hover:flex">
              <div className="w-full flex justify-center pt-60 pb-6 bg-empty-cart bg-cover bg-center">
                <p className="text-lg font-semibold">Wishlist is empty</p>
              </div>
            </div>
          ) : (
            <div className="hidden absolute flex-col bg-white mt-4 z-10 top-full animate-growOut origin-top-left w-96 rounded group-hover:flex -left-24 md:-left-16">
              <div className="w-full overflow-y-scroll flex-col cursor-default scrollbar scrollbar-thin scrollbar-track-custom_grey scrollbar-thumb-custom_orange scrollbar-thumb-rounded-md max-h-[280px] md:max-h-[380px] xl:max-h-[490px]">
                {wishlist &&
                  wishlist.map((item) => (
                    <div
                      key={item.id}
                      className="flex px-2 py-2 bg-white border-b border-custom_grey last-of-type:border-white"
                    >
                      <div className="w-1/4 p-4 overflow-hidden">
                        <img src={item.image} alt="" className="w-full object-cover" />
                      </div>
                      <div className=" w-3/4 ml-4 text-sm">
                        <h5>{item.title}</h5>
                        <div className="flex justify-around">
                          <p>
                            Rating: {item.rating.rate} / {item.rating.count}
                          </p>
                          <p className="text-custom_orange">${item.price}</p>
                        </div>
                        <button
                          className=" secondary-btn mt-3"
                          onClick={() => handleAddItemToCart(userId, list, item, 1)}
                        >
                          Add to My Cart
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className=" flex items-center justify-center p-2 text-base">
                <Link className="block third-btn" to="/wishlist">
                  Go to My Wishlist
                </Link>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default NavWishList;
