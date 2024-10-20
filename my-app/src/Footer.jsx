import React from 'react';
import './Footer.css'; // Asegúrate de crear este archivo

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <nav className="footer-nav">
          <a href="#home" className="footer-link">Inicio</a>
          <a href="#services" className="footer-link">Servicios</a>
          <a href="#about" className="footer-link">Nosotros</a>
          <a href="#contact" className="footer-link">Contacto</a>
        </nav>
        <p className="footer-text">© 2024 DomSar. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
