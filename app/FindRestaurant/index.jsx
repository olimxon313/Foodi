import './FindRestaurant.scss';

const FindRestaurant = () => {
  return (
    <div className="find-restaurant-container" id="address">
      <div className="find-restaurant-info">
        <h2>Our Restaurants. Where to Find Us?</h2>
        <p>
          Want to have a superb meal in an exceptional setting with family,
          friends or work colleagues, here are the addresses of our restaurants.
        </p>
        <button className="find-restaurant-button">Find The Nearest Cheffest</button>
      </div>
      <div className="find-restaurant-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345090086!2d144.96305791531662!3d-37.81627937975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577691c8c76c1c7!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1698776316206!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default FindRestaurant;
