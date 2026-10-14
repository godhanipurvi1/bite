import React, { useState } from "react";
import {
  Flame,
  Users,
  Zap,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";
import "./Offers.css";

const FEATURED_OFFERS = [
  {
    id: "first-order",
    variant: "chili",
    icon: Flame,
    badge: "Hot",
    title: "50% off your first order",
    description:
      "New to BiteVerse? Get half off any order up to ₹200. Applied automatically at checkout on your first purchase.",
    code: "WELCOME50",
    expires: "Expires 30 Sep 2026",
  },
  {
    id: "referral",
    variant: "basil",
    icon: Users,
    badge: "Referral",
    title: "Refer a friend, earn ₹100",
    description:
      "Both of you get ₹100 credits when they place their first order using your invite link.",
    code: "FRIEND100",
    expires: "No expiry",
  },
  {
    id: "free-delivery",
    variant: "saffron",
    icon: Zap,
    badge: "Weekend",
    title: "Free delivery all month",
    description:
      "Zero delivery charges on all orders above ₹149, every day this month. No code needed.",
    code: "FREESHIP",
    expires: "Ends 30 Sep 2026",
  },
];

const OFFER_CATEGORIES = ["All", "Restaurants", "Delivery", "Payments", "New user"];

const ALL_OFFERS = [
  {
    id: 1,
    category: "Restaurants",
    title: "20% off at Spice Route",
    discount: "20% OFF",
    minOrder: "Min. order ₹300",
    validity: "Valid till 15 Sep",
  },
  {
    id: 2,
    category: "Delivery",
    title: "Flat ₹30 off delivery",
    discount: "₹30 OFF",
    minOrder: "Min. order ₹199",
    validity: "Valid till 10 Sep",
  },
  {
    id: 3,
    category: "Payments",
    title: "10% cashback with UPI",
    discount: "10% BACK",
    minOrder: "Max cashback ₹75",
    validity: "Valid till 30 Sep",
  },
  {
    id: 4,
    category: "New user",
    title: "Flat ₹100 off first order",
    discount: "₹100 OFF",
    minOrder: "Min. order ₹250",
    validity: "One-time use",
  },
  {
    id: 5,
    category: "Restaurants",
    title: "Buy 1 Get 1 at Pizza Hub",
    discount: "BOGO",
    minOrder: "Min. order ₹400",
    validity: "Valid till 20 Sep",
  },
  {
    id: 6,
    category: "Delivery",
    title: "Free delivery on weekends",
    discount: "FREE",
    minOrder: "Min. order ₹149",
    validity: "Sat & Sun only",
  },
];

const TIERS = [
  {
    name: "Bronze",
    requirement: "0 – 5 orders/month",
    benefits: ["Standard delivery slots", "Order tracking", "Email support"],
    popular: false,
  },
  {
    name: "Silver",
    requirement: "6 – 15 orders/month",
    benefits: [
      "Priority delivery slots",
      "5% off every order",
      "Chat support",
    ],
    popular: true,
  },
  {
    name: "Gold",
    requirement: "16+ orders/month",
    benefits: [
      "Free delivery, always",
      "10% off every order",
      "24/7 phone support",
    ],
    popular: false,
  },
];

export default function Offers() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedCode, setCopiedCode] = useState(null);

  const visibleOffers =
    activeFilter === "All"
      ? ALL_OFFERS
      : ALL_OFFERS.filter((offer) => offer.category === activeFilter);

  function handleCopy(code) {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode((current) => (current === code ? null : current)), 1800);
  }

  return (
    <div className="offers-page">
      {/* ================= HERO TICKET ================= */}
      <section className="o-ticket">
        <div className="o-ticket__perforation" aria-hidden="true" />
        <div className="o-ticket__body">
          <p className="o-ticket__eyebrow">Deals &amp; promotions</p>
          <h1 className="o-ticket__headline">
            More flavour, less spending.
          </h1>
          <p className="o-ticket__sub">
            Jaw-dropping discounts, exclusive perks, and rewards that taste as
            good as your order. Stack the savings.
          </p>
        </div>
        <div
          className="o-ticket__perforation o-ticket__perforation--bottom"
          aria-hidden="true"
        />
      </section>

      {/* ================= FEATURED OFFERS ================= */}
      <section className="featured-section">
        <h2 className="featured-section__title">Right now</h2>
        <div className="featured-grid">
          {FEATURED_OFFERS.map((offer) => {
            const Icon = offer.icon;
            const isCopied = copiedCode === offer.code;
            return (
              <article
                key={offer.id}
                className={`featured-card featured-card--${offer.variant}`}
              >
                <div className="featured-card__header">
                  <span className="featured-card__icon">
                    <Icon size={22} />
                  </span>
                  <span className="featured-card__badge">{offer.badge}</span>
                </div>
                <h3 className="featured-card__title">{offer.title}</h3>
                <p className="featured-card__description">
                  {offer.description}
                </p>
                <div className="featured-card__code">
                  <span className="featured-card__code-text">
                    {offer.code}
                  </span>
                  <button
                    type="button"
                    className="featured-card__copy"
                    onClick={() => handleCopy(offer.code)}
                    aria-label={`Copy code ${offer.code}`}
                  >
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="featured-card__expires">{offer.expires}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ================= ALL OFFERS ================= */}
      <section className="offers-section">
        <div className="offers-header">
          <h2 className="offers-header__title">All offers</h2>
          <div className="offers-filter">
            {OFFER_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeFilter === category
                    ? "filter-btn filter-btn--active"
                    : "filter-btn"
                }
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {visibleOffers.length > 0 ? (
          <div className="offers-grid">
            {visibleOffers.map((offer) => (
              <article key={offer.id} className="offer-card">
                <div className="offer-card__header">
                  <h4 className="offer-card__title">{offer.title}</h4>
                  <p className="offer-card__validity">{offer.validity}</p>
                </div>
                <div className="offer-card__body">
                  <span className="offer-card__discount">
                    {offer.discount}
                  </span>
                  <p className="offer-card__minorder">{offer.minOrder}</p>
                </div>
                <button type="button" className="offer-card__cta">
                  Use offer <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No offers in this category right now — check back soon.
          </p>
        )}
      </section>

      {/* ================= LOYALTY TIERS ================= */}
      <section className="loyalty-section">
        <h2 className="loyalty-section__title">Order more, earn more</h2>
        <p className="loyalty-section__subtitle">
          Your tier is based on orders placed in the last 30 days.
        </p>
        <div className="tier-grid">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.popular ? "tier-card tier-card--popular" : "tier-card"
              }
            >
              {tier.popular && (
                <span className="tier-card__ribbon">Most reached</span>
              )}
              <h3 className="tier-card__name">{tier.name}</h3>
              <p className="tier-card__requirement">{tier.requirement}</p>
              <ul className="tier-card__benefits">
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>
                    <span className="tier-card__check">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECEIPT CTA ================= */}
      <section className="receipt-cta">
        <div className="receipt-cta__perforation" aria-hidden="true" />
        <div className="receipt-cta__body">
          <h2 className="receipt-cta__title">Hungry for a deal?</h2>
          <p className="receipt-cta__text">
            New offers drop every week. Order now and see what's stacked at
            checkout.
          </p>
          <button type="button" className="receipt-cta__button">
            Start an order <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}