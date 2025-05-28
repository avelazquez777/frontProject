import { useState, useEffect, useCallback } from 'react';
import productsService from '../services/productsService';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsService.getAll();
      console.log("DEBUG - Respuesta del backend:", response.data.data);
      setProducts(response.data.data || []); 
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || 'Error al cargar productos');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsService.create(data);
      const newProduct = response.data.data;
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsService.update(id, data);
      const updatedProduct = response.data.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === parseInt(id) ? updatedProduct : product
        )
      );
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await productsService.delete(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== parseInt(id))
      );
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;