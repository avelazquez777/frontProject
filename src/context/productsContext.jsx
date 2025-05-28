import React, { createContext, useState, useEffect } from 'react';
import productService from '../services/productsService';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
