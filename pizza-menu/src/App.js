import { useState } from "react";

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

export default function App() {
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
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  const [ordered, setOrdered] = useState([]);
  const numOrders = ordered.length;

  function makeOrder(pizza) {
    setOrdered((order) => [...order, pizza]);
  }
  return (
    <main className="menu">
      <div className="titles">
        <h2>Our Menu</h2>
        {numOrders > 0 ? <h2>Orders</h2> : null}
      </div>
      {numPizzas > 0 ? (
        <>
          <div>
            <ul className={numOrders > 0 ? "pizz" : "pizzas"}>
              {pizzas.map((pizza) => (
                <Pizza
                  pizzaObj={pizza}
                  key={pizza.name}
                  onMakeOrder={makeOrder}
                />
              ))}
            </ul>

            {numOrders > 0 ? (
              <ul className="orderd-pizza">
                {ordered.map((orders, i) => (
                  <List orders={orders} key={i} />
                ))}
              </ul>
            ) : null}
          </div>
        </>
      ) : (
        <p>We are still working on our menu please come back later :)</p>
      )}
    </main>
  );
}

function List({ orders }) {
  return (
    <li className="orders">
      <img src={orders.photoName} alt="pizza" className="order-img" />
      <p>{orders.name}</p>
      <p>${orders.price}</p>
      <button className="btn cancel">Cancel</button>
    </li>
  );
}

function Pizza({ pizzaObj, onMakeOrder }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "pizza sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div className="details">
        <h2 className="subTitle">{pizzaObj.name}</h2>
        <p>{pizzaObj.ingredients}</p>
        {pizzaObj.soldOut ? (
          "SOLD OUT"
        ) : (
          <div className="add-order">
            <span>{pizzaObj.price}$</span>
            <button className="btn add" onClick={() => onMakeOrder(pizzaObj)}>
              +
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We are happy to welcome you between {openHour}:00 and {closeHour}:00
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We 're open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}
