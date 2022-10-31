import Electronics from "components/Electronics";
import Jewelery from "components/Jewelery";
import MenClothing from "components/MenClothing";
import WomenClothing from "components/WomenClothing";
import { useLocation } from "react-router-dom";
import NotFound from "../NotFound";

const Products = () => {
  const { pathname } = useLocation();
  const category = pathname.slice(10).replace("%20", " ");
  switch (category) {
    case "men's clothing":
      return <MenClothing />;
    case "women's clothing":
      return <WomenClothing />;
    case "electronics":
      return <Electronics />;
    case "jewelery":
      return <Jewelery />;
    default:
      return <NotFound />;
  }
};

export default Products;
