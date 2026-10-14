import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Tag, ShoppingBag, ArrowRight } from "lucide-react";
import "./Cart.css";

/* ================= PLACEHOLDER DATA =================
   Swap this for your CartContext (useCart) once wired up —
   the shape below is what the UI expects per item:
   { id, name, restaurant, img, price, mrp, qty, veg } */

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Margherita Pizza",
    restaurant: "Pizza Palace",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&q=80",
    price: 249,
    mrp: 349,
    qty: 2,
    veg: true,
  },
  {
    id: 2,
    name: "Classic Cheeseburger",
    restaurant: "Burger Hub",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80",
    price: 179,
    mrp: 179,
    qty: 1,
    veg: false,
  },
  {
    id: 3,
    name: "Gulab Jamun (2 pc)",
    restaurant: "Sweet Treats",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&q=80",
    price: 89,
    mrp: 120,
    qty: 1,
    veg: true,
  },
];

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <li className="cart-item">
      <div className="cart-item__media">
        <img src={item.img} alt={item.name} />
        <span className={`cart-item__dot ${item.veg ? "is-veg" : "is-nonveg"}`} />
      </div>

      <div className="cart-item__body">
        <div className="cart-item__top">
          <div>
            <h3 className="cart-item__name">{item.name}</h3>
            <p className="cart-item__place">{item.restaurant}</p>
          </div>
          <button
            className="cart-item__remove"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart-item__bottom">
          <div className="cart-item__price">
            <span className="price-now">₹{item.price}</span>
            {item.mrp > item.price && (
              <span className="price-mrp">₹{item.mrp}</span>
            )}
          </div>

          <div className="qty-stepper">
            <button
              onClick={() => onQtyChange(item.id, item.qty - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.id, item.qty + 1)}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function EmptyCart({ onBrowse }) {
  return (
    <div className="cart-empty">
      <span className="cart-empty__icon">
        <ShoppingBag size={30} />
      </span>
      <h2>Your cart is empty</h2>
      <p>Add a dish or two — your order will show up here.</p>
      <button className="cart-empty__cta" onClick={onBrowse}>
        Browse restaurants
      </button>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const handleQtyChange = (id, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (!code) return;
    if (code === "WELCOME50") {
      setAppliedPromo({ code, discount: 0.5 });
      setPromoError("");
    } else {
      setAppliedPromo(null);
      setPromoError("That code doesn't work — check and try again.");
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const taxable = subtotal - discount;
  const tax = taxable * TAX_RATE;
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = taxable + tax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="cart">
        <div className="cart__header">
          <h1>Your Cart</h1>
        </div>
        <EmptyCart onBrowse={() => navigate("/dashboard/explore")} />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h1>Your Cart</h1>
        <p>{items.length} item{items.length !== 1 ? "s" : ""} from your order</p>
      </div>

      <div className="cart__layout">
        {/* ================= ITEMS ================= */}
        <ul className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQtyChange={handleQtyChange}
              onRemove={handleRemove}
            />
          ))}
        </ul>

        {/* ================= RECEIPT SUMMARY ================= */}
        <aside className="cart-receipt">
          <div className="cart-receipt__perforation" aria-hidden="true" />
          <div className="cart-receipt__body">
            <p className="cart-receipt__label">Order Summary</p>

            <div className="promo-field">
              <Tag size={15} />
              <input
                type="text"
                placeholder="Promo code"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
            {promoError && <p className="promo-error">{promoError}</p>}
            {appliedPromo && (
              <p className="promo-success">
                {appliedPromo.code} applied — {appliedPromo.discount * 100}% off
              </p>
            )}

            <ul className="cart-receipt__list">
              <li className="cart-receipt__line">
                <span>Subtotal</span>
                <span className="cart-receipt__value">₹{subtotal.toFixed(0)}</span>
              </li>
              {appliedPromo && (
                <li className="cart-receipt__line">
                  <span>Discount</span>
                  <span className="cart-receipt__value">
                    -₹{discount.toFixed(0)}
                  </span>
                </li>
              )}
              <li className="cart-receipt__line">
                <span>Delivery fee</span>
                <span className="cart-receipt__value">₹{deliveryFee}</span>
              </li>
              <li className="cart-receipt__line">
                <span>Taxes</span>
                <span className="cart-receipt__value">₹{tax.toFixed(0)}</span>
              </li>
            </ul>

            <div className="cart-receipt__rule" />

            <div className="cart-receipt__total">
              <span>Total</span>
              <span>₹{total.toFixed(0)}</span>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/dashboard/checkout")}
            >
              Proceed to Checkout
              <ArrowRight size={17} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}