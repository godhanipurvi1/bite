import React from "react";
import {
BrowserRouter,
Routes,
Route,
Navigate,
} from "react-router-dom";

/* ================= LAYOUT ================= */

import Dashboard from "./pages/website/Dashboard";

/* ================= WEBSITE PAGES ================= */

import Home from "./pages/website/Home/Home";
import Explore from "./pages/website/Explore/Explore";
import Restaurants from "./pages/website/Restaurants/Restaurants";
import Offers from "./pages/website/Offers/Offers";
import About from "./pages/website/About/About";
import Contact from "./pages/website/Contact/Contact";
import Cart from "./pages/website/Cart/Cart";
import Favorites from "./pages/website/Favorites/Favorites";

/* ================= CHECKOUT PAGES ================= */

import Checkout from "./pages/website/Checkout/Checkout";
import Checkoutaddress from "./pages/website/Checkoutaddress/Checkoutaddress";
import Checkoutaddaddress from "./pages/website/Checkoutaddaddress/Checkoutaddaddress";
import Checkoutpaymentsuccess from "./pages/website/Checkoutpaymentsuccess/Checkoutpaymentsuccess";

/* ================= DETAILS PAGES ================= */

import RestaurantDetails from "./pages/website/RestaurantDetails/RestaurantDetails";
import FoodDetails from "./pages/website/FoodDetails/FoodDetails";

/* ================= ORDER PAGES ================= */

import OrderTracking from "./pages/website/OrderTracking/OrderTracking";

/* ================= INFORMATION PAGES ================= */

import FAQ from "./pages/website/FAQ/FAQ";
import Privacy from "./pages/website/Privacy/Privacy";
import Terms from "./pages/website/Terms/Terms";

/* ================= AUTH PAGES ================= */

import AuthPage from "./pages/auth/Authpage/Authpage";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";

/* ================= CONTEXT PROVIDERS ================= */

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AddressProvider } from "./context/AddressContext";

export default function App() {
return ( <CartProvider> <WishlistProvider> <AddressProvider>

```
      <BrowserRouter>
        <Routes>

          {/* ================= AUTH ROUTES ================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

          <Route
            path="/login"
            element={
              <AuthPage initialMode="login" />
            }
          />

          <Route
            path="/register"
            element={
              <AuthPage initialMode="register" />
            }
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />


          {/* ================= DASHBOARD ROUTES ================= */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          >

            {/* HOME */}

            <Route
              index
              element={<Home />}
            />


            {/* EXPLORE */}

            <Route
              path="explore"
              element={<Explore />}
            />


            {/* RESTAURANTS */}

            <Route
              path="restaurants"
              element={<Restaurants />}
            />


            {/* RESTAURANT DETAILS */}

            <Route
              path="restaurant/:id"
              element={<RestaurantDetails />}
            />


            {/* FOOD DETAILS */}

            <Route
              path="food/:id"
              element={<FoodDetails />}
            />


            {/* OFFERS */}

            <Route
              path="offers"
              element={<Offers />}
            />


            {/* ABOUT */}

            <Route
              path="about"
              element={<About />}
            />


            {/* CONTACT */}

            <Route
              path="contact"
              element={<Contact />}
            />


            {/* CART */}

            <Route
              path="cart"
              element={<Cart />}
            />


            {/* FAVORITES */}

            <Route
              path="favorites"
              element={<Favorites />}
            />


            {/* ================= CHECKOUT ================= */}

            <Route
              path="checkout"
              element={<Checkout />}
            />

            <Route
              path="checkout/address"
              element={<Checkoutaddress />}
            />

            <Route
              path="checkout/add-address"
              element={<Checkoutaddaddress />}
            />

            <Route
              path="checkout/success"
              element={<Checkoutpaymentsuccess />}
            />


            {/* ORDER TRACKING */}

            <Route
              path="order-tracking/:id"
              element={<OrderTracking />}
            />


            {/* INFORMATION PAGES */}

            <Route
              path="faq"
              element={<FAQ />}
            />

            <Route
              path="privacy"
              element={<Privacy />}
            />

            <Route
              path="terms"
              element={<Terms />}
            />

          </Route>


          {/* ================= FALLBACK ================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

        </Routes>
      </BrowserRouter>

    </AddressProvider>
  </WishlistProvider>
</CartProvider>


);
}
