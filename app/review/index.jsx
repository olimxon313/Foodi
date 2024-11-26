import './review.scss';
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
      name: 'Michal Gun',
      position: 'Head of Sales at Tesla',
      image: '/images/Avater-1.png',
      rating: 5,
      feedback:
        'There are many variations of passages of Lorem Ipsum, but the majority have suffered alteration in some form.',
    },
    {
      name: 'Aleena White',
      position: 'Accountant at Ozone',
      image: '/images/Avater-2.png',  
      rating: 5,
      feedback:
        'If you are going to use a passage of Lorem Ipsum, you need to ensure there isn’t anything embarrassing hidden.',
    },
    {
      name: 'Cries Lee',
      position: 'CEO of Montee',
      image: '/images/Avater-3.png',
      rating: 5,
      feedback:
        'The majority have suffered alteration in some form by injected humour, or randomised words.',
    },
  ];
  
  const Testimonials = () => {
    return (
      <section className="testimonials">
        <h2>What Our Clients Are Saying</h2>
        <div className="grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
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
              <FaQuoteLeft className="quote" />  <hr />
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
  