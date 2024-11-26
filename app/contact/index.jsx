'use client';
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './contact.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    portfolio: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { client_name, client_email, portfolio, message } = formData;
    if (!client_name) {
      toast.error("Имя не может быть пустым!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: { backgroundColor: 'black', color: 'white' },
      });
      return false;
    }
    if (!client_email || !/\S+@\S+\.\S+/.test(client_email)) {
      toast.error("Пожалуйста, введите корректный email!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: { backgroundColor: 'black', color: 'white' },
      });
      return false;
    }
    if (!message) {
      toast.error("Сообщение не может быть пустым!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: { backgroundColor: 'black', color: 'white' },
      });
      return false;
    }
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Прерываем отправку, если есть ошибки валидации

    setLoading(true);

    emailjs
      .send(
        'service_6ha4lf7', // Service ID
        'template_2fbve54', // Template ID 
        formData,
        'nU1wfnyLZoLgMkqtZ' // Public API key
      )
      .then(
        (response) => {
          setLoading(false);
          toast.success("Сообщение отправлено успешно!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
          });

          // Очистка формы после успешной отправки
          setFormData({
            client_name: '',
            client_email: '',
            portfolio: '',
            message: '',
          });
        },
        (err) => {
          setLoading(false);
          toast.error("Не удалось отправить сообщение", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            style: { backgroundColor: 'black', color: 'white' },
          });
        }
      );
  };

  const handleFormInfo = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="contact-container" id='contact'>
      <ToastContainer />
      <div className="contact-form-container">
        <h2>Связаться с нами</h2>
        <form onSubmit={submit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              onChange={handleFormInfo}
              id="name"
              name="client_name"
              placeholder="Введите ваше имя"
              value={formData.client_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={handleFormInfo}
              id="email"
              name="client_email"
              placeholder="Введите ваш email"
              value={formData.client_email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Сообщение</label>
            <textarea
              id="message"
              onChange={handleFormInfo}
              name="message"
              placeholder="Введите ваше сообщение"
              value={formData.message}
            ></textarea>
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
