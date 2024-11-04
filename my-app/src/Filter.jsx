import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ updateFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([]);

    // Manejar el cambio de categoría
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        updateFilters({ category, priceRange });
    };

    // Manejar el cambio de rango de precios
    const handlePriceChange = (range) => {
        const updatedRange = priceRange.some(r => r[0] === range[0] && r[1] === range[1])
            ? priceRange.filter(r => r[0] !== range[0] || r[1] !== range[1])
            : [...priceRange, range];

        setPriceRange(updatedRange);
        updateFilters({ category: selectedCategory, priceRange: updatedRange }); // Actualiza filtros al cambiar precios
    };
    
    return (
        <div className="filter-container">
            <h3>Filters</h3>
            
            <div className="filter-section">
                <h4>Categorías</h4>
                {['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'].map((cat) => (
                    <button 
                        key={cat} 
                        onClick={() => handleCategoryChange(cat)}
                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="filter-section">
                <h4>Precio</h4>
                {[[0, 40], [40, 100], [100, 150], [150, 200], [200, 250], [250, Infinity]].map((range) => (
                    <label key={range.join('-')}>
                        <input 
                            type="checkbox" 
                            checked={priceRange.some(r => r[0] === range[0] && r[1] === range[1])}
                            onChange={() => handlePriceChange(range)} 
                        />
                        {range[1] === Infinity ? `Más de ${range[0]}$` : `${range[0]}$ – ${range[1]}$`}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
