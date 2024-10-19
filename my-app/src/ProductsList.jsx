import React from 'react';
import './ProductsList.css';

const products = [
    { id: 1, name: 'Velvet Covered', price: 39, image: 'url-aqui' },
    { id: 2, name: 'Candle in Glass Holder', price: 14, image: 'url-aqui' },
    { id: 3, name: 'Metal Photo Frame', price: 25, image: 'url-aqui' },
    { id: 4, name: 'Round Floor Mat', price: 22, image: 'url-aqui' },
    { id: 5, name: 'Class Light Holder', price: 22, image: 'url-aqui' },
    { id: 6, name: 'Flannel Duvet Cover Set', price: 44, image: 'url-aqui' }
];

const ProductsList = () => {
    return (
        <div className="product_page">
            <header className="header">
                <h2>VESTIDOS</h2>
                <p>Aquí encontrarás toda la última moda en vestidos...</p>
            </header>

            <div className="product_grid">
                {products.map(product => (
                    <div key={product.id} className="product_card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    </div>
                ))}
                <div>
                    <button className="detail-button" onClick={onClick}>Más detalles</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
