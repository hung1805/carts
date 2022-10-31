import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "api/axios";
import { roundedPrice } from "utils/common";
import { addCartItem, updateItemQuantity } from "features/Cart/cartSlice.js";
import { updateWishlist } from "features/Wishlist/wishlistSlice";

const Jewelery = (props) => {
  const { limit } = props;
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart.list);
  const userId = useSelector((state) => state.auth.user.id);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(
          `products/category/jewelery?${limit ? `limit=${limit}` : ""}`
        );
        setList(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    loadData();
    return () => {
      setList([]);
    };
  }, [limit]);
  const handleAddToCart = async (userId, list, item, count = 1) => {
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
      if (index < 0) {
        await dispatch(addCartItem({ userId, data }));
      } else {
        const value = parseInt(list[index].count) + parseInt(count);
        dispatch(updateItemQuantity({ userId, list, value, index }));
      }
    }
  };
  const handleAddToWishlist = (item) => {
    dispatch(updateWishlist(item));
  };
  if (error || isLoading) return null;
  return (
    <div className="container mt-10">
      <h3 className="text-2xl">Jewelery</h3>
      <div className="mt-4 overflow-hidden grid gap-8 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list?.map((item) => (
          <div key={item.id} className="shadow-md overflow-hidden bg-white p-2">
            <Link
              to={{
                pathname: `/product/${item.title}`,
              }}
              state={{
                productId: `${item.id}`,
              }}
              className=" block overflow-hidden max-h-40"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition-scale duration-700 cursor-pointer hover:scale-110"
              />
            </Link>
            <div className="p-4 text-center">
              <Link
                to={{
                  pathname: `/product/${item.id}`,
                  state: { id: item.id },
                }}
                state={{
                  productId: `${item.id}`,
                }}
                className="inline-block line-clamp-1"
              >
                {item.title}
              </Link>
              <p className="text-custom_orange">{`${item.price}$`}</p>
              <div className="mt-4 flex items-stretch justify-center">
                <button
                  className="primary-btn"
                  onClick={() => handleAddToCart(userId, cartList, item)}
                >
                  Add to Cart
                  <FontAwesomeIcon icon={faCartPlus} className="ml-2" />
                </button>
                <button className="primary-btn" onClick={() => handleAddToWishlist(item)}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jewelery;
