import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  User,
  Utensils,
  Check,
  AlertCircle,
} from "lucide-react";
import "./Authpage.css";

const PERKS = [
  "Free delivery on your first order",
  "500+ restaurants near you",
  "Live order tracking, no surprises",
  "Exclusive member-only offers",
];

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^\d{10}$/.test(value.replace(/\D/g, ""));
}

export default function AuthPage({ initialMode = "login" }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(initialMode); // "login" | "register"
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [login, setLogin] = useState({
    identifier: "",
    password: "",
    remember: false,
  });
  const [register, setRegister] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  function switchMode(next) {
    setMode(next);
    setErrors({});
    setSubmitted(false);
  }

  function updateLogin(field, value) {
    setLogin((prev) => ({ ...prev, [field]: value }));
  }

  function updateRegister(field, value) {
    setRegister((prev) => ({ ...prev, [field]: value }));
  }

  function passwordStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score; // 0-4
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!login.identifier.trim()) {
      nextErrors.identifier = "Enter your email or phone number.";
    } else if (
      login.identifier.includes("@")
        ? !validateEmail(login.identifier)
        : !validatePhone(login.identifier)
    ) {
      nextErrors.identifier = "That doesn't look like a valid email or phone.";
    }
    if (!login.password) {
      nextErrors.password = "Enter your password.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/dashboard");
    }, 900);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    if (!register.name.trim()) nextErrors.name = "Tell us your name.";
    if (!validateEmail(register.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!validatePhone(register.phone)) {
      nextErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (register.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }
    if (register.confirm !== register.password) {
      nextErrors.confirm = "Passwords don't match.";
    }
    if (!register.agree) {
      nextErrors.agree = "You'll need to accept the terms to continue.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  }

  function handleGuestContinue() {
    navigate("/dashboard");
  }

  const strength = passwordStrength(register.password);
  const strengthLabel = ["Weak", "Weak", "Okay", "Good", "Strong"][strength];

  return (
    <div className="auth">
      {/* ================= LEFT: TICKET PANEL ================= */}
      <aside className="auth__ticket">
        <div className="auth__ticket-body">
          <button className="auth__brand" onClick={() => navigate("/dashboard")}>
            <span className="auth__brand-stamp">
              <Utensils size={18} />
            </span>
            <span className="auth__brand-name">
              Bite<span className="auth__brand-accent">Verse</span>
            </span>
          </button>

          <h1 className="auth__headline">
            Good food is better when someone else cooks it.
          </h1>

          <ul className="auth__perks">
            {PERKS.map((perk) => (
              <li key={perk} className="auth__perk">
                <span className="auth__perk-dot" aria-hidden="true" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <div className="auth__ticket-perforation" aria-hidden="true" />
      </aside>

      {/* ================= RIGHT: FORM ================= */}
      <main className="auth__panel">
        <div className="auth__card">
          <div className="auth__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={mode === "login"}
              className={mode === "login" ? "auth__tab is-active" : "auth__tab"}
              onClick={() => switchMode("login")}
            >
              Log in
            </button>
            <button
              role="tab"
              aria-selected={mode === "register"}
              className={
                mode === "register" ? "auth__tab is-active" : "auth__tab"
              }
              onClick={() => switchMode("register")}
            >
              Create account
            </button>
          </div>

          {mode === "login" ? (
            <form className="auth__form" onSubmit={handleLoginSubmit} noValidate>
              <p className="auth__eyebrow">Welcome back</p>

              <label className="field">
                <span className="field__label">Email or phone</span>
                <div
                  className={`field__control ${
                    errors.identifier ? "has-error" : ""
                  }`}
                >
                  <Mail size={16} className="field__icon" />
                  <input
                    type="text"
                    value={login.identifier}
                    onChange={(e) =>
                      updateLogin("identifier", e.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="username"
                  />
                </div>
                {errors.identifier && (
                  <span className="field__error">
                    <AlertCircle size={13} /> {errors.identifier}
                  </span>
                )}
              </label>

              <label className="field">
                <span className="field__label">Password</span>
                <div
                  className={`field__control ${
                    errors.password ? "has-error" : ""
                  }`}
                >
                  <Lock size={16} className="field__icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={login.password}
                    onChange={(e) => updateLogin("password", e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="field__error">
                    <AlertCircle size={13} /> {errors.password}
                  </span>
                )}
              </label>

              <div className="auth__row-between">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={login.remember}
                    onChange={(e) =>
                      updateLogin("remember", e.target.checked)
                    }
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="auth__link">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="auth__submit"
                disabled={submitting}
              >
                {submitting ? "Logging in…" : "Log in"}
              </button>

              <Divider />
              <SocialRow />

              <p className="auth__switch">
                New to BiteVerse?{" "}
                <button type="button" onClick={() => switchMode("register")}>
                  Create an account
                </button>
              </p>
            </form>
          ) : submitted ? (
            <div className="auth__success">
              <span className="auth__success-stamp">
                <Check size={22} />
              </span>
              <h2>Account created</h2>
              <p>
                We've sent a confirmation to <strong>{register.email}</strong>.
                You can log in as soon as you've verified it.
              </p>
              <button
                className="auth__submit"
                onClick={() => switchMode("login")}
              >
                Go to log in
              </button>
            </div>
          ) : (
            <form
              className="auth__form"
              onSubmit={handleRegisterSubmit}
              noValidate
            >
              <p className="auth__eyebrow">Let's get you set up</p>

              <label className="field">
                <span className="field__label">Full name</span>
                <div
                  className={`field__control ${errors.name ? "has-error" : ""}`}
                >
                  <User size={16} className="field__icon" />
                  <input
                    type="text"
                    value={register.name}
                    onChange={(e) => updateRegister("name", e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <span className="field__error">
                    <AlertCircle size={13} /> {errors.name}
                  </span>
                )}
              </label>

              <div className="auth__grid-2">
                <label className="field">
                  <span className="field__label">Email</span>
                  <div
                    className={`field__control ${
                      errors.email ? "has-error" : ""
                    }`}
                  >
                    <Mail size={16} className="field__icon" />
                    <input
                      type="email"
                      value={register.email}
                      onChange={(e) =>
                        updateRegister("email", e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <span className="field__error">
                      <AlertCircle size={13} /> {errors.email}
                    </span>
                  )}
                </label>

                <label className="field">
                  <span className="field__label">Phone</span>
                  <div
                    className={`field__control ${
                      errors.phone ? "has-error" : ""
                    }`}
                  >
                    <Phone size={16} className="field__icon" />
                    <input
                      type="tel"
                      value={register.phone}
                      onChange={(e) =>
                        updateRegister("phone", e.target.value)
                      }
                      placeholder="98765 43210"
                      autoComplete="tel"
                    />
                  </div>
                  {errors.phone && (
                    <span className="field__error">
                      <AlertCircle size={13} /> {errors.phone}
                    </span>
                  )}
                </label>
              </div>

              <label className="field">
                <span className="field__label">Password</span>
                <div
                  className={`field__control ${
                    errors.password ? "has-error" : ""
                  }`}
                >
                  <Lock size={16} className="field__icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={register.password}
                    onChange={(e) =>
                      updateRegister("password", e.target.value)
                    }
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {register.password && (
                  <div className="strength" aria-hidden="true">
                    <div className="strength__track">
                      <div
                        className={`strength__fill strength__fill--${strength}`}
                      />
                    </div>
                    <span className="strength__label">{strengthLabel}</span>
                  </div>
                )}
                {errors.password && (
                  <span className="field__error">
                    <AlertCircle size={13} /> {errors.password}
                  </span>
                )}
              </label>

              <label className="field">
                <span className="field__label">Confirm password</span>
                <div
                  className={`field__control ${
                    errors.confirm ? "has-error" : ""
                  }`}
                >
                  <Lock size={16} className="field__icon" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={register.confirm}
                    onChange={(e) =>
                      updateRegister("confirm", e.target.value)
                    }
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="field__toggle"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={
                      showConfirm ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && (
                  <span className="field__error">
                    <AlertCircle size={13} /> {errors.confirm}
                  </span>
                )}
              </label>

              <label className="checkbox checkbox--terms">
                <input
                  type="checkbox"
                  checked={register.agree}
                  onChange={(e) =>
                    updateRegister("agree", e.target.checked)
                  }
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
              {errors.agree && (
                <span className="field__error">
                  <AlertCircle size={13} /> {errors.agree}
                </span>
              )}

              <button
                type="submit"
                className="auth__submit"
                disabled={submitting}
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>

              <Divider />
              <SocialRow />

              <p className="auth__switch">
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("login")}>
                  Log in
                </button>
              </p>
            </form>
          )}

          {!submitted && (
            <button
              type="button"
              className="auth__guest"
              onClick={handleGuestContinue}
            >
              Continue as guest
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function Divider() {
  return (
    <div className="auth__divider">
      <span />
      <p>or continue with</p>
      <span />
    </div>
  );
}

function SocialRow() {
  return (
    <div className="auth__social">
      <button type="button" className="social-btn">
        <span className="social-btn__mark social-btn__mark--google">G</span>
        Google
      </button>
      <button type="button" className="social-btn">
        <span className="social-btn__mark social-btn__mark--apple">A</span>
        Apple
      </button>
    </div>
  );
}