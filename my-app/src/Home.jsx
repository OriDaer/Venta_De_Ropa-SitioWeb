import './Home.css';
import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import './DetailButton.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [carouselItems, setCarouselItems] = useState([]); // Estado para los productos
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook para navegar

  // Obtén los productos de la API cuando el componente se monte
  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=10') // Solicita 4 productos aleatorios
      .then(response => response.json()) // Convierte la respuesta en JSON
      .then(data => {
        setCarouselItems(data); // Guarda los productos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []); // Se ejecuta una sola vez al montar el componente

  const handleClick = (productId) => {
    navigate(`/products/category/${productId}`); // Redirige a la página del detalle del producto
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="app-container">
      <div className="cover-container">
        <div className="text-section">
          <h1 className="title">DOMSAR</h1>
          <p className="subtitle">Con más de 30 años de trayectoria, en DomSar nos hemos consolidado como un referente en el mercado, ofreciendo productos de calidad y un servicio excepcional. Nuestra experiencia y compromiso nos permiten crecer junto a ustedes, brindando soluciones innovadoras.</p>
          <button className="btn" onClick={() => handleClick(1)}>Ver más</button> {/* Pasa un ID de producto */}
        </div>
        <div className="image-section">
          <img src="/img/portada.png" alt="Portada" className="cover-image" />
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-button prev" onClick={goToPrevious}>&#10094;</button>
        
        <div className="carousel" style={{ transform: `translateX(-${currentIndex * 340}px)` }}>
          {carouselItems.map((item) => (
            <div className="carousel-item" key={item.id} onClick={() => handleClick(item.id)}>
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
        <button className="detail-button" onClick={() => handleClick(1)}>Más detalles</button> {/* Pasa un ID de producto */}
      </div>
    </div>
  );
}

export default Home;
