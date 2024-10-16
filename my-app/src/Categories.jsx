import React from 'react';
import './Categories.css';

const categories = [
  {
    name: 'Categoría 1',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Categoría 2',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Categoría 3',
    image: 'https://via.placeholder.com/100',
  },
  {
    name: 'Categoría 4',
    image: 'https://via.placeholder.com/100',
  },
];

const Categories = () => {
  return (
    <div className="grid-container">
      {categories.map((category, index) => (
        <div className="grid-item" key={index}>
          <img src={category.image} alt={category.name} className="category-image" />
          <div className="category-info">
            <h3 className="category-name">{category.name}</h3>
                <p>djhkjsfhjfsk</p>
            <button className="details-button">Más detalles</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
