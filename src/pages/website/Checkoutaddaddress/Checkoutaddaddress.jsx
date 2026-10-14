import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, MapPin } from "lucide-react";
import { useAddress } from "../../../context/AddressContext";
import "./Checkoutaddaddress.css";

const ADDRESS_TYPES = [
  { id: "Home", label: "Home", icon: Home },
  { id: "Work", label: "Work", icon: Briefcase },
  { id: "Other", label: "Other", icon: MapPin },
];

export default function Checkoutaddaddress() {
  const navigate = useNavigate();
  const { addAddress } = useAddress();
  const [type, setType] = useState("Home");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    line: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    addAddress({ type, ...form });
    navigate("/dashboard/checkout/address");
  };

  return (
    <div className="add-address">
      <div className="add-address__header">
        <h1>Add a New Address</h1>
        <p>We'll use this to find your order and get it there fast</p>
      </div>

      <form className="add-address__form" onSubmit={handleSave}>
        <div className="type-picker">
          {ADDRESS_TYPES.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              className={`type-chip ${type === id ? "is-active" : ""}`}
              onClick={() => setType(id)}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        <div className="field-grid">
          <label className="field">
            <span className="field__label">Full name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Priya Sharma"
            />
          </label>

          <label className="field">
            <span className="field__label">Phone number</span>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="98765 43210"
            />
          </label>
        </div>

        <label className="field">
          <span className="field__label">Address</span>
          <input
            type="text"
            required
            value={form.line}
            onChange={handleChange("line")}
            placeholder="Flat / house no., building, street"
          />
        </label>

        <label className="field">
          <span className="field__label">Landmark (optional)</span>
          <input
            type="text"
            value={form.landmark}
            onChange={handleChange("landmark")}
            placeholder="Near..."
          />
        </label>

        <div className="field-grid">
          <label className="field">
            <span className="field__label">City</span>
            <input
              type="text"
              required
              value={form.city}
              onChange={handleChange("city")}
              placeholder="Mumbai"
            />
          </label>

          <label className="field">
            <span className="field__label">Pincode</span>
            <input
              type="text"
              required
              value={form.pincode}
              onChange={handleChange("pincode")}
              placeholder="400050"
            />
          </label>
        </div>

        <button type="submit" className="add-address__save">
          Save Address
        </button>
      </form>
    </div>
  );
}