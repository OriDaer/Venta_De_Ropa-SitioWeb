import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ updateFilters }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState([]);
    const [tempPriceRange, setTempPriceRange] = useState([]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        updateFilters({ category, priceRange: tempPriceRange }); // Aplica la categoría inmediatamente
    };

    const handlePriceChange = (range) => {
        const isSelected = tempPriceRange.some(r => r[0] === range[0] && r[1] === range[1]);
        if (isSelected) {
            setTempPriceRange(tempPriceRange.filter(r => !(r[0] === range[0] && r[1] === range[1])));
        } else {
            setTempPriceRange([...tempPriceRange, range]);
        }
    };

    const applyFilters = () => {
        updateFilters({ category: selectedCategory, priceRange: tempPriceRange });
    };

    return (
        <div className="filter-container">
            <div className="filter-header">
                <h3>Filters</h3>
                <button className="filter-menu">⋮</button>
            </div>

            <div className="filter-section">
                <h4>Categorías</h4>
                <ul className="categories-list">
                    {['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'].map((cat) => (
                        <li key={cat} className="category-item" onClick={() => handleCategoryChange(cat)}>
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="filter-section">
                <h4>Precio</h4>
                <ul className="price-list">
                    {[[0, 40], [40, 100], [100, 150], [150, 200], [200, 250]].map((range) => (
                        <li key={range.join('-')}>
                            <input 
                                type="checkbox" 
                                checked={tempPriceRange.some(r => r[0] === range[0] && r[1] === range[1])}
                                onChange={() => handlePriceChange(range)} 
                            /> {range[0]}$ – {range[1]}$
                        </li>
                    ))}
                </ul>
            </div>
            <button className="apply-filter-btn" onClick={applyFilters}>Apply Filter</button>
        </div>
    );
};

export default Filter;
