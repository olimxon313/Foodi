'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import './contact.scss';

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { client_name, client_email, message } = formData;
    if (!client_name) {
      toast.error(t('contact.errors.emptyName'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: { backgroundColor: 'black', color: 'white' },
      });
      return false;
    }
    if (!client_email || !/\S+@\S+\.\S+/.test(client_email)) {
      toast.error(t('contact.errors.invalidEmail'), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        style: { backgroundColor: 'black', color: 'white' },
      });
      return false;
    }
    if (!message) {
      toast.error(t('contact.errors.emptyMessage'), {
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
    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send(
        'service_6ha4lf7',
        'template_2fbve54',
        formData,
        'nU1wfnyLZoLgMkqtZ'
      )
      .then(
        () => {
          setLoading(false);
          toast.success(t('contact.successMessage'), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
          });

          setFormData({
            client_name: '',
            client_email: '',
            message: '',
          });
        },
        () => {
          setLoading(false);
          toast.error(t('contact.errorMessage'), {
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
    <div className="contact-container" id="contact">
      <ToastContainer />
      <div className="contact-form-container">
        <h2>{t('contact.title')}</h2>
        <form onSubmit={submit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">{t('contact.nameLabel')}</label>
            <input
              type="text"
              onChange={handleFormInfo}
              id="name"
              name="client_name"
              placeholder={t('contact.namePlaceholder')}
              value={formData.client_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact.emailLabel')}</label>
            <input
              type="email"
              onChange={handleFormInfo}
              id="email"
              name="client_email"
              placeholder={t('contact.emailPlaceholder')}
              value={formData.client_email}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('contact.messageLabel')}</label>
            <textarea
              id="message"
              onChange={handleFormInfo}
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              value={formData.message}
            ></textarea>
          </div>

          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? t('contact.sending') : t('contact.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
