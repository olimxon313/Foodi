'use client';
import React, { useState, useEffect, useRef } from "react";
import menuItems from '../../db.json';
import "./menu.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [userId, setUserId] = useState();
  const [userBasket, setUserBasket] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("id");
    setIsLogged(!!storedToken);
    setUserId(storedId);
  }, []);

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

  async function handleAddToBasket(productId) {
    if (isLogged) {
      try {
        const product = menuItems.find((item) => item.id === productId);
        if (!product) {
          toast.error("Product not found.");
          return;
        }
  
        const response = await fetch(`http://localhost:3001/users/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user data");
        const user = await response.json();
  
        const productExists = user.basket?.some((item) => item.id === productId);
        if (productExists) {
          toast.error("Product is already in the basket.");
          return;
        }
  
        const updatedBasket = user.basket
          ? [...user.basket, product] 
          : [product];
  
        await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...user, basket: updatedBasket }),
        });

        setUserBasket(updatedBasket);
        toast.success("Product added to basket: " + product.title);
      } catch (error) {
        toast.error("Error adding product to basket: " + error.message);
      }
    } else {
      toast.error("User is not logged in.");
    }
  }
  

  return (
    <div id="menu" className="menu" ref={menuRef}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                <button onClick={() => handleAddToBasket(item.id)} className="cart">🛒</button>
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
