'use client';
import './review.scss';
import { FaQuoteLeft, FaHeart } from "react-icons/fa";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    name: 'Michal Gun',
    position: 'Head of Sales at Tesla',
    image: '/images/Avater-1.png',
    rating: 5,
    feedback:
      'There are many variations of passages of Lorem Ipsum, but the majority have suffered alteration in some form.',
    likes: 0,
  },
  {
    name: 'Aleena White',
    position: 'Accountant at Ozone',
    image: '/images/Avater-2.png',
    rating: 5,
    feedback:
      'If you are going to use a passage of Lorem Ipsum, you need to ensure there isn’t anything embarrassing hidden.',
    likes: 0,
  },
  {
    name: 'Cries Lee',
    position: 'CEO of Montee',
    image: '/images/Avater-3.png',
    rating: 5,
    feedback:
      'The majority have suffered alteration in some form by injected humour, or randomised words.',
    likes: 0,
  },
];

const Testimonials = () => {
  const [likes, setLikes] = useState(testimonials.map((testimonial) => testimonial.likes));
  const { t } = useTranslation();
  const handleLike = (index) => {
    if (likes[index] === 0) {
      const newLikes = [...likes];
      newLikes[index] += 1;
      setLikes(newLikes);
    }
  };
  return (
    <section className="testimonials">
      <h2>{ t('testimonials.title') }</h2>
      <div className="grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="card">
            <div className="like-section">
              <FaHeart
                className="heart"
                onClick={() => handleLike(index)}
                style={{ color: likes[index] > 0 ? 'red' : 'white' }}
              />
              <span className="like-count">{likes[index]}</span>
            </div>
            <div className="header">
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s picture`}
                className="avatar"
              />
              <div>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.position}</p>
                <div className="rating">
                  {'★'.repeat(testimonial.rating).padEnd(5, '☆')}
                </div>
                <div className="line">
                  <FaQuoteLeft className="quote" />
                  <hr />
                </div>
              </div>
            </div>
            <p className="feedback">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

