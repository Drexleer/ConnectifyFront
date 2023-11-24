import './Footer.css';
import { BsFacebook, BsLinkedin, BsInstagram } from 'react-icons/bs';
import { AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsFacebook />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <AiOutlineTwitter />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsLinkedin />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="#">
            <BsInstagram />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <Link to={'/ourTeam'} style={{ textDecoration: 'none' }}>
            <a className="menu__link">Nuestro Equipo</a>
          </Link>
        </li>
        <li className="menu__item">
          <Link to={'/aboutus'} style={{ textDecoration: 'none' }}>
            <a className="menu__link">Sobre nosotros</a>
          </Link>
        </li>
        <li className="menu__item">
          <Link to={'/contact'} style={{ textDecoration: 'none' }}>
            <a className="menu__link">Contacto</a>
          </Link>
        </li>
      </ul>
      <p>&copy;2023 Connectify | All Rights Reserved</p>
      {/* <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}
    </footer>
  );
}
