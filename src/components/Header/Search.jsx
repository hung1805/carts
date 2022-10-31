import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const Search = () => {
  const [text, setText] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = { product: text };
    setText("");
    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params).toString()}`,
    });
  };
  return (
    <div>
      <div>
        <button
          className="third-btn md:hidden"
          onClick={() => setShowSearchInput(!showSearchInput)}
        >
          <FontAwesomeIcon icon={faSearch} color="#fff" />
        </button>
        {showSearchInput && (
          <form
            onSubmit={(e) => {
              setShowSearchInput(false);
              handleSearch(e);
            }}
            className="absolute top-full left-0 w-full flex items-center justify-center z-40 bg-white md:hidden"
          >
            <input
              placeholder="Search product..."
              className="w-80 my-2 px-4 py-2 border border-custom_grey outline-none"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="third-btn py-[9px] rounded-none">
              Search
            </button>
          </form>
        )}
      </div>
      <div className="hidden md:block">
        <form className="relative inline-block" onSubmit={(e) => handleSearch(e)}>
          <input
            type="text"
            className="pl-2 py-2 border-2 outline-none border-custom_orange sm:pr-2 sm:w-40 md:pr-8 lg:w-64 xl:w-80 2xl:w-96"
            placeholder="Search products in lowercase..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="inline-block py-2 border-2 border-l-0 border-custom_orange bg-custom_orange sm:px-4 md:px-6 2xl:px-8"
          >
            <FontAwesomeIcon icon={faSearch} color="#fff" />
          </button>
          <div
            className={`sm:hidden absolute lg:right-16 xl:right-20 2xl:right-24 bottom-2 cursor-pointer hover:text-custom_red ${
              text ? "md:block" : "hidden"
            } `}
            onClick={() => setText("")}
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
