import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>massimo's deep clone</h1>
    </div>
  );
}

function Menu() {
  return (
    <div className="menu">
      <h2>our menu</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
        illum quia necessitatibus.
      </p>
      <div className="pizzas">
        <Pizza />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      {new Date().toLocaleString("de", { hour: "2-digit", minute: "2-digit" })}{" "}
      We are currently open!
    </footer>
    // return React.createElement(
    //   "footer",
    //   { className: "footer" },
    //   "We are currently open!"
  );
}

function Pizza() {
  const testPizza = pizzaData[0];
  return (
    <div className="pizza">
      <img src={testPizza.photoName} alt={testPizza.name} />
      <div>
        <h3>{testPizza.name}</h3>
        <p>{testPizza.ingredients}</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
