  import React, { useState, useMemo, useCallback } from "react";
  import {
    Search,
    Star,
    Clock,
    MapPin,
    Bike,
    Leaf,
    Tag,
    Grid3x3,
    List,
    ChevronDown,
    Plus,
    Heart,
    Pizza,
    Beef,
    Soup,
    Sandwich,
    IceCreamCone,
    CupSoda,
    Utensils,
    Egg,
    Cake,
  } from "lucide-react";
  import "./Explore.css";

  /* ================= CONSTANTS ================= */

  const CATEGORIES = [
    { id: "all", label: "All", icon: Grid3x3 },
    { id: "pizza", label: "Pizza", icon: Pizza },
    { id: "burger", label: "Burger", icon: Sandwich },
    { id: "chinese", label: "Chinese", icon: Soup },
    { id: "indian", label: "Indian", icon: Utensils },
    { id: "south-indian", label: "South Indian", icon: Egg },
    { id: "desserts", label: "Desserts", icon: Cake },
    { id: "drinks", label: "Drinks", icon: CupSoda },
    { id: "fast-food", label: "Fast Food", icon: Beef },
    { id: "ice-cream", label: "Ice Cream", icon: IceCreamCone },
  ];

  const QUICK_FILTERS = [
    { id: "nearby", label: "Nearby", icon: MapPin },
    { id: "top-rated", label: "Top Rated", icon: Star },
    { id: "fast-delivery", label: "Fast Delivery", icon: Bike },
    { id: "pure-veg", label: "Pure Veg", icon: Leaf },
    { id: "offers", label: "Offers", icon: Tag },
    { id: "open-now", label: "Open Now", icon: Clock },
  ];

  const FOODS = [
    {
      id: 1,
      name: "Margherita Pizza",
      place: "Pizza Palace",
      cat: "pizza",
      rating: 4.6,
      reviews: "2.1K+",
      time: "30-40 min",
      dist: "2.5 km",
      price: 249,
      mrp: 499,
      off: "50% OFF",
      img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=500&q=80",
      veg: true,
    },
    {
      id: 2,
      name: "Zinger Burger",
      place: "Burger Hub",
      cat: "burger",
      rating: 4.5,
      reviews: "980",
      time: "25-35 min",
      dist: "3.2 km",
      price: 189,
      mrp: 315,
      off: "40% OFF",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      veg: false,
    },
    {
      id: 3,
      name: "Chicken Biryani",
      place: "Spice Garden",
      cat: "indian",
      rating: 4.6,
      reviews: "1.2K+",
      time: "35-45 min",
      dist: "4.1 km",
      price: 229,
      mrp: 329,
      off: "30% OFF",
      img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=500&q=80",
      veg: false,
    },
    {
      id: 4,
      name: "White Sauce Pasta",
      place: "Italiano Express",
      cat: "fast-food",
      rating: 4.4,
      reviews: "756",
      time: "20-30 min",
      dist: "2.1 km",
      price: 199,
      mrp: 249,
      off: "20% OFF",
      img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&q=80",
      veg: true,
    },
    {
      id: 5,
      name: "Sushi Platter",
      place: "Sushi World",
      cat: "chinese",
      rating: 4.7,
      reviews: "1.1K+",
      time: "30-40 min",
      dist: "2.8 km",
      price: 399,
      mrp: 615,
      off: "35% OFF",
      img: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&q=80",
      veg: false,
      nonVegTag: true,
    },
    {
      id: 6,
      name: "Veg Schezwan Noodles",
      place: "Wok Express",
      cat: "chinese",
      rating: 4.4,
      reviews: "660",
      time: "20-30 min",
      dist: "2.0 km",
      price: 179,
      mrp: 239,
      off: "25% OFF",
      img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80",
      veg: true,
    },
    {
      id: 7,
      name: "Paneer Tikka",
      place: "Tandoori Treats",
      cat: "indian",
      rating: 4.5,
      reviews: "842",
      time: "30-40 min",
      dist: "3.5 km",
      price: 249,
      mrp: 359,
      off: "30% OFF",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80",
      veg: true,
    },
    {
      id: 8,
      name: "Chocolate Lava Cake",
      place: "Sweet Tooth",
      cat: "desserts",
      rating: 4.8,
      reviews: "920",
      time: "25-35 min",
      dist: "1.8 km",
      price: 149,
      mrp: 175,
      off: "15% OFF",
      img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&q=80",
      veg: true,
    },
    {
      id: 9,
      name: "Choco Ice Cream",
      place: "Frosty Delights",
      cat: "ice-cream",
      rating: 4.6,
      reviews: "512",
      time: "15-25 min",
      dist: "1.2 km",
      price: 99,
      mrp: 110,
      off: "10% OFF",
      img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500&q=80",
      veg: true,
    },
    {
      id: 10,
      name: "Cold Coffee",
      place: "Brew Heaven",
      cat: "drinks",
      rating: 4.3,
      reviews: "430",
      time: "15-20 min",
      dist: "1.0 km",
      price: 129,
      mrp: 159,
      off: "20% OFF",
      img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
      veg: true,
    },
  ];

  const ITEMS_PER_PAGE = 10;

  /* ================= COMPONENTS ================= */

  function FoodCard({ food, isWished, onWish, onAdd }) {
    return (
      <div className="food-card">
        <div className="food-card__media">
          <img src={food.img} alt={food.name} />
          <span className="badge badge--off">{food.off}</span>
          {food.nonVegTag && <span className="badge badge--nonveg">Non-Veg</span>}
          <button
            onClick={() => onWish(food.id)}
            aria-label="Save to wishlist"
            className="food-card__wish"
          >
            <Heart
              className={
                isWished
                  ? "icon-heart icon-heart--filled"
                  : "icon-heart"
              }
            />
          </button>
        </div>
        <div className="food-card__body">
          <div className="food-card__title-row">
            <h3 className="food-card__title">{food.name}</h3>
            <span className="food-card__rating">
              <Star className="icon-star" />
              {food.rating}
            </span>
          </div>
          <p className="food-card__place">{food.place}</p>
          <div className="food-card__meta">
            <span className="meta-item">
              <Clock className="icon-sm" /> {food.time}
            </span>
            <span className="meta-item">
              <MapPin className="icon-sm" /> {food.dist}
            </span>
          </div>
          <div className="food-card__footer">
            <div className="food-card__price">
              <span className="price-now">₹{food.price}</span>
              <span className="price-mrp">₹{food.mrp}</span>
            </div>
            <button onClick={() => onAdd(food.id)} className="btn btn--add">
              <Plus className="icon-sm" /> Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  function CategoryChip({ category, isActive, onClick }) {
    const Icon = category.icon;
    return (
      <button
        onClick={onClick}
        className={`category-chip ${isActive ? "is-active" : ""}`}
      >
        <Icon className="icon-md" />
        <span>{category.label}</span>
      </button>
    );
  }

  function FilterPill({ filter, isActive, onClick }) {
    const Icon = filter.icon;
    return (
      <button
        onClick={onClick}
        className={`filter-pill ${isActive ? "is-active" : ""}`}
      >
        <Icon className="icon-sm" /> {filter.label}
      </button>
    );
  }

  function SearchToolbar({ onSearch, onViewChange, currentView }) {
    return (
      <div className="toolbar">
        <div className="search-box">
          <Search className="search-box__icon" />
          <input
            placeholder="Search for foods, restaurants, cuisines..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <button className="btn btn--primary">Search</button>
        <div className="sort-box">
          Sort By <span>Popularity</span> <ChevronDown className="icon-sm" />
        </div>
        <div className="view-toggle">
          <button
            onClick={() => onViewChange("grid")}
            className={currentView === "grid" ? "is-active" : ""}
          >
            <Grid3x3 className="icon-sm" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={currentView === "list" ? "is-active" : ""}
          >
            <List className="icon-sm" />
          </button>
        </div>
      </div>
    );
  }

  function EmptyState() {
    return (
      <p className="empty-state">
        No foods match your filters. Try clearing a filter.
      </p>
    );
  }

  function LoadMoreButton({ onClick }) {
    return (
      <div className="load-more-wrap">
        <button onClick={onClick} className="btn btn--outline">
          Load More <ChevronDown className="icon-sm" />
        </button>
      </div>
    );
  }

  /* ================= PAGE ================= */

  export default function Explore() {
    const [activeCat, setActiveCat] = useState("all");
    const [activeFilters, setActiveFilters] = useState([]);
    const [wishlist, setWishlist] = useState(new Set());
    const [query, setQuery] = useState("");
    const [view, setView] = useState("grid");
    const [visible, setVisible] = useState(ITEMS_PER_PAGE);

    const toggleFilter = useCallback((id) => {
      setActiveFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    }, []);

    const toggleWish = useCallback((id) => {
      setWishlist((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }, []);

    const filtered = useMemo(() => {
      return FOODS.filter((f) => {
        const matchCat = activeCat === "all" || f.cat === activeCat;
        const matchQuery =
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.place.toLowerCase().includes(query.toLowerCase());
        const matchVeg = !activeFilters.includes("pure-veg") || f.veg;
        return matchCat && matchQuery && matchVeg;
      });
    }, [activeCat, query, activeFilters]);

    const handleLoadMore = () => setVisible((v) => v + ITEMS_PER_PAGE);

    return (
      <div className="page page--explore">
        <div className="e-ticket">
          <div className="e-ticket__perforation" />
          <div className="e-ticket__body">
            <p className="e-ticket__eyebrow">Browse The Menu</p>
            <h1 className="e-ticket__headline">
              Explore <span>Foods</span>
            </h1>
            <p className="e-ticket__sub">
              Discover the best food from top restaurants near you
            </p>
          </div>
          <div className="e-ticket__perforation e-ticket__perforation--bottom" />
        </div>

        <div className="explore-body">
          <SearchToolbar
            onSearch={setQuery}
            onViewChange={setView}
            currentView={view}
          />

          <div className="category-row">
            {CATEGORIES.map((c) => (
              <CategoryChip
                key={c.id}
                category={c}
                isActive={activeCat === c.id}
                onClick={() => setActiveCat(c.id)}
              />
            ))}
          </div>

          <div className="filter-row">
            {QUICK_FILTERS.map((f) => (
              <FilterPill
                key={f.id}
                filter={f}
                isActive={activeFilters.includes(f.id)}
                onClick={() => toggleFilter(f.id)}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={view === "grid" ? "food-grid" : "food-list"}>
              {filtered.slice(0, visible).map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  isWished={wishlist.has(food.id)}
                  onWish={toggleWish}
                  onAdd={() => {}}
                />
              ))}
            </div>
          )}

          {visible < filtered.length && (
            <LoadMoreButton onClick={handleLoadMore} />
          )}
        </div>
      </div>
    );
  }