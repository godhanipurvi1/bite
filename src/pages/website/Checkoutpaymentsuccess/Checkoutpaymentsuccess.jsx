import React from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, MapPin, ArrowRight } from "lucide-react";
import "./Checkoutpaymentsuccess.css";

const ORDER_ID = "BV-20482";
const ETA = "28-35 min";

export default function Checkoutpaymentsuccess() {
  const navigate = useNavigate();

  return (
    <div className="success">
      <div className="success__stamp">
        <Check size={34} />
      </div>

      <h1>Order Placed!</h1>
      <p className="success__sub">
        Your food is being prepared. We'll notify you the moment it's on
        its way.
      </p>

      <div className="success__card">
        <div className="success__row">
          <span>Order number</span>
          <span className="success__value">{ORDER_ID}</span>
        </div>
        <div className="success__row">
          <span>
            <Clock size={14} /> Estimated delivery
          </span>
          <span className="success__value">{ETA}</span>
        </div>
        <div className="success__row">
          <span>
            <MapPin size={14} /> Delivering to
          </span>
          <span className="success__value">Bandra West, Mumbai</span>
        </div>
      </div>

      <div className="success__actions">
        <button
          className="success__primary"
          onClick={() => navigate(`/dashboard/order-tracking/${ORDER_ID}`)}
        >
          Track Order
          <ArrowRight size={17} />
        </button>
        <button
          className="success__secondary"
          onClick={() => navigate("/dashboard")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}