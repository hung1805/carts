import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeliveryInfo from "./DeliveryInfo";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const [showPayment, setShowPayment] = useState(false);

  if (!userId) {
    navigate("/login");
  }

  return (
    <div className="container my-10">
      <div className="w-full bg-white flex flex-col-reverse lg:flex-row">
        <DeliveryInfo showPayment={showPayment} setShowPayment={setShowPayment} />
        <OrderSummary showPayment={showPayment} setShowPayment={setShowPayment} />
      </div>
    </div>
  );
};

export default Checkout;
