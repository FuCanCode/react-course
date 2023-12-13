import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

interface IPizza {
  name: string;
  ingredients: string;
  price: number;
  photoName: string;
  soldOut: boolean;
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
  const pizzaDataEmpty = [];

  return (
    <main className="menu">
      <h2>our great menu</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
        illum quia necessitatibus.
      </p>
      {(pizzaData.length > 0 && (
        <ul className="pizzas">
          {pizzaData.map((pizza: IPizza) => {
            return <Pizza pizzaObj={pizza} key={pizza.name} />;
          })}
        </ul>
      )) || <p>Sorry Pizza is out!</p>}
    </main>
  );
}

function Pizza(props: { pizzaObj: IPizza }) {
  return (
    <li className={`pizza ${props.pizzaObj.soldOut && "sold-out"}`}>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>
          {(props.pizzaObj.soldOut && "SOLD OUT") || props.pizzaObj.price}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = 13; //new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return (
    // use camelCase notation for inline css
    <footer className="footer">
      {isOpen && (
        <div className="order">
          <p>{`We are currently open until ${closeHour}:00!`}</p>
          <button className="btn">Order now</button>
        </div>
      )}
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
