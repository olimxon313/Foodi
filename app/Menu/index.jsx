'use client';
import React, { useState, useEffect, useRef } from "react";
import menuItems from '../../db.json';
import "./menu.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { FaCartShopping } from "react-icons/fa6";
const Menu = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [visibleItemsCount, setVisibleItemsCount] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [userId, setUserId] = useState();
  const [userBasket, setUserBasket] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { t } = useTranslation();
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
    if (!productId) {
      return;
    }

    if (!isLogged) {
      toast.error(t("menu.loginError"));
      return;
    }

    if (buttonDisabled) {
      return;
    }

    setButtonDisabled(true);

    try {
      const product = menuItems.find((item) => item.id === productId);
      if (!product) {
        return;
      }

      const response = await fetch(`http://localhost:3001/users/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      const user = await response.json();
      if (!user || !user.basket) {
        return;
      }

      const productExists = user.basket.some((item) => item.id === productId);
      if (productExists) {
        toast.info(t("menu.alreadyInBasket"));
        return;
      }

      const updatedBasket = [...user.basket, product];
      await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...user, basket: updatedBasket }),
      });

      setUserBasket(updatedBasket);
      toast.success(t("menu.itemAdded"));
    } catch (error) {
      console.error("Error adding product to basket:", error);
      toast.error(t("menu.addToBasketError"));
    } finally {
      setTimeout(() => setButtonDisabled(false), 5000);
    }
  }

  return (
    <div id="menu" className="menu" ref={menuRef}>
      <h2>{t("menu.title")}</h2>
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
            {t(`menu.tabs.${tab}`)}
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
                <button
                  onClick={() => handleAddToBasket(item.id)}
                  className="cart"
                  disabled={buttonDisabled}
                >
                 <p style={{ color: "white", fontSize: "18px" }}>🛒</p>
                </button>
              </div>
            </div>
          ))}
      </div>
      <button className="see-all" onClick={handleSeeAll}>
        {showMore ? t("menu.closeAll") : t("menu.seeAll")}
      </button>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Menu;

