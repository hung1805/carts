import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeItemInCart } from "features/Cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateTotal } from "utils/common";

const NavCart = () => {
  const list = useSelector((state) => state.cart.list);
  const userId = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();
  const handleRemoveItem = async (userId, data) => {
    if (userId) {
      await dispatch(removeItemInCart({ userId, data }));
    } else return;
  };
  return (
    <div className=' block group relative text-2xl cursor-pointer before:absolute before:top-full before:left-0 before:w-16 before:max-h-4 before:bg-white before:content-["a"] before:flex before:items-center before:justify-center before:text-white'>
      <FontAwesomeIcon icon={faShoppingCart} />
      <div className="absolute w-5 max-h-5 flex items-center justify-center rounded-full -top-2 -right-3 text-sm bg-custom_orange">
        {!userId ? null : list ? list.length : 0}
      </div>
      {!userId ? (
        <div className="hidden absolute bg-white z-10 mt-4 top-full left-0 animate-growOut origin-top-left flex-row w-80 overflow-x-hidden cursor-default group-hover:flex">
          <div className="w-full flex justify-center pt-60 pb-6 bg-cart-bg bg-cover bg-center">
            <p className="text-lg font-semibold">Sign in to see your Cart!</p>
          </div>
        </div>
      ) : (
        <>
          {list.length === 0 ? (
            <div className="hidden absolute bg-white z-10 mt-4 top-full left-0 animate-growOut origin-top-left flex-row w-80 overflow-x-hidden cursor-default group-hover:flex">
              <div className="w-full flex justify-center pt-60 pb-6 bg-empty-cart bg-cover bg-center">
                <p className="text-lg font-semibold">Cart is empty</p>
              </div>
            </div>
          ) : (
            <div className="hidden absolute flex-col bg-white z-10 mt-4 top-full animate-growOut origin-top-left w-96 rounded group-hover:flex -left-36 md:-left-16">
              <div className="w-full overflow-y-scroll flex-col cursor-default scrollbar scrollbar-thin scrollbar-track-custom_grey scrollbar-thumb-custom_orange scrollbar-thumb-rounded-md max-h-[280px] md:max-h-[380px] xl:max-h-[490px]">
                {list.map((item) => (
                  <div
                    key={item.title}
                    className="flex px-2 py-2 bg-white border-b border-custom_grey last-of-type:border-white"
                  >
                    <div className="w-1/4 p-4 overflow-hidden">
                      <img src={item.imageURL} alt="" className="w-full object-cover" />
                    </div>
                    <div className=" w-3/4 ml-4 text-sm">
                      <h5>{item.title}</h5>
                      <div className="flex justify-around">
                        <p className="">Quantities: {item.count}</p>
                        <p className="text-custom_orange">${item.totalPrice}</p>
                      </div>
                      <button
                        className="secondary-btn"
                        onClick={() => handleRemoveItem(userId, item)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-base text-custom_orange flex justify-around cursor-default">
                <p className="text-black">
                  Your cart has {list.length} {list.length === 1 ? "product" : "products"}
                </p>
                <p>{`Total: $${calculateTotal(list)}`}</p>
              </div>
              <div className=" flex items-center justify-center p-2 text-base">
                <Link className="third-btn mr-4" to="/user/cart">
                  Go to Cart
                </Link>
                <Link className="third-btn" to="/user/checkout">
                  Check Out
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavCart;
