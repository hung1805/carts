import Footer from "components/Footer";
import Header from "components/Header";
import Spinner from "components/Spinner";
import React, { Suspense, useEffect, useState } from "react";
import Router from "Router/index.jsx";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <div>
      <Header isScrolled={isScrolled} />
      <Suspense fallback={<Spinner />}>
        <Router isScrolled={isScrolled} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
