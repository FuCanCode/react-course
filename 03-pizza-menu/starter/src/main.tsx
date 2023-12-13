import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface IPizza {
  name: string;
  ingredients: string;
  price: number | string;
  photoName: string;
  soldOut?: boolean | string;
}

const pizzaData: IPizza[] = [
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
      <h1>massimo's deep clone</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>our great menu</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
        illum quia necessitatibus.
      </p>
      <div className="pizzas">
        {pizzaData.map((pizza) => {
          return (
            <Pizza
              name={pizza.name}
              ingredients={pizza.ingredients}
              photoName={pizza.photoName}
              price={!pizza.soldOut ? pizza.price : "Sold Out :("}
            />
          );
        })}
      </div>
    </main>
  );
}

function Pizza(props: IPizza) {
  console.log(props);
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price.toString()}</span>
      </div>
    </div>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const openOrClose = hour >= openHour && hour <= closeHour ? "open" : "close";

  return (
    // use camelCase notation for inline css
    <footer
      className="footer"
      style={{ color: "orangered", fontSize: "large" }}
    >
      {hour} We are currently {openOrClose}!
    </footer>
    // return React.createElement(
    //   "footer",
    //   { className: "footer" },
    //   "We are currently open!"
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
