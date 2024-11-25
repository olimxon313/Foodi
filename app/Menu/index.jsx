'use client';
import React, { useState } from "react";
import "./menu.scss";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [showMore, setShowMore] = useState(false);

  const menuItems = [
    { title: "Naan Burger", price: "$1.85", description: "Delicious Indian naan with burger fillings.", id: 1, cotegory: "Bread", path: "/images/burger-1.png" },
    { title: "Butter Chicken Taco", price: "$1.15", description: "Classic taco with a butter chicken twist.", id: 2, cotegory: "Rolls", path: "/images/burger-2.png" },
    { title: "Chicken Burger", price: "$2.00", description: "Juicy chicken burger with fresh toppings.", id: 3, cotegory: "Donut", path: "/images/burger-5.png" },
    { title: "Cheese Chicken Naan", price: "$2.50", description: "Naan stuffed with cheese and chicken.", id: 4, cotegory: "Pastry", path: "/images/burger-6.png" },
    { title: "3 Layer Burger", price: "$4.99", description: "Triple-layer burger for the big appetite.", id: 5, cotegory: "Cakes", path: "/images/burger-4.png" },
    { title: "Sandwich", price: "$2.80", description: "Fresh sandwich with veggies and sauces.", id: 6, cotegory: "Cookies", path: "/images/burger-3.png" },
    { title: "Veggie Burger", price: "$1.50", description: "Tasty veggie burger for a healthy choice.", id: 7, cotegory: "Bread", path: "/images/burger-3.png" },
    { title: "Paneer Roll", price: "$2.10", description: "Indian paneer roll with rich flavors.", id: 8, cotegory: "Rolls", path: "/images/burger-5.png" },
    { title: "Chocolate Donut", price: "$1.75", description: "Sweet chocolate donut for dessert lovers.", id: 9, cotegory: "Donut", path: "/images/burger-2.png" },
  ];

  const handleSeeAll = () => {
    if (showMore) {
      setVisibleItemsCount(6);
      setShowMore(false);
    } else {
      setVisibleItemsCount((prevCount) => prevCount + 3);
      setShowMore(true);
    }
  };

  return (
    <div id="menu" className="menu">
      <h2>Our Best & Delicious Menu</h2>
      <div className="tabs">
        {["All", "Bread", "Rolls", "Donut", "Pastry", "Cakes", "Cookies"].map((tab, index) => (
          <button
            key={index}
            className={activeTab === tab ? "active" : ""}
            onClick={() => {
              setActiveTab(tab);
              setVisibleItemsCount(6);
              setShowMore(false);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid">
        {menuItems
          .filter((item) => activeTab === "All" || item.cotegory === activeTab)
          .slice(0, visibleItemsCount)
          .map((item) => (
            <div key={item.id} className="card">
              <div className="image">
                <img src={item.path} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="footer">
                <span>{item.price}</span>
                <button className="cart">🛒</button>
              </div>
            </div>
          ))}
      </div>
      <button className="see-all" onClick={handleSeeAll}>
        {showMore ? "Close All" : "See All"}
      </button>
    </div>
  );
};

export default Menu;
