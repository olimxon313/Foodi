'use client';
import React, { useState, useEffect, useRef } from "react";
import "./menu.scss";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]); // Состояние для видимости карточек

  const menuRef = useRef(null); // Ссылка на компонент для отслеживания

  const menuItems = [
    { title: "Naan Burger", price: "$1.85", description: "Delicious Indian naan with burger fillings.", id: 1, category: "Bread", path: "/images/burger-1.png" },
    { title: "Butter Chicken Taco", price: "$1.15", description: "Classic taco with a butter chicken twist.", id: 2, category: "Rolls", path: "/images/burger-2.png" },
    { title: "Chicken Burger", price: "$2.00", description: "Juicy chicken burger with fresh toppings.", id: 3, category: "Donut", path: "/images/burger-5.png" },
    { title: "Cheese Chicken Naan", price: "$2.50", description: "Naan stuffed with cheese and chicken.", id: 4, category: "Pastry", path: "/images/burger-6.png" },
    { title: "3 Layer Burger", price: "$4.99", description: "Triple-layer burger for the big appetite.", id: 5, category: "Cakes", path: "/images/burger-4.png" },
    { title: "Sandwich", price: "$2.80", description: "Fresh sandwich with veggies and sauces.", id: 6, category: "Cookies", path: "/images/burger-3.png" },
    { title: "Veggie Burger", price: "$1.50", description: "Tasty veggie burger for a healthy choice.", id: 7, category: "Bread", path: "/images/burger-3.png" },
    { title: "Paneer Roll", price: "$2.10", description: "Indian paneer roll with rich flavors.", id: 8, category: "Rolls", path: "/images/burger-5.png" },
    { title: "Chocolate Donut", price: "$1.75", description: "Sweet chocolate donut for dessert lovers.", id: 9, category: "Donut", path: "/images/burger-2.png" },
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

  // Функция для отслеживания видимости карточек при прокрутке
  const handleScroll = () => {
    const newVisibleCards = [];
    menuItems.forEach((item, index) => {
      const card = document.getElementById(`card-${item.id}`);
      if (card) {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          newVisibleCards.push(item.id);
        }
      }
    });
    setVisibleCards(newVisibleCards);
  };

  // Подключаем слушатель события прокрутки
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Проверяем состояние сразу при монтировании компонента

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="menu"
      className="menu" // Применяем класс для анимации
      ref={menuRef}
    >
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
          .filter((item) => activeTab === "All" || item.category === activeTab)
          .slice(0, visibleItemsCount)
          .map((item) => (
            <div
              key={item.id}
              id={`card-${item.id}`}
              className={`card ${visibleCards.includes(item.id) ? "visible" : ""}`}
            >
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
