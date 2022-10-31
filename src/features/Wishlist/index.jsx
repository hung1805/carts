import { faAngleLeft, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCartItem, updateItemQuantity } from "features/Cart/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { roundedPrice } from "utils/common";
import { removeItemInWishlist } from "./wishlistSlice";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const userId = useSelector((state) => state.auth.user.id);
  const list = useSelector((state) => state.cart.list);
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
  const handleRemoveItemFromWishlist = async (item) => {
    await dispatch(removeItemInWishlist(item));
  };
  return (
    <div className="container py-8">
      <Link to="/" className="ml-6 text-xl font-bold text-custom_red hover:underline">
        <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
        BACK TO HOME
      </Link>
      {wishlist.length === 0 ? (
        <p className="mt-8 ml-2">Your Wishlist is Empty</p>
      ) : (
        <div className="mt-8 p-8 bg-white">
          <table className="w-full p-4 table-auto my-table-spacing bg-white">
            <thead className="text-center bg-custom_background">
              <tr className="text-custom_orange sm:text-base lg:text-lg xl:text-xl">
                <th className="py-3 border border-custom_grey">STT</th>
                <th className="py-3 border border-custom_grey">Name</th>
                <th className="py-3 border border-custom_grey">Unit Price{`($)`}</th>
                <th className="py-3 border border-custom_grey">Add to Cart</th>
                <th className="py-3 border border-custom_grey">Remove</th>
              </tr>
            </thead>
            <tbody className="text-center sm:text-xs md:text-base">
              {wishlist.map((item) => (
                <tr key={item.title}>
                  <td className="border border-custom_grey py-2 ">
                    {wishlist.indexOf(item) + 1}
                  </td>
                  <td className="border border-custom_grey text-left pl-2 py-2">
                    <span className="relative group cursor-pointer hover:text-custom_blue">
                      {item.title}
                      <div className="absolute left-full bottom-0 bg-white overflow-hidden hidden ml-4 z-10  border-custom_grey shadow-md rounded group-hover:block w-28 max-h-28 sm:w-32 sm:max-h-32 xl:w-48 xl:max-h-48 2xl:w-64 2xl:max-h-64 p-4">
                        <img
                          src={item.image}
                          alt={item.image}
                          className="w-full object-cover"
                        />
                      </div>
                    </span>
                  </td>
                  <td className="border border-custom_grey py-2">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="border border-custom_grey py-2 px-4">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-custom_red cursor-pointer"
                      onClick={() => handleAddItemToCart(userId, list, item, 1)}
                    />
                  </td>
                  <td className="border border-custom_grey py-2 px-4">
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="text-custom_red cursor-pointer"
                      onClick={() => handleRemoveItemFromWishlist(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="my-4">
            Your Wishlist has ({wishlist.length}){" "}
            {wishlist.length === 0 ? "product" : "products"}.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
