import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with Italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
    badge: "chefs-pick",
    badgeLabel: "Chef's Pick",
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and fresh mozzarella di bufala",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
    badge: "classic",
    badgeLabel: "Classic",
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozzarella, spinach & ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
    badge: "vegetarian",
    badgeLabel: "Vegetarian",
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozzarella, wild mushrooms & onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
    badge: null,
    badgeLabel: null,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozzarella & premium pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
    badge: "popular",
    badgeLabel: "Popular",
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozzarella, ham, arugula & burrata",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
    badge: "premium",
    badgeLabel: "Premium",
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <span className="header__badge">Est. 2024</span>
        <ul className="header__nav-links">
          {["Menu", "Story", "Reserve"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header__hero">
        <span className="header__eyebrow">Benvenuti a</span>
        <h1 className="header__title">
          Fast React
          <br />
          <em>Pizza Co.</em>
        </h1>
        <div className="header__divider" />
        <p className="header__tagline">Artisan · Stone Oven · Organic</p>
      </div>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const available = pizzas.filter((p) => !p.soldOut).length;

  return (
    <main className="menu" id="menu">
      <div className="menu__header">
        <span className="menu__eyebrow">Our Handcrafted Selection</span>
        <h2 className="menu__title">The Menu</h2>

        <div className="menu__meta">
          <div className="menu__meta-line menu__meta-line--left" />
          <span className="menu__meta-text">{available} available today</span>
          <div className="menu__meta-line menu__meta-line--right" />
        </div>

        {pizzas.length > 0 ? (
          <p className="menu__description">
            All crafted from our wood-fired stone oven. Every ingredient is
            organic, sourced directly from Italian artisan producers.
          </p>
        ) : (
          <p className="menu__description">
            We're still perfecting our menu. Please come back soon.
          </p>
        )}
      </div>

      {pizzas.length > 0 && (
        <ul className="pizzas">
          {pizzas.map((pizza, i) => (
            <Pizza pizzaObj={pizza} key={pizza.name} delay={i * 0.08} />
          ))}
        </ul>
      )}
    </main>
  );
}

function Pizza({ pizzaObj, delay }) {
  return (
    <li
      className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <div className="pizza__img-wrapper">
        <img src={pizzaObj.photoName} alt={pizzaObj.name} />
        {pizzaObj.soldOut && (
          <div className="pizza__sold-overlay">Sold Out</div>
        )}
      </div>

      {/* Info */}
      <div className="pizza__info">
        <div className="pizza__title-row">
          <h3>{pizzaObj.name}</h3>
          {pizzaObj.badge && (
            <span className={`pizza__badge pizza__badge--${pizzaObj.badge}`}>
              {pizzaObj.badgeLabel}
            </span>
          )}
        </div>

        <p>{pizzaObj.ingredients}</p>

        <div className="pizza__footer">
          {pizzaObj.soldOut ? (
            <span className="pizza__unavailable">Unavailable Today</span>
          ) : (
            <span className="pizza__price">${pizzaObj.price}</span>
          )}
          {!pizzaObj.soldOut && (
            <button className="pizza__add-btn">Add →</button>
          )}
        </div>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHours = 12;
  const closeHours = 22;
  const isOpen = hour >= openHours && hour < closeHours;

  return (
    <footer className="footer">
      <div className="footer__top-accent" />
      <div className="footer__inner">
        {isOpen ? (
          <Order openHours={openHours} closeHours={closeHours} />
        ) : (
          <Closed openHours={openHours} closeHours={closeHours} />
        )}

        <div className="footer__bottom">
          <p className="footer__copyright">Fast React Pizza Co. © 2026</p>
          <p className="footer__credits">Indonesia</p>
        </div>
      </div>
    </footer>
  );
}

function Order({ openHours, closeHours }) {
  const [showModal, setShowModal] = useState(false);

  const now = new Date();
  const minutesLeft =
    closeHours * 60 - (now.getHours() * 60 + now.getMinutes());
  const hoursLeft = Math.floor(minutesLeft / 60);
  const minsLeft = minutesLeft % 60;

  return (
    <>
      <div className="order">
        <div className="order__status">
          <span className="order__dot order__dot--open" />
          <span className="order__status-label order__status-label--open">
            Currently Open
          </span>
        </div>

        <h3 className="order__heading">Ready to take your order</h3>
        <p className="order__sub">
          Kitchen closes in {hoursLeft}h {minsLeft}m · Order now to secure your
          table
        </p>

        <div className="order__cta-group">
          <button className="btn" onClick={() => setShowModal(true)}>
            Reserve a Table
          </button>
          <button className="btn btn--ghost">Order Online</button>
        </div>
      </div>

      <div className="footer__info-strip">
        {[
          {
            label: "Opening Hours",
            value: `${openHours}:00 — ${closeHours}:00`,
          },
          { label: "Phone", value: "+1 (234) 567-890" },
          { label: "Location", value: "Maros, Sulawesi Selatan" },
        ].map((info) => (
          <div className="footer__info-item" key={info.label}>
            <span className="footer__info-label">{info.label}</span>
            <span className="footer__info-value">{info.value}</span>
          </div>
        ))}
      </div>

      {showModal && <ReservationModal onClose={() => setShowModal(false)} />}
    </>
  );
}

function Closed({ openHours, closeHours }) {
  return (
    <div className="order">
      <div className="order__status">
        <span className="order__dot order__dot--closed" />
        <span className="order__status-label order__status-label--closed">
          Kitchen Closed
        </span>
      </div>

      <h3 className="order__heading">We'll see you tomorrow</h3>
      <p className="order__sub">
        Open daily from {openHours}:00 to {closeHours}:00
      </p>

      <div className="closed-box">
        <span className="closed-box__label">Reserve for tomorrow</span>
        <span className="closed-box__phone">+1 (234) 567-890</span>
      </div>
    </div>
  );
}

function ReservationModal({ onClose }) {
  const [form, setForm] = useState({ name: "", guests: "2", time: "" });

  const fields = [
    {
      label: "Full Name",
      key: "name",
      type: "text",
      placeholder: "Giovanni Rossi",
    },
    { label: "Guests", key: "guests", type: "number", placeholder: "2" },
    { label: "Preferred Time", key: "time", type: "time", placeholder: "" },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(28,26,23,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        animation: "fadeIn 0.25s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--cream)",
          width: "100%",
          maxWidth: "46rem",
          padding: "4rem",
          position: "relative",
          animation: "fadeUp 0.3s ease both",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "2rem",
            right: "2.4rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "2.4rem",
            color: "var(--stone-light)",
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Gold accent bar */}
        <div
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg, var(--gold), var(--gold-light))",
            marginBottom: "3.2rem",
          }}
        />

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "3.2rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            marginBottom: "0.8rem",
          }}
        >
          Reserve Your Table
        </h3>
        <p
          style={{
            fontSize: "1.4rem",
            color: "var(--stone-light)",
            marginBottom: "3.2rem",
            lineHeight: 1.6,
          }}
        >
          Fill in your details and we'll confirm your booking shortly.
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}
        >
          {fields.map((field) => (
            <div
              key={field.key}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                  fontWeight: 500,
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(74,69,64,0.2)")
                }
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "1.5rem",
                  padding: "1.2rem 1.6rem",
                  border: "1px solid rgba(74,69,64,0.2)",
                  background: "var(--white)",
                  outline: "none",
                  transition: "border-color var(--transition)",
                  color: "var(--charcoal)",
                }}
              />
            </div>
          ))}

          <button
            className="btn"
            style={{
              marginTop: "1rem",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
