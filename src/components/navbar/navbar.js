import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Utensils,
  Menu,
  X,
} from "lucide-react";
import "./Navbar.css";

const NAV_ITEMS = [
  { label: "Home", path: "/dashboard" },
  { label: "Explore", path: "/dashboard/explore" },
  { label: "Restaurants", path: "/dashboard/restaurants" },
  { label: "Offers", path: "/dashboard/offers" },
  { label: "About", path: "/dashboard/about" },
  { label: "Contact", path: "/dashboard/contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Demo counts - replace with actual state management
  const cartCount = 2;
  const wishCount = 5;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating
  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Check if current route matches nav item
  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* ================= BRAND ================= */}
        <button
          className="navbar__brand"
          onClick={() => {
            navigate("/dashboard");
            setMobileMenuOpen(false);
          }}
          aria-label="BiteVerse Home"
        >
          <span className="navbar__brand-icon">
            <Utensils size={22} />
          </span>
          <span className="navbar__brand-text">
            <span className="navbar__brand-name">
              Bite<span className="navbar__brand-accent">Verse</span>
            </span>
            <span className="navbar__brand-tagline">Delicious Food Delivered Fast</span>
          </span>
        </button>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="navbar__desktop-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`navbar__nav-item ${isActive(item.path) ? "navbar__nav-item--active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="navbar__actions">
          {/* Location */}
          <div className="navbar__location-wrap">
            <button
              className="navbar__location"
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
            >
              <MapPin size={18} />
              <span>Mumbai, India</span>
              <ChevronDown size={16} />
            </button>
            {locationDropdownOpen && (
              <div className="navbar__location-dropdown">
                <button>Mumbai, India</button>
                <button>Delhi, India</button>
                <button>Bangalore, India</button>
                <button>Hyderabad, India</button>
              </div>
            )}
          </div>

          {/* Search */}
          <button
            className="navbar__icon-btn"
            onClick={() => navigate("/dashboard/search")}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Wishlist */}
          <button
            className="navbar__icon-btn"
            onClick={() => navigate("/dashboard/favorites")}
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishCount > 0 && (
              <span className="navbar__count-badge">{wishCount}</span>
            )}
          </button>

          {/* Cart */}
          <button
            className="navbar__icon-btn"
            onClick={() => navigate("/dashboard/cart")}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="navbar__count-badge">{cartCount}</span>
            )}
          </button>

          {/* Auth Button */}
          <button
            className="navbar__auth-btn"
            onClick={() => navigate("/")}
          >
            Login / Register
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-content">
            {/* Mobile Nav Items */}
            <div className="navbar__mobile-nav">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`navbar__mobile-nav-item ${
                    isActive(item.path) ? "navbar__mobile-nav-item--active" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Divider */}
            <div className="navbar__mobile-divider" />

            {/* Mobile Search */}
            <button
              className="navbar__mobile-action"
              onClick={() => {
                navigate("/dashboard/search");
                setMobileMenuOpen(false);
              }}
            >
              <Search size={18} />
              <span>Search</span>
            </button>

            {/* Mobile Favorites */}
            <button
              className="navbar__mobile-action"
              onClick={() => {
                navigate("/dashboard/favorites");
                setMobileMenuOpen(false);
              }}
            >
              <Heart size={18} />
              <span>Favorites</span>
              {wishCount > 0 && <span className="navbar__mobile-count">{wishCount}</span>}
            </button>

            {/* Mobile Cart */}
            <button
              className="navbar__mobile-action"
              onClick={() => {
                navigate("/dashboard/cart");
                setMobileMenuOpen(false);
              }}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartCount > 0 && <span className="navbar__mobile-count">{cartCount}</span>}
            </button>

            {/* Mobile Divider */}
            <div className="navbar__mobile-divider" />

            {/* Mobile Auth */}
            <button
              className="navbar__mobile-auth"
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
            >
              Login / Registerrrrrrrrrrrrrrr
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}