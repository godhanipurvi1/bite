import React from "react";
import { useParams } from "react-router-dom";
import { Check, Phone, MessageCircle, MapPin } from "lucide-react";
import "./OrderTracking.css";

const STAGES = [
  { id: "placed", label: "Order Placed", time: "7:42 PM" },
  { id: "confirmed", label: "Confirmed by Restaurant", time: "7:44 PM" },
  { id: "preparing", label: "Preparing Your Food", time: "7:48 PM" },
  { id: "on_the_way", label: "Out for Delivery", time: "8:05 PM" },
  { id: "delivered", label: "Delivered", time: "" },
];

const CURRENT_STAGE_INDEX = 3; // "Out for Delivery"

const ORDER_ITEMS = [
  { id: 1, name: "Margherita Pizza", qty: 2 },
  { id: 2, name: "Classic Cheeseburger", qty: 1 },
  { id: 3, name: "Gulab Jamun (2 pc)", qty: 1 },
];

export default function OrderTracking() {
  const { id } = useParams();

  return (
    <div className="tracking">
      <div className="tracking__header">
        <h1>Order #{id}</h1>
        <p>Estimated delivery by 8:15 PM</p>
      </div>

      {/* Delivery partner */}
      <div className="partner-card">
        <div className="partner-card__avatar">RK</div>
        <div className="partner-card__info">
          <p className="partner-card__name">Ravi Kumar</p>
          <p className="partner-card__meta">Your delivery partner</p>
        </div>
        <div className="partner-card__actions">
          <button aria-label="Call delivery partner">
            <Phone size={16} />
          </button>
          <button aria-label="Message delivery partner">
            <MessageCircle size={16} />
          </button>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="tracking-map">
        <MapPin size={22} />
        <span>Live map appears here once tracking begins</span>
      </div>

      {/* Timeline */}
      <ul className="tracking-timeline">
        {STAGES.map((stage, i) => {
          const done = i <= CURRENT_STAGE_INDEX;
          const active = i === CURRENT_STAGE_INDEX;
          return (
            <li
              key={stage.id}
              className={`tracking-timeline__row ${done ? "is-done" : ""} ${
                active ? "is-active" : ""
              }`}
            >
              <span className="tracking-timeline__dot">
                {done && <Check size={12} />}
              </span>
              <div className="tracking-timeline__text">
                <p className="tracking-timeline__label">{stage.label}</p>
                {stage.time && (
                  <p className="tracking-timeline__time">{stage.time}</p>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Order summary */}
      <div className="tracking-summary">
        <p className="tracking-summary__label">Order Summary</p>
        <ul>
          {ORDER_ITEMS.map((item) => (
            <li key={item.id}>
              <span>{item.qty}×</span> {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}