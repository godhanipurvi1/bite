import React from "react";
import "../Legal.css";

export default function Terms() {
  return (
    <div className="legal">
      <div className="legal__header">
        <p className="legal__eyebrow">Last updated: January 2026</p>
        <h1>Terms of Service</h1>
        <p className="legal__intro">
          These terms govern your use of BiteVerse. By creating an account or
          placing an order, you agree to them.
        </p>
      </div>

      <section className="legal-section">
        <h2>1. Using BiteVerse</h2>
        <p>
          You must be at least 18 years old, or have a parent or guardian's
          permission, to create an account and place orders. You're
          responsible for keeping your account credentials secure.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. Orders and Pricing</h2>
        <p>
          Prices, availability, and delivery estimates are set by individual
          restaurants and may change without notice. We do our best to keep
          listings accurate but cannot guarantee every menu item is in stock.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Cancellations and Refunds</h2>
        <p>
          Orders can be cancelled free of charge before a restaurant confirms
          them. Once preparation has started, cancellations are handled case
          by case and may not be eligible for a full refund.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Delivery</h2>
        <p>
          Delivery times shown in the app are estimates, not guarantees. We
          are not responsible for delays caused by weather, traffic, or
          circumstances outside our control.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Conduct</h2>
        <p>
          You agree not to misuse the platform — including submitting false
          orders, abusing promotional codes, or being abusive toward
          restaurant staff or delivery partners.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Limitation of Liability</h2>
        <p>
          BiteVerse acts as a marketplace connecting you with independent
          restaurants and delivery partners. We are not liable for the
          quality of food prepared by restaurants on the platform.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Changes to These Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of
          BiteVerse after changes take effect means you accept the updated
          terms.
        </p>
      </section>
    </div>
  );
}