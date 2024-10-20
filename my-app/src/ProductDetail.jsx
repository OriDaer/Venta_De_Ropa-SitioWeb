import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null); // Estado para almacenar el producto

    // Descripciones aleatorias para cualquier producto
    const randomDescriptions = [
        "This product is crafted with care using sustainable materials, ensuring a minimal environmental impact.",
        "Designed for durability and style, this product embodies both functionality and aesthetic appeal.",
        "A perfect blend of quality and innovation, making this product a must-have in any collection."
    ];

    // Números de artículo aleatorios para cualquier producto
    const randomArtNumbers = [
        "0643448004",
        "0532431003",
        "0783948471",
        "0223758492",
        "0912394755"
    ];

    // Función para seleccionar una descripción aleatoria
    const getRandomDescription = () => {
        const randomIndex = Math.floor(Math.random() * randomDescriptions.length);
        return randomDescriptions[randomIndex];
    };

    // Función para seleccionar un número de artículo aleatorio
    const getRandomArtNumber = () => {
        const randomIndex = Math.floor(Math.random() * randomArtNumbers.length);
        return randomArtNumbers[randomIndex];
    };

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => {
                console.error('Error al obtener el producto:', error);
            });
    }, [id]); // El efecto se ejecuta cada vez que cambie el ID

    // Si el producto aún no se ha cargado, mostramos un mensaje de carga
    if (!product) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="breadcrumbs">
                <p>home / products / {product.category} / {product.title}</p>
            </div>
            <div className="product-detail">
                <div className="product-images">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="product-info">
                    <h1>{product.title}</h1>
                    <p className="price">${product.price}</p>
                    <p className="description">{product.description}</p>

                    <div className="quantity-select">
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
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
                        <p>{getRandomDescription()}</p> {/* Mostrar descripción aleatoria */}
                        <p><strong>Art. No.</strong> – {getRandomArtNumber()}</p> {/* Mostrar Art. No. aleatorio */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
