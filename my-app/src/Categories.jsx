import React, { useState, useEffect } from 'react';
import './Categories.css';

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

const Categories = () => {
  const [categoryImages, setCategoryImages] = useState([]);

  useEffect(() => {
    // Obtiene la imagen del primer producto de cada categoría
    const fetchImages = () => {
      const promises = categories.map((category) => {
        return fetch(`https://fakestoreapi.com/products/category/${category}`)
          .then((response) => response.json())
          .then((data) => ({
            category,
            image: data[0]?.image, // Toma la primera imagen
          }));
      });

      Promise.all(promises).then((results) => {
        setCategoryImages(results);
      });
    };

    fetchImages();
  }, []);

  return (
    <div className="grid-container">
      {categoryImages.map((cat, index) => (
        <div className="grid-item" key={index}>
          <img src={cat.image} alt={cat.category} className="category-image" />
          <div className="category-info">
            <h3 className="category-name">{cat.category}</h3>
            <button className="details-button">Más detalles</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
