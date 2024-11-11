import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Header.css'; 

const Header = () => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const navigate = useNavigate();

    const toggleContactModal = () => {
        setShowContactModal(!showContactModal);
    };

    const goToProducts = () => {
        navigate('/products/category'); 
    };

    const goToHome = () => {
        navigate('/home'); 
    };

    const goToCart = () => {
        navigate('/cart'); 
    };

    const goToBlackjack = () => {
        navigate('/blackjack');  // Redirige a la página de Blackjack
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { name, email, message } = formData;

        // Validación simple
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, ingresa un correo válido.');
            return;
        }

        alert('Gracias por tu mensaje, pronto te estaremos respondiendo.');
        setShowContactModal(false);
        setFormData({ name: '', email: '', message: '' });
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
                    <img 
                        src="/img/balde.png" 
                        alt="Carrito" 
                        className="icon" 
                        onClick={goToCart} 
                    />
                    {/* Agregar el icono de casino junto al carrito */}
                    <img 
                        src="/img/casino.png" 
                        alt="Casino" 
                        className="icon casino-icon" 
                        onClick={goToBlackjack} 
                    />
                </div>
            </div>

            {showContactModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={toggleContactModal}>X</button>
                        <h2>Contáctanos</h2>
                        <form className="contact-form" onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Tu nombre"
                                className="contact-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Tu correo"
                                className="contact-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Tu mensaje"
                                className="contact-textarea"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <button type="submit" className="send-btn">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
