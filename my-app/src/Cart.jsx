import React, { useState } from 'react';
import './Cart.css'; // Asegúrate de agregar los estilos en un archivo CSS aparte

const Cart = () => {
    // Estado para los productos en el carrito
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 20.00,
            quantity: 2,
            artNo: '1234',
            size: 'M',
            img: 'url_to_image_1' // Cambia esto a la URL de la imagen
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15.50,
            quantity: 1,
            artNo: '5678',
            size: 'L',
            img: 'url_to_image_2' // Cambia esto a la URL de la imagen
        }
    ]);

    const [discountCode, setDiscountCode] = useState(''); // Estado del código de descuento
    const [shipping, setShipping] = useState(5.00); // Estado del costo de envío

    // Función para eliminar productos
    const removeProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    // Función para calcular el total del valor de los productos
    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    // Función para manejar el envío del pedido
    const handleCheckout = () => {
        alert('Tu pedido ya fue enviado, pronto te estaremos escribiendo, ¡gracias por confiar en nosotros! :)');
    };

    return (
        <div className="cart-container">
            {/* Sección izquierda: lista de productos */}
            <div className="products-section">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <button className="remove-button" onClick={() => removeProduct(product.id)}>X</button>
                        <img src={product.img} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h4>{product.name}</h4>
                            <p>Price: {product.price.toFixed(2)} $</p>
                            <p>Quantity: {product.quantity}</p>
                            <p style={{ color: 'grey' }}>
                                Art. No: {product.artNo} | Size: {product.size}
                            </p>
                            <p><strong>Total: {(product.price * product.quantity).toFixed(2)} $</strong></p>
                        </div>
                    </div>
                ))}

                {/* Línea divisoria y resumen total */}
                <div className="total-summary">
                    <hr />
                    <p><strong>Total de productos: {calculateTotal().toFixed(2)} $</strong></p>
                </div>
            </div>

            {/* Sección derecha: descuento, login y resumen */}
            <div className="checkout-section">
                {/* Input para código de descuento */}
                <div className="discount-section">
                    <h3>ADD A DISCOUNT CODE</h3>
                    <input 
                        type="text" 
                        value={discountCode} 
                        onChange={(e) => setDiscountCode(e.target.value)} 
                        placeholder="Enter your code" 
                    />
                    <button className="add-button">Add</button>
                </div>

                {/* Botón de inicio de sesión */}
                <div className="login-section">
                    <h3>Log in to use your member offers</h3>
                    <button className="login-button">LOG IN</button>
                </div>

                {/* Resumen del pedido */}
                <div className="order-summary">
                    <p>Order value: {calculateTotal().toFixed(2)} $</p>
                    <p>Shipping: {shipping.toFixed(2)} $</p>
                    <p><strong>Total: {(calculateTotal() + shipping).toFixed(2)} $</strong></p>
                </div>

                {/* Botón de compra */}
                <button className="checkout-button" onClick={handleCheckout}>
                    Comprar
                </button>
            </div>
        </div>
    );
};

export default Cart;
