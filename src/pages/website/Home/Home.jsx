import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Star, Clock, MapPin, Zap, TrendingUp } from "lucide-react";
import b2 from "../../../assets/images/b1.png";
import "./Home.css";

/* ================= CONSTANTS ================= */

const CATEGORIES = [
  {
    id: 1,
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=200&q=80",
  },
  {
    id: 2,
    name: "Burger",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80",
  },
  {
    id: 3,
    name: "Chinese",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200&q=80",
  },
  {
    id: 4,
    name: "Indian",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=200&q=80",
  },
  {
    id: 5,
    name: "Desserts",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=200&q=80",
  },
  {
    id: 6,
    name: "Drinks",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=200&q=80",
  },
];

const FEATURED_RESTAURANTS = [
  {
    id: 1,
    name: "Pizza Palace",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&q=80",
    cuisine: "Italian, Pizza",
    rating: 4.8,
    time: "25-30 min",
    location: "2.4 km",
    offer: "50% OFF",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Burger Hub",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    cuisine: "Burger, Fast Food",
    rating: 4.7,
    time: "20-25 min",
    location: "1.8 km",
    offer: "40% OFF",
    badge: "Fastest",
  },
  {
    id: 3,
    name: "Indian Spice",
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80",
    cuisine: "North Indian",
    rating: 4.6,
    time: "30-35 min",
    location: "2.1 km",
    offer: "20% OFF",
    badge: "Best Rated",
  },
  {
    id: 4,
    name: "Sweet Treats",
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80",
    cuisine: "Desserts",
    rating: 4.9,
    time: "15-20 min",
    location: "1.3 km",
    offer: "30% OFF",
    badge: "New",
  },
];

/* ================= COMPONENTS ================= */

function CategoryCard({ category, index }) {
  return (
    <div className="category-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="category-icon">
        <img src={category.img} alt={category.name} />
      </div>
      <h4>{category.name}</h4>
    </div>
  );
}

function RestaurantCard({ restaurant, index, onOrderClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="restaurant-card"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="restaurant-image">
        <img src={restaurant.img} alt={restaurant.name} />
        <span className="offer">{restaurant.offer}</span>
        {restaurant.badge && (
          <span className="badge" aria-label={restaurant.badge}>
            {restaurant.badge === "Popular" && <TrendingUp size={14} />}
            {restaurant.badge === "Fastest" && <Zap size={14} />}
            {restaurant.badge === "Best Rated" && <Star size={14} />}
            <span>{restaurant.badge}</span>
          </span>
        )}
      </div>

      <div className="restaurant-content">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>

        <div className="restaurant-info">
          <span className="info-item">
            <Star size={15} fill="currentColor" />
            <span>{restaurant.rating}</span>
          </span>
          <span className="info-item">
            <Clock size={15} />
            <span>{restaurant.time}</span>
          </span>
          <span className="info-item">
            <MapPin size={15} />
            <span>{restaurant.location}</span>
          </span>
        </div>

        <button
          onClick={onOrderClick}
          className={`order-btn ${isHovered ? "hovered" : ""}`}
        >
          Order Now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function SectionHeader({ title, onViewAllClick, icon: Icon }) {
  return (
    <div className="section-header">
      <div className="section-title">
        {Icon && <Icon size={28} />}
        <h2>{title}</h2>
      </div>
      <button onClick={onViewAllClick}>
        View All
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

function HeroSection({ onSearchClick }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Delicious Food
          <br />
          Delivered To
          <span> Your Door</span>
        </h1>

        <p>
          Order from your favourite restaurants with lightning-fast delivery.
          Get your meal in minutes, not hours.
        </p>

        <div className={`hero-search ${searchFocused ? "focused" : ""}`}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button onClick={onSearchClick}>Search</button>
        </div>

        {/* Quick Stats */}
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Restaurants</span>
          </div>
          <div className="stat">
            <span className="stat-number">30 min</span>
            <span className="stat-label">Fast Delivery</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.8★</span>
            <span className="stat-label">Rated Good</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img src={b2} alt="Featured dish" />
      </div>
    </section>
  );
}

function PromoSection({ onViewOffersClick }) {
  return (
    <section className="banner">
      <div>
        <h2>🎉 Get 50% OFF on First Order</h2>
        <p>
          Use Coupon <strong>WELCOME50</strong> on your first order and enjoy
          amazing discounts!
        </p>
      </div>
      <button onClick={onViewOffersClick}>View Offers</button>
    </section>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchClick = () => navigate("/dashboard/explore");
  const handleExploreClick = () => navigate("/dashboard/explore");
  const handleRestaurantsClick = () => navigate("/dashboard/restaurants");
  const handleOffersClick = () => navigate("/dashboard/offers");

  return (
    <div className="home">
      <HeroSection onSearchClick={handleSearchClick} />

      {/* Categories Section */}
      <section className="section">
        <SectionHeader
          title="Popular Categories"
          onViewAllClick={handleExploreClick}
          icon={null}
        />
        <div className="category-grid">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="section">
        <SectionHeader
          title="Popular Restaurants"
          onViewAllClick={handleRestaurantsClick}
          icon={null}
        />
        <div className="restaurant-grid">
          {FEATURED_RESTAURANTS.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              index={index}
              onOrderClick={handleRestaurantsClick}
            />
          ))}
        </div>
      </section>

      {/* Promo Section */}
      <PromoSection onViewOffersClick={handleOffersClick} />

      {/* Floating Action Button (Optional) */}
      {isScrolled && (
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}