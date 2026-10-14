import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, MapPin, Plus, Check } from "lucide-react";
import { useAddress } from "../../../context/AddressContext";
import "./Checkoutaddress.css";

const ICONS = { Home, Work: Briefcase, Other: MapPin };

export default function Checkoutaddress() {
  const navigate = useNavigate();
  const { addresses, selectedId, selectAddress } = useAddress();

  return (
    <div className="c-address">
      <div className="c-address__header">
        <h1>Choose a Delivery Address</h1>
        <p>Pick where you'd like your order dropped off</p>
      </div>

      <div className="c-address__list">
        {addresses.map((addr) => {
          const Icon = ICONS[addr.type] || MapPin;
          const isSelected = selectedId === addr.id;
          return (
            <button
              key={addr.id}
              className={`address-card ${isSelected ? "is-selected" : ""}`}
              onClick={() => selectAddress(addr.id)}
            >
              <span className="address-card__icon">
                <Icon size={17} />
              </span>
              <span className="address-card__text">
                <span className="address-card__type">{addr.type}</span>
                <span className="address-card__line">{addr.line}</span>
                <span className="address-card__area">{addr.area}</span>
              </span>
              {isSelected && (
                <span className="address-card__check">
                  <Check size={15} />
                </span>
              )}
            </button>
          );
        })}

        <button
          className="add-address-card"
          onClick={() => navigate("/dashboard/checkout/add-address")}
        >
          <span className="add-address-card__icon">
            <Plus size={17} />
          </span>
          Add a new address
        </button>
      </div>

      <button
        className="c-address__continue"
        onClick={() => navigate("/dashboard/checkout")}
      >
        <MapPin size={17} />
        Deliver Here
      </button>
    </div>
  );
}