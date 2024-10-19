import React, { useState } from 'react';
import './ProductDetail.css';  // Asegúrate de tener los estilos importados

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

    return (
        <div className="product-detail-container">
            <div className="breadcrumbs">
                <p>home / category / dress / dress gales buganvilla</p>
            </div>
            <div className="product-detail">
                <div className="product-images">
                    <img src="https://vestidissima.com/cdn/shop/files/Vestidissima-LookbookWEB-71_0663972c-4bd5-4b49-882b-c1a422bf37a2.jpg?v=1723715155&width=1200" alt="Product 1" />
                    <img src="https://vestidissima.com/cdn/shop/files/Vestidissima-LookbookWEB-65.jpg?v=1723715154&width=1200" alt="Product 2" />
                    <img src="https://vestidissima.com/cdn/shop/files/Vestidissima-LookbookWEB-66.jpg?v=1723715154&width=1200" alt="Product 3" />
                </div>
                <div className="product-info">
                    <h1>Dress Gales Buganvilla</h1>
                    <p className="price">$39.99</p>
                    <p className="description">
                        Vestido en tejido crepón elástico y gasa, lleva refuerzo en el pecho y chal incluido. Cierra con cremallera trasera.
                    </p>

                    <div className="quantity-select">
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </div>

                    <select className="size-select">
                        <option value="">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>

                    <button className="add-to-cart">ADD TO SHOPPING BAG</button>

                    <div className="product-extra">
                        <p><strong>Conscious</strong></p>
                        <p>
                            Twin duvet cover set in soft, woven fabric made from a Tencel™ lyocell and cotton blend with a printed pattern.
                        </p>
                        <p><strong>Composition</strong> – Cotton 50%, Lyocell 50%</p>
                        <p><strong>Art. No.</strong> – 0643448004</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
