import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 20.00,
            quantity: 2,
            artNo: '1234',
            size: 'M',
            img: 'url_to_image_1'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 15.50,
            quantity: 1,
            artNo: '5678',
            size: 'L',
            img: 'url_to_image_2'
        }
    ]);

    const [discountCode, setDiscountCode] = useState('');
    const [shipping, setShipping] = useState(5.00);

    const [carouselItems, setCarouselItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Obtener productos aleatorios desde Fake Store API sin usar await
        fetch('https://fakestoreapi.com/products?limit=11')
            .then((response) => response.json())
            .then((data) => {
                console.log('Productos obtenidos del carrusel:', data); // Verificación de los datos obtenidos
                setCarouselItems(data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const removeProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    const handleCheckout = () => {
        alert('Tu pedido ya fue enviado, pronto te estaremos escribiendo, ¡gracias por confiar en nosotros! :)');
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
    };

    return (
        <div className="cart-container">
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
                <div className="total-summary">
                    <hr />
                    <p><strong>Total de productos: {calculateTotal().toFixed(2)} $</strong></p>
                </div>
            </div>

            <div className="checkout-section">
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
                <div className="login-section">
                    <h3>Log in to use your member offers</h3>
                    <button className="login-button">LOG IN</button>
                </div>
                <div className="order-summary">
                    <p>Order value: {calculateTotal().toFixed(2)} $</p>
                    <p>Shipping: {shipping.toFixed(2)} $</p>
                    <p><strong>Total: {(calculateTotal() + shipping).toFixed(2)} $</strong></p>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                    Comprar
                </button>
            </div>
            <h2>Also you may buy</h2>
            <div className="carousel-container">
                <button className="carousel-button prev" onClick={goToPrevious}>&#10094;</button>
                <div className="carousel" style={{ transform: `translateX(-${currentIndex * 340}px)` }}>
                    {carouselItems.length > 0 ? (
                        carouselItems.map((item) => (
                            <div className="carousel-item" key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className="carousel-item-content">
                                    <h2 className="carousel-title">{item.title}</h2>
                                    <p className="carousel-description">{item.description}</p>
                                    <p className="carousel-price">{item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay productos disponibles en el carrusel.</p>
                    )}
                </div>

                <button className="carousel-button next" onClick={goToNext}>&#10095;</button>
            </div>
        </div>
    );
};

export default Cart;
