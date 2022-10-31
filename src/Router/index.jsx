import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("features/Home"));
const Register = React.lazy(() => import("features/Auth/register"));
const Products = React.lazy(() => import("components/Products"));
const ProductDetail = React.lazy(() => import("features/ProductDetail"));
const Login = React.lazy(() => import("features/Auth/login"));
const Cart = React.lazy(() => import("features/Cart"));
const UserProfile = React.lazy(() => import("features/user/UserProfile"));
const Dashboard = React.lazy(() => import("features/admin/Dashboard"));
const AdminProfile = React.lazy(() => import("features/admin/AdminProfile"));
const NotFound = React.lazy(() => import("components/NotFound"));
const Checkout = React.lazy(() => import("features/Checkout"));
const SearchResult = React.lazy(() => import("features/SearchResult"));
const Wishlist = React.lazy(() => import("features/Wishlist"));

const Router = (props) => {
  const { isScrolled } = props;
  const userId = useSelector((state) => state.auth.user.id);
  const role = useSelector((state) => state.auth.user.role);
  return (
    <Routes>
      <Route path="/" element={<Home isScrolled={isScrolled} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:category" element={<Products />} />
      <Route
        path="/product/:productName"
        element={<ProductDetail isScrolled={isScrolled} />}
      />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/search" element={<SearchResult />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />

      {/* Admin router */}
      <Route
        path="/admin/dasboard"
        element={role === "admin" ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/profile"
        element={role === "admin" ? <AdminProfile /> : <Navigate to="/login" />}
      />

      {/* User Router */}
      <Route
        path="/user/checkout"
        element={userId ? <Checkout /> : <Navigate to="/login" />}
      />
      <Route path="/user/cart" element={userId ? <Cart /> : <Navigate to="/login" />} />
      <Route
        path="/user/profile"
        element={userId ? <UserProfile /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default Router;
