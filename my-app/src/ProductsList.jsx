import React, { useState, useEffect } from 'react';
import './ProductsList.css';
import { useParams, useNavigate } from 'react-router-dom';
import Filter from './Filter';

const ProductsList = () => {
    const [products, setProducts] = useState([]); // Estado para los productos
    const { id } = useParams(); // Para acceder al ID de la categoría
    const navigate = useNavigate(); // Hook para la navegación
    const [categoryName, setCategoryName] = useState(''); // Estado para el nombre de la categoría

    // Obtiene los productos de la API y filtra por categoría si es necesario
    useEffect(() => {
        fetch('https://fakestoreapi.com/products') // Obtener todos los productos
            .then(response => response.json())
            .then(data => {
                if (id) {
                    // Filtrar productos si se pasa una categoría (id)
                    const filteredProducts = data.filter(product => product.category === id);
                    setProducts(filteredProducts);
                    setCategoryName(id); // Establecer el nombre de la categoría como el ID
                } else {
                    // Si no hay id (por ejemplo, todos los productos), mostrar todos
                    setProducts(data);
                    setCategoryName('Todos los productos');
                }
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, [id]); // Dependencia en 'id' para que actualice si cambia

    // Función para manejar el clic y redirigir al detalle del producto
    const handleClick = (productId) => {
        navigate(`/products/category/${productId}`); // Redirige a la página de detalle del producto
    };

    return (
        <div className="product_page">
            <Filter/>
            {/* Mostrar el nombre de la categoría seleccionada */}
            <div className="titulo">
                <h2>{categoryName}</h2>
                <p>Aquí encontrarás las últimas tendencias!</p>
            </div>

            {/* Mostrar los productos filtrados */}
            <div className="product_grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product_card">
                            <img src={product.image} alt={product.title} />
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                            </div>
                            <button className="detail-button" onClick={() => handleClick(product.id)}>
                                Más detalles
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en esta categoría</p>
                )}
            </div>
        </div>
    );
};

export default ProductsList;
