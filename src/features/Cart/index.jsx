import {
  faAngleLeft,
  faMinus,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeItemInCart, updateCart } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart.list);
  const userId = useSelector((state) => state.auth.user.id);
  const [copiedList, setCopiedList] = useState([]);

  useEffect(() => {
    if (list) {
      setCopiedList([...list]);
    }
    return () => setCopiedList([]);
  }, [list]);

  const handleRemoveItem = async (userId, data) => {
    if (userId) {
      await dispatch(removeItemInCart({ userId, data }));
    } else return;
  };

  const handleIncreaseItem = async (index) => {
    const arr = [...copiedList];
    arr[index] = {
      ...arr[index],
      count: arr[index].count + 1,
    };
    setCopiedList(arr);
  };
  const handleDecreaseItem = async (index) => {
    const arr = [...copiedList];
    arr[index] = {
      ...arr[index],
      count: arr[index].count === 1 ? 1 : parseInt(arr[index].count - 1),
    };
    setCopiedList(arr);
  };
  const handleUpdateCart = async (userId, arr) => {
    const data = [...arr];
    await dispatch(updateCart({ userId, data }));
  };
  return (
    <div className="container py-8">
      <Link to="/" className="p-8 text-xl font-bold text-custom_red hover:underline">
        <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
        BACK TO HOME
      </Link>
      {copiedList.length === 0 ? (
        <p className="mt-8 ml-2">Your Cart is Empty</p>
      ) : (
        <div className="p-1 mt-8 bg-white">
          <table className="w-full p-4 table-auto my-table-spacing bg-white">
            <thead className="text-center bg-custom_background">
              <tr className="text-custom_orange lg:text-lg xl:text-xl">
                <th className="py-3 border border-custom_grey">STT</th>
                <th className="py-3 border border-custom_grey">Name</th>
                <th className="py-3 border border-custom_grey">Quantities</th>
                <th className="py-3 border border-custom_grey">Unit Price{`($)`}</th>
                <th className="py-3 border border-custom_grey">Total Price{`($)`}</th>
                <th className="py-3 border border-custom_grey"></th>
              </tr>
            </thead>
            <tbody className="text-center sm:text-xs md:text-base">
              {copiedList.map((item, index) => (
                <tr key={item.title}>
                  <td className="border border-custom_grey py-2 ">
                    {copiedList.indexOf(item) + 1}
                  </td>
                  <td className="border border-custom_grey text-left pl-2 py-2">
                    <span className="relative group cursor-pointer hover:text-custom_blue">
                      {item.title}
                      <div className="absolute left-full bottom-0 p-4 bg-white overflow-hidden hidden ml-4 z-10  border-custom_grey shadow-md rounded group-hover:block w-28 max-h-28 sm:w-32 sm:max-h-32 xl:w-48 xl:max-h-48 2xl:w-64 2xl:max-h-64">
                        <img
                          src={item.imageURL}
                          alt={item.imageURL}
                          className="w-full object-cover"
                        />
                      </div>
                    </span>
                  </td>
                  <td className="border border-custom_grey py-2 flex justify-center">
                    <div
                      onClick={() => handleDecreaseItem(index)}
                      className="mr-4 cursor-pointer border border-white px-1 shadow-sm hover:border-custom_grey text-custom_lightblue"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </div>
                    {item.count}
                    <div
                      className="ml-4 cursor-pointer border border-white shadow-sm px-1 hover:border-custom_grey text-custom_lightblue"
                      onClick={() => handleIncreaseItem(index)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                  </td>
                  <td className="border border-custom_grey py-2">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="border border-custom_grey py-2">
                    {(item.count * item.price).toFixed(2)}
                  </td>
                  <td className="border border-custom_grey py-2 px-4">
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-custom_red cursor-pointer"
                      onClick={() => handleRemoveItem(userId, item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="my-4">
            Your Cart has ({copiedList.length}){" "}
            {copiedList.length === 0 ? "product" : "products"}.
          </p>
          <div className="w-full flex justify-end mt-8">
            <button
              className="third-btn mr-4"
              onClick={() => handleUpdateCart(userId, copiedList)}
            >
              Update Cart
            </button>
            <Link to="/user/checkout" className=" block third-btn">
              Check Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
