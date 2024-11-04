import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <nav className="footer-nav">
          < Link to="#home" className="footer-link">Inicio</Link>
          < Link to="#services" className="footer-link">Productos</Link>
          < Link to="#contact" className="footer-link">Contacto</Link>
        </nav>
        <p className="footer-text">© 2024 DomSar. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
