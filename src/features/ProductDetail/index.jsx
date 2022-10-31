import {
  faAngleRight,
  faCalendar,
  faCartPlus,
  faHandPointRight,
  faHeart,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import instance from "api/axios.js";
import Spinner from "components/Spinner";
import { roundedPrice, stringCap } from "utils/common.js";
import { addCartItem, updateItemQuantity } from "../Cart/cartSlice.js";
import ScrollTopBtn from "components/ScrollTopBtn/index.jsx";
import { updateWishlist } from "features/Wishlist/wishlistSlice.js";

const ProductDetail = (props) => {
  const { isScrolled } = props;
  const location = useLocation();
  const id = location.state.productId;

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [relativeProducts, setRelativeProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const list = useSelector((state) => state.cart.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    loadData();
    return () => {
      setProduct(null);
      setCount(1);
    };
  }, [id]);
  useEffect(() => {
    const loadRelative = async (category) => {
      try {
        const { data } = await instance.get(`/products/category/${category}`);
        setRelativeProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadRelative(product?.category);
    return () => setRelativeProducts([]);
  }, [product]);
  useEffect(() => {
    const loadCategory = async () => {
      try {
        const { data } = await instance.get("/products/categories");
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
    return () => setCategory([]);
  }, [product]);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await instance.get("/products?limit=6");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadProducts();
    return () => setProducts([]);
  }, []);

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
  return isLoading ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div>
      <ScrollTopBtn isScrolled={isScrolled} />
      <div className="container bg-custom_background mt-10">
        {product ? (
          <div className="flex sm:flex-col md:flex-row">
            <div className="bg-white w-full md:w-2/3 p-8">
              <h4 className="w-full my-4 text-xs flex text-ellipsis truncate overflow-hidden">
                <Link to="/" className="flex hover:text-custom_orange">
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  ShoppingCart
                  <p>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mx-1"
                      color="#adadad"
                    />
                  </p>
                </Link>
                <Link to="/product" className="hover:text-custom_orange">
                  <p>
                    Products
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mx-1"
                      color="#adadad"
                    />
                  </p>
                </Link>
                <Link to="/" className="hover:text-custom_orange">
                  <p>
                    {stringCap(product.category)}
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="mx-1"
                      color="#adadad"
                    />
                  </p>
                </Link>
                <p>{product.title}</p>
              </h4>
              <div className="flex mt-8 pb-10 border-b-2 border-custom_grey">
                <div className="w-96 max-w-96">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-cover"
                  />
                </div>
                <div className="ml-6 mr-4">
                  <h3 className="text-2xl">{product.title}</h3>
                  <p className="text-base mt-2">
                    Category: {stringCap(product.category)}
                  </p>
                  <p className="mt-2">
                    Rating: {product.rating.rate} / {product.rating.count} votes
                  </p>
                  <p className="text-custom_orange mt-2">
                    <span className="text-black">Price:</span> ${product.price}
                  </p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      name="number"
                      id="number"
                      max="100"
                      min="1"
                      value={count}
                      onChange={(e) => setCount(e.target.value)}
                      className="border rounded-md border-custom_grey mr-4 pl-2 focus:border-black"
                    />
                    <p className="text-custom_orange">
                      <span className="text-black">Total:</span> $
                      {roundedPrice(product.price, count)}
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      className="secondary-btn"
                      onClick={() => handleAddToCart(userId, list, product, count)}
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
                      Add to Cart
                    </button>
                    <button
                      className="secondary-btn lg:ml-3"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <FontAwesomeIcon icon={faHeart} className="mr-2" />
                      Add to Favorite
                    </button>
                  </div>
                </div>
              </div>
              <h5 className="my-6 text-2xl">Description</h5>
              <p>{product.description}</p>
              <h5 className=" my-10 text-2xl">Relative Products</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-4">
                {relativeProducts?.map((item) => {
                  if (item.id === product.id) return null;
                  else
                    return (
                      <div
                        key={item.id}
                        className="bg-white border-t border-custom_background shadow-md overflow-hidden p-2"
                      >
                        <Link
                          to={{
                            pathname: `/product/${item.title}`,
                          }}
                          state={{
                            productId: `${item.id}`,
                          }}
                          className="overflow-hidden block max-h-44"
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
                          <div className="mt-4">
                            <button
                              className="primary-btn xl:text-sm w-full"
                              onClick={() => {
                                handleAddToCart(userId, list, item, 1);
                              }}
                            >
                              Add to Cart
                              <FontAwesomeIcon icon={faCartPlus} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>
            <div className="w-full md:w-1/3 md:ml-6 lg:ml-10">
              <div className="w-full bg-white pt-10">
                <div className="text-center font-medium mx-10 py-2 uppercase border border-custom_grey bg-custom_background">
                  Product Categories
                </div>
                <div className="w-full flex flex-col">
                  <ul className="mx-10 my-6 ">
                    {category?.map((item) => {
                      return (
                        <li
                          key={item}
                          className={`py-2 pl-2 border-b border-custom_grey flex items-center hover:text-black cursor-pointer ${
                            item === product.category
                              ? "text-custom_orange"
                              : "text-custom_grey"
                          }`}
                        >
                          <span className="text-xs flex items-center mr-4">
                            <FontAwesomeIcon icon={faHandPointRight} />
                          </span>
                          {stringCap(item)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="bg-white mt-10 pt-10 pb-2">
                <div className="text-center font-medium mx-10 py-2 uppercase border border-custom_grey bg-custom_background">
                  Products
                </div>
                <div className="mx-10 my-6">
                  <ul className="flex flex-col">
                    {products?.map((item) => {
                      if (item.id === product.id) return null;
                      else
                        return (
                          <Link
                            key={item.id}
                            to={{ pathname: `/product/${item.title}` }}
                            state={{ productId: item.id }}
                            className="max-h-28 flex mb-4 p-2 border border-white hover:border-custom_grey"
                          >
                            <div className=" w-1/4 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full object-cover"
                              />
                            </div>
                            <div className="w-2/3 pl-10">
                              <h5 className="inline-block mt-2 line-clamp-1">
                                {item.title}
                              </h5>
                              <p className="text-custom_orange">${item.price}</p>
                            </div>
                          </Link>
                        );
                    })}
                  </ul>
                </div>
              </div>
              <div className="bg-white mt-10 pt-10 pb-2">
                <div className="text-center font-medium mx-10 py-2 uppercase border border-custom_grey bg-custom_background">
                  Products Tag
                </div>
                <div className="mx-10 mt-6 flex flex-wrap gap-2">
                  <div className="border border-custom_grey text-custom_orange px-3 py-1 text-sm cursor-pointer">
                    #LoremIspum
                  </div>
                  <div className="border border-custom_grey text-custom_orange px-3 py-1 text-sm cursor-pointer">
                    #Product
                  </div>
                  <div className="border border-custom_grey text-custom_orange px-3 py-1 text-sm cursor-pointer">
                    #Sale
                  </div>
                  <div className="border border-custom_grey text-custom_orange px-3 py-1 text-sm cursor-pointer">
                    #Fashion
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <FontAwesomeIcon icon={faCalendar} />
            No products were found matching your selection.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
