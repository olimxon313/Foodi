'use client';

import './landing.scss';
import About from './about';
import Menu from './Menu';
import Footer from './Footer';
import Review from './review';
import Conact from './contact';
import FindRestaurant from './FindRestaurant';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main>
      <div className="home">
        <div className="title">
          <h1>
            {t("landing.text-1")
              .split("\n")
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < t("landing.text-1").split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
          </h1>
          <p>
            {t("landing.text-2", {
              defaultValue:
                "Experience the art of culinary perfection. Our passion for cooking brings the finest flavors to your table, crafted with love and the freshest ingredients.",
            })}
          </p>
          <button className="order">{t("landing.button", { defaultValue: "Order Online" })}</button>
        </div>
      </div>
      <About />
      <Menu />
      <div className="stats" id="stats">
        <h1 className="stats-title">{t("stats.title", { defaultValue: "We believe in making quality food" })}</h1>
        <div className="stats-container">
          <div className="stats-item">
            <h1>2M+</h1> <br />
            <p>{t("stats.happyCustomers", { defaultValue: "Happy Customers" })}</p>
          </div>
          <div className="stats-item">
            <h1>98%</h1> <br />
            <p>{t("stats.customerSatisfaction", { defaultValue: "Customer Satisfaction" })}</p>
          </div>
          <div className="stats-item">
            <h1>20+</h1> <br />
            <p>{t("stats.ourBranches", { defaultValue: "Our Branches" })}</p>
          </div>
          <div className="stats-item">
            <h1>100+</h1> <br />
            <p>{t("stats.totalEmployees", { defaultValue: "Total Employees" })}</p>
          </div>
        </div>
      </div>
      <Review />
      <Conact />
      <FindRestaurant />
      <Footer />
    </main>
  );
}
