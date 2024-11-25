import './landing.scss'
import About from './About'

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
    </main>
  );
}
