import React from 'react';
import './Header.css'; // Asegúrate de tener el archivo de estilos importado

const Header = () => {
    return (
        <header className="header-container">
            <div className="header-content">
                <div className="header-logo">
                    <img src="./public/img/logo.png" alt="Logo" className="logo-image" />
                </div>
                <div className="header-buttons">
                    <button className="header-btn">Inicio</button>
                    <button className="header-btn">Servicios</button>
                    <button className="header-btn">Nosotros</button>
                    <button className="header-btn">Contacto</button>
                </div>
                <div className="header-icons">
                    <img src="./public/img/buscar.png" alt="Buscar" className="icon" />
                    <img src="./public/img/contacto.png" alt="Contacto" className="icon" />
                    <img src="./public/img/balde.png" alt="Instagram" className="icon" />
                </div>
            </div>
        </header>
    );
};

export default Header;