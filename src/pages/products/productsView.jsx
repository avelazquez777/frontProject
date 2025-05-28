import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import '../../styles/productsView.css';

const ProductsView = () => {
  const { products, loading, error, deleteProduct } = useProducts();

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await deleteProduct(id);
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
      }
    }
  };

  if (loading) return <div className="products-view p-d-flex p-jc-center p-ai-center"><p className="products-loading-text">Cargando productos...</p></div>;
  if (error) return <div className="products-view p-d-flex p-jc-center p-ai-center"><p className="products-error-text">Error: {error}</p></div>;

  return (
    <div className="products-view p-d-flex p-jc-center p-ai-center">
      <div className="products-container">
        <h2>Lista de Productos</h2>
        <div className="p-text-center p-mb-4">
          <Link
            to="/productos/nuevo"
            className="add-product-btn"
          >
            🛍️ Agregar Producto
          </Link>
        </div>
        {products.length === 0 ? (
          <p className="products-empty-text">No hay productos disponibles.</p>
        ) : (
          <table className="modern-products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombre}</td>
                  <td className="price-cell">${product.precio}</td>
                  <td>
                    <div className="product-action-buttons">
                      <Link
                        to={`/productos/editar/${product.id}`}
                        className="btn-edit-product"
                      >
                        ✏️ Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn-delete-product"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsView;