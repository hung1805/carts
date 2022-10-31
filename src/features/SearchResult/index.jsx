import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import instance from "api/axios";
import Spinner from "components/Spinner";
import { addCartItem, updateItemQuantity } from "features/Cart/cartSlice";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { roundedPrice } from "utils/common";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const query = search.substring(9);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const cartList = useSelector((state) => state.cart.list);

  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const { data } = await instance.get("/products");
      const result = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(result);
      setIsLoading(false);
    };
    loadData();
    return () => {
      setIsLoading(false);
      setResults([]);
    };
  }, [query]);

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

  const handleAddToFavorite = () => {
    if (!userId) {
      navigate("/login");
    } else {
      return;
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mt-10">
          {results.length === 0 ? (
            <h3 className="text-3xl text-custom_red font-semibold">
              Sorry...No result for "{query}"
            </h3>
          ) : (
            <>
              <h3 className="text-2xl mb-6 ml-4">Results for "{query}":</h3>
              <div
                className={`px-4 py-10 bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 xl:gap-4`}
              >
                {results?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white shadow-md overflow-hidden p-2 border-t border-custom_background"
                  >
                    <Link
                      to={{
                        pathname: `/product/${item.title}`,
                      }}
                      state={{
                        productId: `${item.id}`,
                      }}
                      className="block overflow-hidden max-h-64"
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
                          pathname: `/product/${item.id}`,
                        }}
                        state={{
                          productId: `${item.id}`,
                        }}
                        className="inline-block line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <p className="text-custom_orange">{`${item.price}$`}</p>
                      <div className="mt-4">
                        <button
                          onClick={() => handleAddToCart(userId, cartList, item)}
                          className="primary-btn"
                        >
                          Add to Cart
                          <FontAwesomeIcon icon={faCartPlus} className="ml-2" />
                        </button>
                        <button className="primary-btn" onClick={handleAddToFavorite}>
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;
