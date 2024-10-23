import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import './Header.css'; // Asegúrate de tener el archivo de estilos importado

const Header = () => {
    const [showContactModal, setShowContactModal] = useState(false); // Estado para mostrar u ocultar el modal
    const navigate = useNavigate(); // Instanciar useNavigate

    // Función para alternar el estado del modal
    const toggleContactModal = () => {
        setShowContactModal(!showContactModal);
    };

    // Función para navegar a la página de productos
    const goToProducts = () => {
        navigate('/products/category'); // Navegar a la ruta /products/category
    };

    // Función para navegar a la página de inicio
    const goToHome = () => {
        navigate('/home'); // Navegar a la ruta /home
    };

    // Función para navegar a la página del carrito
    const goToCart = () => {
        navigate('/cart'); // Navegar a la ruta /cart
    };

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="header-logo">
                    <img src="/img/logo.png" alt="Logo" className="logo-image" />
                </div>
                <div className="header-buttons">
                    <button className="header-btn" onClick={goToHome}>Inicio</button>
                    <button className="header-btn" onClick={goToProducts}>Productos</button>
                    <button className="header-btn" onClick={toggleContactModal}>Contacto</button>
                </div>
                <div className="header-icons">
                    <img src="/img/buscar.png" alt="Buscar" className="icon" />
                    <img src="/img/contacto.png" alt="Contacto" className="icon" />
                    <img src="/img/balde.png" alt="Carrito" className="icon" onClick={goToCart} /> {/* Asocia la función goToCart */}
                </div>
            </div>

            {/* Modal de Contacto */}
            {showContactModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={toggleContactModal}>X</button>
                        <h2>Contáctanos</h2>
                        <p>¡Gracias por visitarnos! Si tienes alguna pregunta, puedes escribirnos un mensaje y te responderemos lo antes posible.</p>
                        <form className="contact-form">
                            <input type="text" placeholder="Tu nombre" className="contact-input" />
                            <input type="email" placeholder="Tu correo" className="contact-input" />
                            <textarea placeholder="Tu mensaje" className="contact-textarea"></textarea>
                            <button type="submit" className="send-btn">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
