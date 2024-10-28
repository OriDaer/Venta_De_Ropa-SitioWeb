import React from 'react';
import './Cart.css';

const Cart = ({ favorites }) => {
    const calculateTotal = () => {
        return favorites.reduce((acc, product) => acc + product.price, 0);
    };

    const handleCheckout = () => {
        alert('Tu pedido ya fue enviado, pronto te estaremos escribiendo, ¡gracias por confiar en nosotros! :)');
    };

    return (
        <div className="cart-container">
            <div className="products-section">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <div key={product.id} className="product-item">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <div className="product-details">
                                <h4>{product.title}</h4>
                                <p>Price: {product.price.toFixed(2)} $</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos favoritos.</p>
                )}
                <div className="total-summary">
                    <hr />
                    <p><strong>Total de productos: {calculateTotal().toFixed(2)} $</strong></p>
                </div>
            </div>

            <div className="checkout-section">
                <button className="checkout-button" onClick={handleCheckout}>
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default Cart;
