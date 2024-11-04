import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

const Categories = () => {
  const [categoryImages, setCategoryImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      const promises = categories.map(async (category) => {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        return {
          category,
          image: data[0]?.image, // Toma la primera imagen
        };
      });

      const results = await Promise.all(promises);
      setCategoryImages(results);
    };

    fetchImages();
  }, []);

  const handleDetailsClick = (category) => {
    navigate(`/products/category/${category}`);
  };

  return (
    <div className="grid-container">
      {categoryImages.map((cat, index) => (
        <div className="grid-item" key={index}>
          <img src={cat.image} alt={cat.category} className="category-image" />
          <div className="category-info">
            <h3 className="category-name">{cat.category}</h3>
            <button 
              className="details-button" 
              onClick={() => handleDetailsClick(cat.category)}
            >
              Más detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
