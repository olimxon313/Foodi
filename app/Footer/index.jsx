import './footer.scss';
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4 className='h4'>{t('footer.products')}</h4>
          <ul>
            <a href="#menu"><li>{t('footer.menus')}</li></a>
            <a href="#menu"><li>{t('footer.burgers')}</li></a>
            <a href="#about"><li>{t('footer.sides')}</li></a>
            <a href="#menu"><li>{t('footer.naanwiches')}</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>{t('footer.legal')}</h4>
          <ul>
            <a href="#stats"><li>{t('footer.legalNotice')}</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>{t('footer.contact')}</h4>
          <ul>
            <a href="#contact"><li>{t('footer.contacts')}</li></a>
            <a href="#address"><li>{t('footer.addresses')}</li></a>
            <a href="#header"><li>{t('footer.franchise')}</li></a>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className='h4'>{t('footer.accept')}</h4>
          <div className="footer-cards">
            <div className="card">MasterCard</div>
            <div className="card">Visa</div>
            <div className="card">AmEx</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-socials">
          <div className="icon"><FaFacebook /></div>
          <div className="icon"><FaTwitter /></div>
          <div className="icon"><BsDiscord /></div>
          <div className="icon"><FaLinkedin /></div>
        </div>
        <a className="copyright-link">© 2024 Nayef {t('footer.rights')}</a>
      </div>
    </footer>
  );
};

export default Footer;
