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
    <Routes>
      <Route path="/" 
        element={<><Login /></>} 
      /> 

      <Route path="/home" 
        element={<><Header /><Home /><Footer /></>} 
      /> 

      <Route path="/products/category" 
        element={<><Header /><ProductsList /><Footer /></>} 
      /> 

      <Route path="/products/category/:id" 
        element={<><Header /><ProductDetail /><Footer /></>} 
      /> 

      <Route path="/cart" 
        element={<><Header /><Cart /><Footer /></>} 
      /> 
    </Routes>
  </BrowserRouter>
);
