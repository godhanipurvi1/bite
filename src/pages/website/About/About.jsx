import React from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Truck, Clock, ArrowRight } from "lucide-react";
import "./About.css";

const TIMELINE = [
  {
    year: "2021",
    text: "Three friends, one scooter, and a spreadsheet of favourite dhabas in Andheri.",
  },
  {
    year: "2022",
    text: "Crossed 1,000 restaurant partners and finally retired the spreadsheet.",
  },
  {
    year: "2023",
    text: "Opened kitchens in 12 more cities, from Pune to Kochi.",
  },
  {
    year: "2025",
    text: "9 million orders later, still obsessing over the 27th minute.",
  },
];

const VALUES = [
  {
    icon: Leaf,
    title: "Freshness first",
    text: "Every order routes through the kitchen that's closest and fastest — not the one paying for placement.",
  },
  {
    icon: Truck,
    title: "Riders get paid fairly",
    text: "Delivery partners keep 100% of tips and are paid per order, not per algorithm mood.",
  },
  {
    icon: Clock,
    title: "No fake urgency",
    text: "We show real prep and delivery windows. No countdown timers designed to rush you.",
  },
];

const STATS = [
  { label: "Restaurants partnered", value: "12,400+" },
  { label: "Cities served", value: "48" },
  { label: "Orders delivered", value: "9.2M" },
  { label: "Avg. delivery time", value: "27 min" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* ================= HERO / TICKET HEAD ================= */}
      <section className="ticket ticket--hero">
        <div className="ticket__perforation ticket__perforation--top" aria-hidden="true" />
        <div className="ticket__body">
          <p className="ticket__eyebrow">ORDER NO. 000001 &middot; EST. 2021, MUMBAI</p>
          <h1 className="ticket__headline">
            We're just here to keep
            <br />
            the food coming.
          </h1>
          <p className="ticket__sub">
            BiteVerse connects hungry people with the kitchens who feed them —
            fast, fair, and without the fuss.
          </p>
        </div>
        <div className="ticket__perforation ticket__perforation--bottom" aria-hidden="true" />
      </section>

      {/* ================= STORY / TIMELINE ================= */}
      <section className="story">
        <h2 className="section__title">How we got here</h2>
        <ol className="timeline">
          {TIMELINE.map((row) => (
            <li className="timeline__row" key={row.year}>
              <span className="timeline__year">{row.year}</span>
              <span className="timeline__text">{row.text}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* ================= VALUES ================= */}
      <section className="values">
        <h2 className="section__title">What we won't compromise on</h2>
        <div className="values__grid">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div className="value-card" key={title}>
              <span className="value-card__icon">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <h3 className="value-card__title">{title}</h3>
              <p className="value-card__text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATS / RECEIPT TOTAL ================= */}
      <section className="receipt">
        <div className="receipt__perforation" aria-hidden="true" />
        <div className="receipt__body">
          <p className="receipt__label">ITEMS</p>
          <ul className="receipt__list">
            {STATS.map((stat) => (
              <li className="receipt__line" key={stat.label}>
                <span className="receipt__dots">{stat.label}</span>
                <span className="receipt__value">{stat.value}</span>
              </li>
            ))}
          </ul>
          <div className="receipt__rule" />
          <div className="receipt__total">
            <span>TOTAL</span>
            <span>Trust, delivered daily.</span>
          </div>
        </div>
      </section>

      {/* ================= CLOSING / STAMP ================= */}
      <section className="closing">
        <h2 className="closing__headline">Hungry? Let's fix that.</h2>
        <button
          className="closing__cta"
          onClick={() => navigate("/dashboard/restaurants")}
        >
          Explore restaurants
          <ArrowRight size={18} />
        </button>

        <div className="stamp" aria-hidden="true">
          <svg viewBox="0 0 160 160" className="stamp__ring">
            <defs>
              <path
                id="stampCurve"
                d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
              />
            </defs>
            <circle cx="80" cy="80" r="76" className="stamp__outer" />
            <circle cx="80" cy="80" r="52" className="stamp__inner" />
            <text className="stamp__text">
              <textPath href="#stampCurve" startOffset="2%">
                APPROVED &middot; BITEVERSE KITCHEN &middot; MUMBAI &middot;
              </textPath>
            </text>
          </svg>
        </div>
      </section>
    </div>
  );
}