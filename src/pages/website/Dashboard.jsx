import React, { useState, useRef, useEffect } from "react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Utensils,
  X,
  Clock,
  TrendingUp,
} from "lucide-react";

import "./Dashboard.css";

/* ======================================================
   NAVIGATION ITEMS
====================================================== */

const NAV_ITEMS = [
  { label: "Home", to: "/dashboard" },
  { label: "Explore", to: "/dashboard/explore" },
  { label: "Restaurants", to: "/dashboard/restaurants" },
  { label: "Offers", to: "/dashboard/offers" },
  { label: "About", to: "/dashboard/about" },
  { label: "Contact", to: "/dashboard/contact" },
];

/* ======================================================
   LOCATIONS
====================================================== */

const LOCATIONS = [
  { city: "Mumbai", state: "Maharashtra", zone: "South Mumbai" },
  { city: "Delhi", state: "Delhi", zone: "Central Delhi" },
  { city: "Bangalore", state: "Karnataka", zone: "Whitefield" },
  { city: "Pune", state: "Maharashtra", zone: "Hinjewadi" },
  { city: "Hyderabad", state: "Telangana", zone: "Jubilee Hills" },
];

/* ======================================================
   MOCK SEARCH DATABASE
====================================================== */

const SEARCH_DATABASE = [
  // Foods
  { id: 1, type: "food", name: "Margherita Pizza", restaurant: "Pizza Palace" },
  { id: 2, type: "food", name: "Chicken Biryani", restaurant: "Spice Garden" },
  { id: 3, type: "food", name: "Paneer Tikka", restaurant: "Tandoori Treats" },
  { id: 4, type: "food", name: "Butter Chicken", restaurant: "Spice Garden" },
  { id: 5, type: "food", name: "Samosa", restaurant: "Street Foods" },
  { id: 6, type: "food", name: "Chocolate Cake", restaurant: "Sweet Treats" },
  { id: 7, type: "food", name: "Sushi Roll", restaurant: "Sushi World" },
  { id: 8, type: "food", name: "Burger", restaurant: "Burger Hub" },
  { id: 9, type: "food", name: "Dosa", restaurant: "South Indian Kitchen" },
  { id: 10, type: "food", name: "Ramen", restaurant: "Asian Kitchen" },

  // Restaurants
  { id: 11, type: "restaurant", name: "Pizza Palace", cuisine: "Italian" },
  { id: 12, type: "restaurant", name: "Spice Garden", cuisine: "Indian" },
  { id: 13, type: "restaurant", name: "Tandoori Treats", cuisine: "Indian" },
  { id: 14, type: "restaurant", name: "Sweet Treats", cuisine: "Desserts" },
  { id: 15, type: "restaurant", name: "Sushi World", cuisine: "Japanese" },
  { id: 16, type: "restaurant", name: "Burger Hub", cuisine: "Fast Food" },
  { id: 17, type: "restaurant", name: "Asian Kitchen", cuisine: "Asian" },
  { id: 18, type: "restaurant", name: "Street Foods", cuisine: "Indian" },
];

/* ======================================================
   SEARCH SUGGESTIONS (Popular/Trending)
====================================================== */

const POPULAR_SEARCHES = [
  "Pizza",
  "Biryani",
  "Burger",
  "Chinese",
  "Desserts",
  "Fast Food",
];

/* ======================================================
   DASHBOARD
====================================================== */

