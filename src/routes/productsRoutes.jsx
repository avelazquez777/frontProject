import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsView from '../pages/products/productsView';
import ProductsForm from '../pages/products/productsForm';

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsView />} />
      <Route path="nuevo" element={<ProductsForm />} />
      <Route path="editar/:id" element={<ProductsForm />} />
    </Routes>
  );
};

export default ProductsRoutes;
