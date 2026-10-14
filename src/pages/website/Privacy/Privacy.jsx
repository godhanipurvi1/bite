import React from "react";
import "../Legal.css";

export default function Privacy() {
  return (
    <div className="legal">
      <div className="legal__header">
        <p className="legal__eyebrow">Last updated: January 2026</p>
        <h1>Privacy Policy</h1>
        <p className="legal__intro">
          This policy explains what information BiteVerse collects, how we
          use it, and the choices you have about it.
        </p>
      </div>

      <section className="legal-section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you give us directly — your name, phone
          number, delivery addresses, and payment details — along with
          information generated as you use the app, such as your order
          history, location when placing an order, and device information.
        </p>
      </section>

      <section className="legal-section">
        <h2>2. How We Use Your Information</h2>
        <p>
          We use your information to process orders, coordinate delivery,
          provide customer support, and improve our recommendations. We may
          also use it to send you order updates, offers, and service
          announcements, which you can opt out of at any time.
        </p>
      </section>

      <section className="legal-section">
        <h2>3. Sharing With Restaurants and Delivery Partners</h2>
        <p>
          To fulfil your order, we share necessary details — your name,
          delivery address, and order contents — with the restaurant and the
          delivery partner assigned to your order. We do not sell your
          personal data to third parties.
        </p>
      </section>

      <section className="legal-section">
        <h2>4. Payment Information</h2>
        <p>
          Payment card details are processed by our PCI-compliant payment
          partners and are never stored on our own servers in full.
        </p>
      </section>

      <section className="legal-section">
        <h2>5. Your Choices</h2>
        <p>
          You can review and update your personal information from your
          account settings at any time, request a copy of your data, or ask
          us to delete your account. Contact support to make either request.
        </p>
      </section>

      <section className="legal-section">
        <h2>6. Data Retention</h2>
        <p>
          We retain order and account data for as long as your account is
          active, and for a limited period after account closure as required
          for tax, legal, and fraud-prevention purposes.
        </p>
      </section>

      <section className="legal-section">
        <h2>7. Contact Us</h2>
        <p>
          If you have questions about this policy or how your data is
          handled, reach out to our support team through the Contact page.
        </p>
      </section>
    </div>
  );
}