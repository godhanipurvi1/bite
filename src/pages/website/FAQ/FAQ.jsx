import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const FAQ_GROUPS = [
  {
    category: "Orders",
    items: [
      {
        q: "How do I track my order?",
        a: "Once your order is confirmed, go to Order Tracking from your order confirmation page or account menu to see live status updates from preparation through delivery.",
      },
      {
        q: "Can I cancel an order after placing it?",
        a: "You can cancel within a few minutes of placing your order, before the restaurant confirms it. After that, cancellation depends on how far along preparation is — contact support for help.",
      },
      {
        q: "What if an item is missing from my order?",
        a: "Report it from the order details page within 24 hours and we'll arrange a refund or redelivery of the missing item.",
      },
    ],
  },
  {
    category: "Payments",
    items: [
      {
        q: "What payment methods are accepted?",
        a: "We accept credit and debit cards, UPI, and cash on delivery in most serviceable areas.",
      },
      {
        q: "How do refunds work?",
        a: "Refunds for cancelled or disputed orders are credited back to your original payment method within 5-7 business days.",
      },
    ],
  },
  {
    category: "Delivery",
    items: [
      {
        q: "What are your delivery hours?",
        a: "Most restaurants on BiteVerse deliver from 9 AM to midnight, though hours vary by restaurant and location.",
      },
      {
        q: "Is there a minimum order value?",
        a: "Minimum order values vary by restaurant and are shown on the restaurant page before you check out.",
      },
    ],
  },
];

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
      <button className="faq-item__question" onClick={onToggle}>
        {q}
        <ChevronDown size={18} className="faq-item__chevron" />
      </button>
      <div className="faq-item__answer">
        <p>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openKey, setOpenKey] = useState("Orders-0");

  return (
    <div className="faq">
      <div className="faq__header">
        <h1>Frequently Asked Questions</h1>
        <p>Answers to the things people ask us most</p>
      </div>

      {FAQ_GROUPS.map((group) => (
        <section key={group.category} className="faq-group">
          <h2>{group.category}</h2>
          <div className="faq-group__list">
            {group.items.map((item, i) => {
              const key = `${group.category}-${i}`;
              return (
                <AccordionItem
                  key={key}
                  q={item.q}
                  a={item.a}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(openKey === key ? null : key)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}