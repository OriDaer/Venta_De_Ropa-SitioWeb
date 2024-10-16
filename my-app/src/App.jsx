import './App.css';
import React, { useState } from 'react';
import Categories from './Categories';
import Footer from './Footer';
import './DetailButton.css';

const carouselItems = [
  {
    image: 'https://via.placeholder.com/300',
    title: 'Producto 1',
    description: 'Descripción del producto 1.',
    price: '$50.00',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Producto 2',
    description: 'Descripción del producto 2.',
    price: '$75.00',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Producto 3',
    description: 'Descripción del producto 3.',
    price: '$100.00',
  },
  {
    image: 'https://via.placeholder.com/300',
    title: 'Producto 4',
    description: 'Descripción del producto 4.',
    price: '$125.00',
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onClick = () => {
    alert(`Detalles de ${category.name}`)
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="app-container">
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

      <div className="cover-container">
        <div className="text-section">
          <h1 className="title">Título Principal</h1>
          <p className="subtitle">Este es el subtítulo que acompaña al título</p>
          <button className="btn">Ver más</button>
        </div>
        <div className="image-section">
          <img src="./public/img/portada.png" alt="Portada" className="cover-image" />
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-button prev" onClick={goToPrevious}>&#10094;</button>
        
        <div className="carousel" style={{ transform: `translateX(-${currentIndex * 340}px)` }}>
          {carouselItems.map((item, index) => (
            <div className="carousel-item" key={index}>
              <img src={item.image} alt={item.title} />
              <div className="carousel-item-content">
                <h2 className="carousel-title">{item.title}</h2>
                <p className="carousel-description">{item.description}</p>
                <p className="carousel-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={goToNext}>&#10095;</button>
      </div>

      {/* Sección de categorías */}
      <Categories />
      <div>
      <button className="detail-button" onClick={onClick}>Más detalles</button>
    </div>
      <Footer/>
      
    </div>
  );
}

export default App;
