import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductsList from './ProductsList';
import ProductDetail from './ProductDetail';
import Login from './Login';
import Cart from './Cart';
import Header from './Header';
import Footer from './Footer';

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Página de inicio (login) */}
      <Route path="/home" element={<Home />} /> {/* Página de inicio de sesión */}
    {/*  <Route path="/products" element={<ProductsList />} /> */ }{/* Todos los productos */}
      <Route path="/products/category" element={<ProductsList />} /> {/* Página de categoría específica */}
      <Route path="/products/category/:id" element={<ProductDetail />} /> {/* Detalle de producto (dinámico) */}
      <Route path="/cart" element={<Cart />} /> {/* Carrito de compras */}
    </Routes>
    <Footer/>
  </BrowserRouter>
);
