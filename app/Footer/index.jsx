import './footer.scss';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4 className='h4'>Our Products</h4>
          <ul>
            <a href="#menu"><li>Our menus</li></a>
            <a href="#menu"><li>Our burgers</li></a>
            <a href="#about"> <li>Our times sides</li></a>
            <a href="#menu"><li>Our naanwiches</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>Legal information</h4>
          <ul>
            <a href="#stats"><li>Legal Notice</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>Contact us</h4>
          <ul>
            <a href="#contact"><li>Contacts</li></a>
            <a href="#addres"><li>Our addresses</li></a>
            <a href="#header"><li>Become a Times Square franchisee</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>We accept</h4>
          <div className="footer-cards">
            <div className="card">MasterCard</div>
            <div className="card">Visa</div>
            <div className="card">AmEx</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-socials">
          <div className="icon">< FaFacebook /></div>
          <div className="icon"><FaTwitter /></div>
          <div className="icon"><BsDiscord /></div>
          <div className="icon"><FaLinkedin /></div>
        </div>
        <a className="copyright-link">© 2024 Nayef All rights reserved.</a>
      </div>
    </footer>
  );
};

export default Footer;
