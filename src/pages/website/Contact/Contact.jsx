import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call us",
    value: "1800-266-1234",
    note: "Mon-Sun, 9 AM - 11 PM",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "support@biteverse.com",
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Head office",
    value: "BiteVerse HQ, BKC",
    note: "Bandra Kurla Complex, Mumbai",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact">
      <div className="contact__header">
        <h1>Get in Touch</h1>
        <p>Questions, feedback, or a problem with an order — we're here.</p>
      </div>

      <div className="contact__info-grid">
        {CONTACT_INFO.map(({ icon: Icon, label, value, note }) => (
          <div key={label} className="contact-info-card">
            <span className="contact-info-card__icon">
              <Icon size={18} />
            </span>
            <div>
              <p className="contact-info-card__label">{label}</p>
              <p className="contact-info-card__value">{value}</p>
              <p className="contact-info-card__note">{note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="contact__form-wrap">
        {submitted ? (
          <div className="contact-success">
            <span className="contact-success__icon">
              <Check size={26} />
            </span>
            <h2>Message sent</h2>
            <p>Thanks for reaching out — our team will get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send us a message</h2>

            <label className="field">
              <span className="field__label">Your name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Full name"
              />
            </label>

            <label className="field">
              <span className="field__label">Email address</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
              />
            </label>

            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Tell us what's going on..."
              />
            </label>

            <button type="submit" className="contact-form__submit">
              Send Message
              <Send size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}