import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = useSelector((state) => state.auth.user.role.isAdmin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) navigate(-1);
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
