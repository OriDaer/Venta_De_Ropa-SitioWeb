import React from 'react';
import './Filter.css'
import ProductsList from './ProductsList'; // O la ruta correcta
import Footer from  './Footer';

const Filter = () => {
    return (
        <div className="filter-container">
            
            <div className="filter-header">
                <h1>holaaaaa</h1>
                <h3>Filters</h3>
                <button className="filter-menu">⋮</button>
            </div>

            <div className="filter-category">
                <details>
                    <summary>Vestidos</summary>
                    <ul>
                        <li>Vestidos</li>
                        <li>Abrigos</li>
                        <li>Calzado</li>
                        <li>Sombreros</li>
                    </ul>
                </details>
            </div>

            <div className="filter-section">
                <h4>Categorías</h4>
                <ul className="categories-list">
                    <li className="category-item active">Vestidos</li>
                    <li className="category-item">Pantalones</li>
                    <li className="category-item">Remeras</li>
                    <li className="category-item">Calzados</li>
                </ul>
            </div>

            <div className="filter-section">
                <h4>Precio</h4>
                <ul className="price-list">
                    <li><input type="checkbox" /> 0$ – 40$</li>
                    <li><input type="checkbox" /> 40$ – 100$</li>
                    <li><input type="checkbox" /> 100$ – 150$</li>
                    <li><input type="checkbox" /> 150$ – 175$</li>
                    <li><input type="checkbox" /> 175$ – 250$</li>
                    <li><input type="checkbox" /> 250$ – 350$</li>
                </ul>
            </div>
            <button className="apply-filter-btn">Apply Filter</button>
            <ProductsList/>
        </div>

    );
};

export default Filter;
