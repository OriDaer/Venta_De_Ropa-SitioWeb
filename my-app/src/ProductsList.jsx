import React, { useState, useEffect } from 'react';
import './ProductsList.css';
import { useParams, useNavigate } from 'react-router-dom';

const ProductsList = () => {
    const [products, setProducts] = useState([]); // Estado para los productos
    const { id } = useParams(); // Para acceder al ID de la categoría
    const navigate = useNavigate(); // Hook para la navegación

    // Obtiene los productos de la API (puedes modificar la URL según la categoría o id)
    useEffect(() => {
        fetch('https://fakestoreapi.com/products') // Obtener todos los productos
            .then(response => response.json())
            .then(data => {
                setProducts(data); // Guardar los productos en el estado
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    // Función para manejar el clic y redirigir al detalle del producto
    const handleClick = (productId) => {
        navigate(`/products/category/${productId}`); // Redirige a la página de detalle del producto
    };

    return (
        <div className="product_page">
            <div className="titulo">
                <h2>VESTIDOS</h2>
                <p>Aquí encontrarás las últimas tendencias!</p>
            </div>

            <div className="product_grid">
                {products.map((product) => (
                    <div key={product.id} className="product_card">
                        <img src={product.image} alt={product.name} />
                        <div className="product-info">
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </div>
                        <button className="detail-button" onClick={() => handleClick(product.id)}>
                            Más detalles
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProductsList;
