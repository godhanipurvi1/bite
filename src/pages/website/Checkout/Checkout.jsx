import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
  ArrowRight,
} from "lucide-react";
import "./Checkout.css";

const SAVED_ADDRESS = {
  label: "Home",
  line: "402, Sunrise Apartments, Linking Road",
  area: "Bandra West, Mumbai 400050",
};

const ORDER_ITEMS = [
  { id: 1, name: "Margherita Pizza", qty: 2, price: 249 },
  { id: 2, name: "Classic Cheeseburger", qty: 1, price: 179 },
  { id: 3, name: "Gulab Jamun (2 pc)", qty: 1, price: 89 },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Banknote },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("card");

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="checkout">
      <div className="checkout__header">
        <h1>Checkout</h1>
        <p>Review your order before you place it</p>
      </div>

      <div className="checkout__layout">
        <div className="checkout__main">
          {/* Delivery address */}
          <section className="checkout-card">
            <div className="checkout-card__title-row">
              <h2>Delivery Address</h2>
              <button onClick={() => navigate("/dashboard/checkout/address")}>
                Change
              </button>
            </div>
            <div className="address-summary">
              <span className="address-summary__icon">
                <MapPin size={17} />
              </span>
              <div>
                <p className="address-summary__label">{SAVED_ADDRESS.label}</p>
                <p className="address-summary__text">
                  {SAVED_ADDRESS.line}, {SAVED_ADDRESS.area}
                </p>
              </div>
            </div>
          </section>

          {/* Order items */}
          <section className="checkout-card">
            <div className="checkout-card__title-row">
              <h2>Your Order</h2>
              <button onClick={() => navigate("/dashboard/cart")}>
                Edit cart
              </button>
            </div>
            <ul className="order-list">
              {ORDER_ITEMS.map((item) => (
                <li key={item.id} className="order-list__row">
                  <span className="order-list__qty">{item.qty}×</span>
                  <span className="order-list__name">{item.name}</span>
                  <span className="order-list__price">
                    ₹{item.price * item.qty}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Payment method */}
          <section className="checkout-card">
            <h2>Payment Method</h2>
            <div className="payment-options">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  className={`payment-option ${
                    payment === id ? "is-selected" : ""
                  }`}
                  onClick={() => setPayment(id)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  <ChevronRight size={16} className="payment-option__chevron" />
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Receipt summary */}
        <aside className="checkout-receipt">
          <div className="checkout-receipt__perforation" aria-hidden="true" />
          <div className="checkout-receipt__body">
            <p className="checkout-receipt__label">Bill Summary</p>
            <ul className="checkout-receipt__list">
              <li className="checkout-receipt__line">
                <span>Subtotal</span>
                <span className="checkout-receipt__value">₹{subtotal}</span>
              </li>
              <li className="checkout-receipt__line">
                <span>Delivery fee</span>
                <span className="checkout-receipt__value">
                  ₹{deliveryFee}
                </span>
              </li>
              <li className="checkout-receipt__line">
                <span>Taxes</span>
                <span className="checkout-receipt__value">₹{tax}</span>
              </li>
            </ul>
            <div className="checkout-receipt__rule" />
            <div className="checkout-receipt__total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              className="checkout-place-btn"
              onClick={() => navigate("/dashboard/checkout/success")}
            >
              Place Order
              <ArrowRight size={17} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}