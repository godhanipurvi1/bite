import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Heart,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Restaurants.css";

/* ================= CONSTANTS ================= */

const CATEGORIES = [
  { key: "all", label: "All", icon: "🍽️" },
  { key: "pizza", label: "Pizza", icon: "🍕" },
  { key: "burger", label: "Burger", icon: "🍔" },
  { key: "chinese", label: "Chinese", icon: "🥡" },
  { key: "indian", label: "Indian", icon: "🍛" },
  { key: "southIndian", label: "South Indian", icon: "🥞" },
  { key: "desserts", label: "Desserts", icon: "🍰" },
  { key: "drinks", label: "Drinks", icon: "🥤" },
  { key: "fastFood", label: "Fast Food", icon: "🍟" },
  { key: "pureVeg", label: "Pure Veg", icon: "🥗" },
];

const FILTER_CHIPS = [
  { key: "nearby", label: "Nearby", icon: MapPin },
  { key: "topRated", label: "Top Rated", icon: Star },
  { key: "fastDelivery", label: "Fast Delivery", icon: Clock },
  { key: "pureVeg", label: "Pure Veg" },
  { key: "offers", label: "Offers" },
  { key: "openNow", label: "Open Now", icon: Clock },
];

const CUISINE_OPTIONS = [
  "Italian",
  "Chinese",
  "Indian",
  "American",
  "South Indian",
];

const RATING_OPTIONS = [
  { value: 4.5, label: "4.5 & above" },
  { value: 4.0, label: "4.0 & above" },
  { value: 3.5, label: "3.5 & above" },
  { value: 3.0, label: "3.0 & above" },
];

const DELIVERY_TIME_OPTIONS = [
  { key: "lt20", label: "Less than 20 min" },
  { key: "20-30", label: "20-30 min" },
  { key: "30-45", label: "30-45 min" },
  { key: "gt45", label: "More than 45 min" },
];

const RESTAURANTS = [
  {
    id: "pizza-palace",
    name: "Pizza Palace",
    category: "pizza",
    cuisines: "Italian, Pizza, Fast Food",
    rating: 4.6,
    reviews: "1.2K+",
    time: "30-40 min",
    timeMin: 35,
    distance: "2.5 km",
    badge: "50% OFF",
    badgeTone: "discount",
    offer: "50% OFF up to ₹120",
    delivery: "Free Delivery",
    isVeg: false,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&q=80",
  },
  {
    id: "green-bowl",
    name: "Green Bowl",
    category: "pureVeg",
    cuisines: "North Indian, Chinese",
    rating: 4.5,
    reviews: "890+",
    time: "25-35 min",
    timeMin: 30,
    distance: "1.8 km",
    badge: "Pure Veg",
    badgeTone: "veg",
    offer: "10% OFF up to ₹80",
    delivery: "Free Delivery",
    isVeg: true,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
  },
  {
    id: "burger-hub",
    name: "Burger Hub",
    category: "burger",
    cuisines: "American, Burger, Fast Food",
    rating: 4.7,
    reviews: "2.1K+",
    time: "20-30 min",
    timeMin: 25,
    distance: "2.1 km",
    badge: "40% OFF",
    badgeTone: "discount",
    offer: "40% OFF up to ₹150",
    delivery: "Free Delivery",
    isVeg: false,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
  },
  {
    id: "sushi-world",
    name: "Sushi World",
    category: "chinese",
    cuisines: "Japanese, Sushi, Asian",
    rating: 4.6,
    reviews: "640+",
    time: "35-45 min",
    timeMin: 40,
    distance: "3.2 km",
    badge: "30% OFF",
    badgeTone: "discount",
    offer: "30% OFF up to ₹100",
    delivery: "₹40 Delivery Fee",
    isVeg: false,
    isOpen: false,
    img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80",
  },
  {
    id: "biryani-house",
    name: "Biryani House",
    category: "indian",
    cuisines: "Biryani, Mughlai, North Indian",
    rating: 4.5,
    reviews: "1.5K+",
    time: "25-35 min",
    timeMin: 30,
    distance: "1.6 km",
    badge: "20% OFF",
    badgeTone: "discount",
    offer: "20% OFF up to ₹60",
    delivery: "Free Delivery",
    isVeg: false,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80",
  },
  {
    id: "dosa-corner",
    name: "Dosa Corner",
    category: "southIndian",
    cuisines: "South Indian, Pure Veg",
    rating: 4.4,
    reviews: "720+",
    time: "20-30 min",
    timeMin: 25,
    distance: "1.2 km",
    badge: "Pure Veg",
    badgeTone: "veg",
    offer: "10% OFF up to ₹50",
    delivery: "Free Delivery",
    isVeg: true,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1630383249896-483066210586?w=500&q=80",
  },
  {
    id: "wok-express",
    name: "Wok Express",
    category: "chinese",
    cuisines: "Chinese, Thai, Asian",
    rating: 4.3,
    reviews: "410+",
    time: "30-40 min",
    timeMin: 35,
    distance: "2.7 km",
    badge: "15% OFF",
    badgeTone: "discount",
    offer: "15% OFF up to ₹70",
    delivery: "₹30 Delivery Fee",
    isVeg: false,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
  },
  {
    id: "sweet-treats",
    name: "Sweet Treats",
    category: "desserts",
    cuisines: "Desserts, Cakes, Ice Cream",
    rating: 4.7,
    reviews: "980+",
    time: "25-35 min",
    timeMin: 30,
    distance: "1.4 km",
    badge: "Pure Veg",
    badgeTone: "veg",
    offer: "Flat ₹40 OFF",
    delivery: "Free Delivery",
    isVeg: true,
    isOpen: true,
    img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80",
  },
];

