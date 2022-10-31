import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import instance from "api/axios";
import { useDispatch } from "react-redux";
import { roundedPrice } from "utils/common";
import { addCartItem, updateItemQuantity } from "features/Cart/cartSlice";
import { updateWishlist } from "features/Wishlist/wishlistSlice";

const WomenClothing = (props) => {
  const { limit } = props;

  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const cartList = useSelector((state) => state.cart.list);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(
          `products/category/women's%20clothing?${limit ? `limit=${limit}` : ""}`
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
  if (isLoading || error) {
    return null;
  }
  return (
    <div className="container mt-10">
      <h3 className="text-2xl">Women's Clothing</h3>
      <div className="mt-4 overflow-hidden grid gap-8 grid-rows-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {list?.map((item) => (
          <div key={item.id} className="bg-white shadow-md overflow-hidden p-2">
            <Link
              to={{
                pathname: `/product/${item.title}`,
              }}
              state={{
                productId: `${item.id}`,
              }}
              className="overflow-hidden block max-h-64"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover transition-scale duration-700 cursor-pointer hover:scale-110"
              />
            </Link>
            <div className="p-4 text-center xl:p-2">
              <Link
                to={{
                  pathname: `/product/${item.title}`,
                }}
                state={{
                  productId: `${item.id}`,
                }}
                className="inline-block line-clamp-1"
              >
                {item.title}
              </Link>
              <p className="text-custom_orange">{`$${item.price}`}</p>
              <div className="mt-4 flex items-stretch justify-center">
                <button
                  className="primary-btn"
                  onClick={() => handleAddToCart(userId, cartList, item)}
                >
                  Add to Cart
                  <FontAwesomeIcon icon={faCartPlus} className="lg:ml-1 xl:ml-2" />
                </button>
                <span className="primary-btn" onClick={() => handleAddToWishlist(item)}>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenClothing;