export default function Dashboard() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  // STATE MANAGEMENT
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [location, setLocation] = useState(LOCATIONS[0]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState(LOCATIONS);
  const [locationSearch, setLocationSearch] = useState("");

  // Demo counts
  const cartCount = 2;
  const wishCount = 0;

  /* ====================================================
     SEARCH FUNCTIONALITY
  ==================================================== */

  // Handle search input change
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    // Filter search results
    const results = SEARCH_DATABASE.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.restaurant.toLowerCase().includes(query.toLowerCase()) ||
        item.cuisine?.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchDropdown(true);
  };

  // Handle search submit
  const handleSearchSubmit = (event) => {
    if (event.key === "Enter") {
      performSearch(searchQuery);
    }
  };

  // Perform search and navigate
  const performSearch = (query) => {
    if (query.trim() === "") return;

    // Add to search history
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, 10); // Keep last 10
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    // Navigate with query parameter
    navigate(`/dashboard/explore?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  // Handle search result click
  const handleSearchResultClick = (item) => {
    performSearch(item.name);
  };

  // Handle popular search click
  const handlePopularSearchClick = (term) => {
    setSearchQuery(term);
    performSearch(term);
  };

  // Clear search history
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ====================================================
     LOCATION FUNCTIONALITY
  ==================================================== */

  // Handle location search
  const handleLocationSearch = (e) => {
    const query = e.target.value;
    setLocationSearch(query);

    if (query.trim() === "") {
      setFilteredLocations(LOCATIONS);
      return;
    }

    const filtered = LOCATIONS.filter(
      (loc) =>
        loc.city.toLowerCase().includes(query.toLowerCase()) ||
        loc.state.toLowerCase().includes(query.toLowerCase()) ||
        loc.zone.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  // Handle location selection
  const handlePickLocation = (locationObj) => {
    setLocation(locationObj);
    setLocationOpen(false);
    setLocationSearch("");
    setFilteredLocations(LOCATIONS);
  };

  /* ====================================================
     RENDER SEARCH SUGGESTIONS
  ==================================================== */

  const renderSearchDropdown = () => {
    return (
      <div className="search-dropdown" ref={searchResultsRef}>
        {searchQuery.trim() ? (
          // Search Results
          <>
            {searchResults.length > 0 ? (
              <>
                <div className="search-dropdown__section">
                  <div className="search-dropdown__title">
                    Results ({searchResults.length})
                  </div>
                  <div className="search-dropdown__items">
                    {searchResults.slice(0, 8).map((item) => (
                      <button
                        key={item.id}
                        className="search-dropdown__item"
                        onClick={() => handleSearchResultClick(item)}
                      >
                        <div className="search-dropdown__item-icon">
                          {item.type === "food" ? "🍽️" : "🏪"}
                        </div>
                        <div className="search-dropdown__item-content">
                          <div className="search-dropdown__item-name">
                            {item.name}
                          </div>
                          <div className="search-dropdown__item-meta">
                            {item.type === "food"
                              ? item.restaurant
                              : item.cuisine}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {searchResults.length > 8 && (
                  <button
                    className="search-dropdown__viewmore"
                    onClick={() => performSearch(searchQuery)}
                  >
                    View all {searchResults.length} results
                  </button>
                )}
              </>
            ) : (
              <div className="search-dropdown__empty">
                <div className="search-dropdown__empty-icon">🔍</div>
                <div className="search-dropdown__empty-text">
                  No results for "{searchQuery}"
                </div>
              </div>
            )}
          </>
        ) : (
          // Suggestions when no query
          <>
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="search-dropdown__section">
                <div className="search-dropdown__section-header">
                  <div className="search-dropdown__title">
                    <Clock size={14} />
                    Recent Searches
                  </div>
                  <button
                    className="search-dropdown__clear"
                    onClick={clearSearchHistory}
                  >
                    Clear
                  </button>
                </div>
                <div className="search-dropdown__items">
                  {searchHistory.slice(0, 5).map((term, idx) => (
                    <button
                      key={idx}
                      className="search-dropdown__item"
                      onClick={() => handlePopularSearchClick(term)}
                    >
                      <Clock size={14} />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="search-dropdown__section">
              <div className="search-dropdown__title">
                <TrendingUp size={14} />
                Trending Now
              </div>
              <div className="search-dropdown__items">
                {POPULAR_SEARCHES.map((term, idx) => (
                  <button
                    key={idx}
                    className="search-dropdown__item"
                    onClick={() => handlePopularSearchClick(term)}
                  >
                    <TrendingUp size={14} />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="app">

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="header">

        <div className="header__stub">

          <div className="header__row">

            {/* LOGO */}

            <button
              className="brand"
              onClick={() => navigate("/dashboard")}
              aria-label="Go to Home"
            >
              <span className="brand__stamp">
                <Utensils size={18} />
              </span>

              <span className="brand__text">
                <span className="brand__name">
                  Bite
                  <span className="brand__accent">Verse</span>
                </span>
                <span className="brand__tagline">
                  Delicious food, delivered fast
                </span>
              </span>
            </button>

            {/* DESKTOP NAVIGATION */}

            <nav className="nav nav--desktop">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/dashboard"}
                  className={({ isActive }) =>
                    isActive ? "nav__item is-active" : "nav__item"
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* HEADER ACTIONS */}

            <div className="header__actions">

              {/* LOCATION PICKER */}

              <div className="location-dropdown">
                <button
                  className="location-pill"
                  type="button"
                  onClick={() => setLocationOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={locationOpen}
                  title={`${location.city}, ${location.zone}`}
                >
                  <MapPin size={15} />
                  <span>{location.city}</span>
                  <ChevronDown size={14} />
                </button>

                {locationOpen && (
                  <div className="location-dropdown__menu">
                    {/* Search Input */}
                    <div className="location-dropdown__search">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Search city or area..."
                        value={locationSearch}
                        onChange={handleLocationSearch}
                        autoFocus
                      />
                      {locationSearch && (
                        <button
                          className="location-dropdown__clear"
                          onClick={() => {
                            setLocationSearch("");
                            setFilteredLocations(LOCATIONS);
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {/* Locations List */}
                    <ul className="location-dropdown__list">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc) => (
                          <li key={loc.city}>
                            <button
                              type="button"
                              className={`location-item ${
                                loc.city === location.city ? "is-active" : ""
                              }`}
                              onClick={() => handlePickLocation(loc)}
                            >
                              <div className="location-item__pin">
                                <MapPin size={16} />
                              </div>
                              <div className="location-item__info">
                                <div className="location-item__city">
                                  {loc.city}
                                </div>
                                <div className="location-item__zone">
                                  {loc.zone}
                                </div>
                              </div>
                              {loc.city === location.city && (
                                <div className="location-item__check">✓</div>
                              )}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="location-dropdown__empty">
                          No locations found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* SEARCH */}

              <div className={`search-slot ${searchOpen ? "is-open" : ""}`}>
                <button
                  className="icon-btn"
                  aria-label="Search"
                  type="button"
                  onClick={() => setSearchOpen((value) => !value)}
                >
                  <Search size={18} />
                </button>

                <input
                  ref={searchInputRef}
                  className="search-slot__input"
                  type="text"
                  placeholder="Search dishes, restaurants..."
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={handleSearchSubmit}
                  onFocus={() => setShowSearchDropdown(true)}
                  aria-autocomplete="list"
                  aria-expanded={showSearchDropdown}
                />

                {searchQuery && (
                  <button
                    className="search-slot__clear"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setShowSearchDropdown(false);
                    }}
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}

                {showSearchDropdown && renderSearchDropdown()}
              </div>

              {/* FAVORITES */}

              <button
                className="icon-btn"
                aria-label="Favorites"
                type="button"
                onClick={() => navigate("/dashboard/favorites")}
              >
                <Heart size={18} />
                {wishCount > 0 && (
                  <span className="count-badge count-badge--saffron">
                    {wishCount}
                  </span>
                )}
              </button>

              {/* CART */}

              <button
                className="icon-btn"
                aria-label="Cart"
                type="button"
                onClick={() => navigate("/dashboard/cart")}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="count-badge count-badge--chili">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* LOGIN */}

              <button
                className="login-btn"
                type="button"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>

            </div>

          </div>

          {/* MOBILE NAVIGATION */}

          <nav className="nav nav--mobile">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/dashboard"}
                className={({ isActive }) =>
                  isActive ? "nav__chip is-active" : "nav__chip"
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

        </div>

        <div className="header__perforation" aria-hidden="true" />

      </header>

      {/* PAGE CONTENT */}

      <main className="main">
        <div className="main__inner">
          <Outlet />
        </div>
      </main>

      {/* FOOTER */}

      <footer className="footer">
        <span className="footer__stamp" aria-hidden="true" />
        © {new Date().getFullYear()} BiteVerse. All rights reserved.
      </footer>

    </div>
  );
}