const PAGE_SIZE = 4;

/* ================= COMPONENTS ================= */

function SearchBox({ value, onChange }) {
  return (
    <div className="bv-search">
      <Search size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for restaurants, cuisines..."
      />
    </div>
  );
}

function CategoryButton({ category, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bv-cat ${isActive ? "active" : ""}`}
    >
      <span className="bv-cat-icon">{category.icon}</span>
      <span>{category.label}</span>
    </button>
  );
}

function QuickFilterChip({ filter, isActive, onClick }) {
  const Icon = filter.icon;
  return (
    <button
      onClick={onClick}
      className={`bv-chip ${isActive ? "active" : ""}`}
    >
      {Icon && <Icon size={14} />}
      {filter.label}
    </button>
  );
}

function SortDropdown({ value, onChange }) {
  return (
    <div className="bv-sort-dropdown">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option value="time">Delivery Time</option>
        <option value="offers">Offers</option>
      </select>
    </div>
  );
}

function FilterSidebar({
  cuisines,
  onCuisineChange,
  minRating,
  onRatingChange,
  deliveryTimes,
  onDeliveryTimeChange,
  onReset,
}) {
  return (
    <aside className="bv-filters">
      <div className="bv-filters-head">
        <h3>Filters</h3>
        <button onClick={onReset} className="bv-reset">
          Reset
        </button>
      </div>

      <div className="bv-filter-group">
        <h4>Cuisines</h4>
        {CUISINE_OPTIONS.map((label) => (
          <label key={label} className="bv-check-row">
            <span className="bv-check-left">
              <input
                type="checkbox"
                checked={cuisines.includes(label)}
                onChange={() => onCuisineChange(label)}
              />
              <span>{label}</span>
            </span>
          </label>
        ))}
      </div>

      <div className="bv-filter-group">
        <h4>Rating</h4>
        {RATING_OPTIONS.map((option) => (
          <label key={option.value} className="bv-check-row">
            <span className="bv-check-left">
              <input
                type="radio"
                name="rating"
                checked={minRating === option.value}
                onChange={() => onRatingChange(option.value)}
              />
              <span className="bv-star-label">
                <Star size={12} className="bv-star-icon" /> {option.label}
              </span>
            </span>
          </label>
        ))}
        <label className="bv-check-row">
          <span className="bv-check-left">
            <input
              type="radio"
              name="rating"
              checked={minRating === 0}
              onChange={() => onRatingChange(0)}
            />
            <span>Any rating</span>
          </span>
        </label>
      </div>

      <div className="bv-filter-group">
        <h4>Delivery Time</h4>
        {DELIVERY_TIME_OPTIONS.map(({ key, label }) => (
          <label key={key} className="bv-check-row">
            <span className="bv-check-left">
              <input
                type="checkbox"
                checked={deliveryTimes.includes(key)}
                onChange={() => onDeliveryTimeChange(key)}
              />
              <span>{label}</span>
            </span>
          </label>
        ))}
      </div>
    </aside>
  );
}

function RestaurantCard({ restaurant, isWished, onWish, onOpen }) {
  return (
    <div className="bv-card" onClick={() => onOpen(restaurant)}>
      <div className="bv-card-media">
        <img src={restaurant.img} alt={restaurant.name} />
        <span className={`bv-badge bv-badge-${restaurant.badgeTone}`}>
          {restaurant.badge}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWish(restaurant.id);
          }}
          className={`bv-fav ${isWished ? "active" : ""}`}
          aria-label="Toggle wishlist"
        >
          <Heart size={15} />
        </button>
        {!restaurant.isOpen && (
          <span className="bv-closed-tag">Closed now</span>
        )}
      </div>

      <div className="bv-card-body">
        <div className="bv-card-title-row">
          <h4>{restaurant.name}</h4>
          <span className="bv-meta-rating">
            <Star size={12} /> {restaurant.rating}
          </span>
        </div>
        <p className="bv-card-cuisines">{restaurant.cuisines}</p>

        <div className="bv-card-meta">
          <span>
            <Clock size={12} /> {restaurant.time}
          </span>
          <span>
            <MapPin size={12} /> {restaurant.distance}
          </span>
          <span className="bv-card-delivery">{restaurant.delivery}</span>
        </div>

        <div
          className={`bv-offer ${restaurant.isVeg ? "bv-offer-veg" : ""}`}
        >
          {restaurant.offer}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }) {
  return (
    <div className="bv-empty">
      <p className="bv-empty-title">No restaurants match your filters</p>
      <p className="bv-empty-text">
        Try clearing a filter or searching something else.
      </p>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="bv-pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="bv-page-nav"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`bv-page ${currentPage === n ? "active" : ""}`}
        >
          {n}
        </button>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="bv-page-nav"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ================= PAGE ================= */

export default function Restaurants() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFilters, setActiveFilters] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]);

  const toggleFilter = useCallback((key) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
    setPage(1);
  }, []);

  const toggleCuisine = useCallback((label) => {
    setCuisineFilter((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
    setPage(1);
  }, []);

  const toggleDeliveryTime = useCallback((key) => {
    setDeliveryTime((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
    setPage(1);
  }, []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategory("all");
    setActiveFilters([]);
    setCuisineFilter([]);
    setMinRating(0);
    setDeliveryTime([]);
    setSearchQuery("");
    setPage(1);
  }, []);

  const filtered = useMemo(() => {
    let list = [...RESTAURANTS];

    if (activeCategory !== "all") {
      list = list.filter((r) => r.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisines.toLowerCase().includes(q)
      );
    }

    if (cuisineFilter.length) {
      list = list.filter((r) =>
        cuisineFilter.some((c) => r.cuisines.includes(c))
      );
    }

    if (minRating) {
      list = list.filter((r) => r.rating >= minRating);
    }

    if (deliveryTime.length) {
      list = list.filter((r) =>
        deliveryTime.some((d) => {
          if (d === "lt20") return r.timeMin < 20;
          if (d === "20-30") return r.timeMin >= 20 && r.timeMin <= 30;
          if (d === "30-45") return r.timeMin > 30 && r.timeMin <= 45;
          if (d === "gt45") return r.timeMin > 45;
          return true;
        })
      );
    }

    if (activeFilters.includes("topRated")) {
      list = list.filter((r) => r.rating >= 4.5);
    }
    if (activeFilters.includes("fastDelivery")) {
      list = list.filter((r) => r.timeMin <= 30);
    }
    if (activeFilters.includes("pureVeg")) {
      list = list.filter((r) => r.isVeg);
    }
    if (activeFilters.includes("offers")) {
      list = list.filter((r) => r.badgeTone === "discount");
    }
    if (activeFilters.includes("openNow")) {
      list = list.filter((r) => r.isOpen);
    }

    switch (sortBy) {
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "time":
        list.sort((a, b) => a.timeMin - b.timeMin);
        break;
      case "offers":
        list.sort(
          (a, b) =>
            (b.badgeTone === "discount") - (a.badgeTone === "discount")
        );
        break;
      default:
        list.sort((a, b) => parseFloat(b.reviews) - parseFloat(a.reviews));
    }

    return list;
  }, [activeCategory, searchQuery, cuisineFilter, minRating, deliveryTime, activeFilters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const paged = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  return (
    <div className="bv">
      <div className="bv-hero">
        <div className="bv-hero__perforation" />
        <div className="bv-hero__body">
          <p className="bv-hero__eyebrow">Find A Kitchen</p>
          <h1>
            Top <span className="bv-accent">Restaurants</span> Near You
          </h1>
          <p>Discover top rated restaurants, fast delivery and great food</p>
        </div>
        <div className="bv-hero__perforation bv-hero__perforation--bottom" />
      </div>

      <div className="bv-main">
        <SearchBox value={searchQuery} onChange={handleSearch} />

        <div className="bv-categories">
          {CATEGORIES.map((c) => (
            <CategoryButton
              key={c.key}
              category={c}
              isActive={activeCategory === c.key}
              onClick={() => {
                setActiveCategory(c.key);
                setPage(1);
              }}
            />
          ))}
        </div>

        <div className="bv-quickbar">
          <div className="bv-quick-filters">
            {FILTER_CHIPS.map((f) => (
              <QuickFilterChip
                key={f.key}
                filter={f}
                isActive={activeFilters.includes(f.key)}
                onClick={() => toggleFilter(f.key)}
              />
            ))}
          </div>
          <div className="bv-sort">
            <span>Sort By</span>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        <div className="bv-body">
          <FilterSidebar
            cuisines={cuisineFilter}
            onCuisineChange={toggleCuisine}
            minRating={minRating}
            onRatingChange={(rating) => {
              setMinRating(rating);
              setPage(1);
            }}
            deliveryTimes={deliveryTime}
            onDeliveryTimeChange={toggleDeliveryTime}
            onReset={resetFilters}
          />

          <div className="bv-grid-wrap">
            {paged.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <>
                <div className="bv-grid">
                  {paged.map((r) => (
                    <RestaurantCard
                      key={r.id}
                      restaurant={r}
                      isWished={wishlist.includes(r.id)}
                      onWish={toggleWishlist}
                      onOpen={() => navigate(`/dashboard/restaurants/${r.id}`)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={pageSafe}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}