import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Trash2,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Search,
} from "lucide-react";
import "./Favorites.css";

/* ================= MOCK DATA ================= */

const FAVORITE_ITEMS = [
  {
    id: 1,
    type: "food",
    name: "Margherita Pizza",
    restaurant: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: "2.1K+",
    price: 249,
    time: "30-40 min",
    distance: "2.5 km",
  },
  {
    id: 2,
    type: "restaurant",
    name: "Burger Hub",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    cuisine: "Burger, Fast Food",
    rating: 4.7,
    reviews: "2.1K+",
    time: "20-30 min",
    distance: "2.1 km",
    offer: "40% OFF",
  },
  {
    id: 3,
    type: "food",
    name: "Chicken Biryani",
    restaurant: "Spice Garden",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab54a0f?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: "1.2K+",
    price: 229,
    time: "35-45 min",
    distance: "4.1 km",
  },
  {
    id: 4,
    type: "restaurant",
    name: "Sweet Treats",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    cuisine: "Desserts, Cakes, Ice Cream",
    rating: 4.7,
    reviews: "980+",
    time: "25-35 min",
    distance: "1.4 km",
    offer: "Flat ₹40 OFF",
  },
  {
    id: 5,
    type: "food",
    name: "Paneer Tikka",
    restaurant: "Tandoori Treats",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd57e3b?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: "842",
    price: 249,
    time: "30-40 min",
    distance: "3.5 km",
  },
  {
    id: 6,
    type: "restaurant",
    name: "Sushi World",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
    cuisine: "Japanese, Sushi, Asian",
    rating: 4.6,
    reviews: "640+",
    time: "35-45 min",
    distance: "3.2 km",
    offer: "30% OFF",
  },
];

/* ================= COMPONENTS ================= */

function EmptyState({ onBrowse }) {
  return (
    <div className="favorites__empty">
      <div className="empty-icon">❤️</div>
      <h2>No favorites yet</h2>
      <p>Start adding your favourite foods and restaurants to your wishlist</p>
      <button onClick={onBrowse} className="btn btn--primary">
        Explore now
      </button>
    </div>
  );
}

function FoodCard({ item, onRemove, onReorder }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fav-card fav-card--food">
      <div className="fav-card__media">
        <div className={`fav-card__image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              className="fav-card__image"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="fav-card__image-fallback">
              <span>🍽️</span>
            </div>
          )}
        </div>
        {item.offer && <span className="fav-card__badge">{item.offer}</span>}
      </div>

      <div className="fav-card__content">
        <div className="fav-card__header">
          <div>
            <h3 className="fav-card__title">{item.name}</h3>
            <p className="fav-card__subtitle">{item.restaurant}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="fav-card__remove"
            aria-label="Remove from favorites"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="fav-card__meta">
          <span className="meta-item">
            <Star size={14} fill="currentColor" />
            {item.rating}
          </span>
          <span className="meta-item">
            <Clock size={14} />
            {item.time}
          </span>
          <span className="meta-item">
            <MapPin size={14} />
            {item.distance}
          </span>
        </div>

        <div className="fav-card__footer">
          <span className="price">₹{item.price}</span>
          <button onClick={() => onReorder(item.id)} className="btn btn--add">
            Reorder
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ item, onRemove, onVisit }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="fav-card fav-card--restaurant">
      <div className="fav-card__media">
        <div className={`fav-card__image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
          {!imageError ? (
            <img
              src={item.image}
              alt={item.name}
              className="fav-card__image"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="fav-card__image-fallback">
              <span>🏪</span>
            </div>
          )}
        </div>
        {item.offer && <span className="fav-card__badge">{item.offer}</span>}
      </div>

      <div className="fav-card__content">
        <div className="fav-card__header">
          <div>
            <h3 className="fav-card__title">{item.name}</h3>
            <p className="fav-card__subtitle">{item.cuisine}</p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="fav-card__remove"
            aria-label="Remove from favorites"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="fav-card__meta">
          <span className="meta-item">
            <Star size={14} fill="currentColor" />
            {item.rating}
          </span>
          <span className="meta-item">
            <Clock size={14} />
            {item.time}
          </span>
          <span className="meta-item">
            <MapPin size={14} />
            {item.distance}
          </span>
        </div>

        <div className="fav-card__footer">
          <button onClick={() => onVisit(item.id)} className="btn btn--visit">
            Visit Store
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterTabs({ active, onChange }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "food", label: "Foods" },
    { id: "restaurant", label: "Restaurants" },
  ];

  return (
    <div className="favorites__tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`tab ${active === tab.id ? "is-active" : ""}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ================= PAGE ================= */

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(FAVORITE_ITEMS);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...favorites];

    // Filter by type
    if (filterType !== "all") {
      list = list.filter((item) => item.type === filterType);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.restaurant && item.restaurant.toLowerCase().includes(q)) ||
          (item.cuisine && item.cuisine.toLowerCase().includes(q))
      );
    }

    return list;
  }, [favorites, filterType, searchQuery]);

  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReorder = (id) => {
    const item = favorites.find((f) => f.id === id);
    if (item && item.type === "food") {
      navigate("/dashboard/restaurants");
    }
  };

  const handleVisit = (id) => {
    navigate("/dashboard/restaurants");
  };

  const handleBrowse = () => {
    navigate("/dashboard/explore");
  };

  return (
    <div className="favorites">
      {/* ============ HEADER ============ */}
      <div className="favorites__header">
        <h1 className="favorites__title">
          <Heart size={28} fill="currentColor" />
          My Favorites
        </h1>
        <p className="favorites__subtitle">
          {favorites.length} item{favorites.length !== 1 ? "s" : ""} saved
        </p>
      </div>

      {/* ============ CONTENT ============ */}
      {favorites.length === 0 ? (
        <EmptyState onBrowse={handleBrowse} />
      ) : (
        <>
          {/* Search + Filter */}
          <div className="favorites__controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search your favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <FilterTabs active={filterType} onChange={setFilterType} />
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="favorites__no-results">
              <p>No favorites match "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterType("all");
                }}
                className="btn btn--outline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="favorites__grid">
              {filtered.map((item) =>
                item.type === "food" ? (
                  <FoodCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onReorder={handleReorder}
                  />
                ) : (
                  <RestaurantCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    onVisit={handleVisit}
                  />
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}