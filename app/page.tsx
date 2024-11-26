import './landing.scss'
import About from './about';
import Menu from './Menu'
import Footer from './Footer'
import Review from './review'
import Conact from './contact'

export default function Home() {
  return (
    <main>
      <div className="home">
        <div className='title'>
          <h1>
            Welcome! <br />
            We Made Delicious Food for You <br />
          </h1>
          <p>
            Experience the art of culinary perfection. Our passion for cooking brings the finest <br /> flavors to your table, crafted with love and the freshest ingredients.
          </p>
          <button className='order'>Order Online</button>
        </div>
      </div>
      < About />
      <Menu />
      <div className='stats'>
        <h1 className='stats-title'>
          We believe in making quality food
        </h1>
        <div className='stats-container'>
          <div className='stats-item'>
            <h1>2M+</h1> <br />
            <p>Happy Customers </p>
          </div>
          <div className='stats-item'>
          <h1>98%</h1> <br />
            <p>Customer Satisfaction</p>
          </div>
          <div className='stats-item'>
            <h1>20+</h1> <br />
            <p>Our Branches </p>
          </div>
          <div className='stats-item'>
            <h1>100+</h1> <br />
            <p>Total Employees </p>
          </div>
        </div>
      </div>
      <Review />
      <Conact />
      <Footer />
    </main>
  );
}
