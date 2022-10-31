import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeItemInCart } from "features/Cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateTotal } from "utils/common";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const list = useSelector((state) => state.cart.list);
  const handleRemoveItem = async (userId, data) => {
    if (userId) {
      await dispatch(removeItemInCart({ userId, data }));
    } else return;
  };
  return (
    <div className="p-8 md:w-full lg:w-2/5">
      <div className="mb-6">
        <h3 className="text-2xl font-medium inline-flex">
          <div className="w-8 max-h-12 mr-2 bg-custom_lightblue flex items-center justify-center rounded-full">
            *
          </div>
          Order Summary
        </h3>
      </div>
      {!list || list.length === 0 ? (
        <p>
          No products.{" "}
          <Link to="/" className="text-custom_blue hover:underline">
            Let's shopping
          </Link>
        </p>
      ) : (
        <>
          <div className="border-custom_grey border">
            {list?.map((item) => (
              <div
                key={item.title}
                className="max-h-28 flex p-3 border-b border-custom_grey last-of-type:border-0 relative"
              >
                <div className=" w-1/4 overflow-hidden">
                  <img
                    src={item.imageURL}
                    alt={item.title}
                    className="w-full object-cover"
                  />
                </div>
                <div className="w-2/3 pl-10">
                  <h5 className="inline-block mt-2 line-clamp-1">{item.title}</h5>
                  <p className="text-xs mt-1">Quantity: {item.count}</p>
                  <p className="text-custom_orange text-xs mt-1">Total: ${item.price}</p>
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="absolute top-2 right-4 block cursor-pointer hover:text-custom_red"
                  onClick={() => handleRemoveItem(userId, item)}
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="border-b border-custom_grey py-2 pl-4 font-medium text-xl">
              SubTotal: ${calculateTotal(list)}
            </p>
            <p className="border-b border-custom_grey py-2 pl-4 font-medium text-xl">
              Shipping Tax: $10
            </p>
            <p className="border-b border-custom_grey py-2 pl-4 font-medium text-xl">
              Total: ${(parseFloat(calculateTotal(list)) + 10).toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummary;
