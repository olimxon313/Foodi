'use client';
import React, { useState, useEffect, useRef } from "react";
import menuItems from '../../db.json'; // Импорт данных из JSON файла
import "./menu.scss";

const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const menuRef = useRef(null);

  const handleSeeAll = () => {
    if (showMore) {
      setVisibleItemsCount(6);
      setShowMore(false);
    } else {
      setVisibleItemsCount((prevCount) => prevCount + 3);
      setShowMore(true);
    }
  };

  const handleScroll = () => {
    const newVisibleCards = [];
    menuItems.forEach((item) => {
      const card = document.getElementById(`cards-${item.id}`);
      if (card) {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          newVisibleCards.push(item.id);
        }
      }
    });
    setVisibleCards(newVisibleCards);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleScroll();
  }, [activeTab]);

  return (
    <div id="menu" className="menu" ref={menuRef}>
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
              id={`cards-${item.id}`}
              className={`cards ${visibleCards.includes(item.id) ? "visible" : ""}`}
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
