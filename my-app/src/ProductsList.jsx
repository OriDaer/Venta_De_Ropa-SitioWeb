import React, { useState, useEffect } from 'react';
import './ProductsList.css';
import { useParams, useNavigate } from 'react-router-dom';
import Filter from './Filter';

const ProductsList = ({carritos}) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        priceRange: []
    });

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                if (id) {
                    const filteredProducts = data.filter(product => product.category === id);
                    setFilteredProducts(filteredProducts);
                    setCategoryName(id);
                } else {
                    setFilteredProducts(data);
                    setCategoryName('Todos los productos');
                }
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, [id]);

    useEffect(() => {
        const applyFilters = () => {
            let newFilteredProducts = [...products];

            if (filters.category) {
                newFilteredProducts = newFilteredProducts.filter(product => product.category === filters.category);
            }

            if (filters.priceRange.length > 0) {
                newFilteredProducts = newFilteredProducts.filter(product => {
                    const price = product.price;
                    return filters.priceRange.some(range => price >= range[0] && price < range[1]);
                });
            }

            setFilteredProducts(newFilteredProducts);
        };

        applyFilters();
    }, [filters, products]);

    const handleClick = (productId) => {
        navigate(`/products/category/${productId}`);
    };

    const handleAddToCart = (product) => {
        carritos(prev => {
            const existingProduct = prev.find(item => item.id === product.id);
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            console.log(
                'El producto no existe en el carrito, se agrega con una cantidad de 1'
            )
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="product_page">
            <Filter updateFilters={updateFilters} />
            <div className="titulo">
                <h2>{categoryName}</h2>
                <p>Aquí encontrarás las últimas tendencias!</p>
            </div>

            <div className="product_grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product_card">
                            <img src={product.image} alt={product.title} />
                            <div className="product-info">
                                <h3>{product.title}</h3>
                                <p>${product.price}</p>
                            </div>
                            <button className="detail-button" onClick={() => handleClick(product.id)}>
                                Más detalles
                            </button>
                            <button 
                                className="cart-button" 
                                onClick={() => handleAddToCart(product)}
                                aria-label="Agregar a carrito"
                            >
                                🛒 {/* Ícono de carrito */}
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
