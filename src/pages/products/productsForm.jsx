import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import productsValidation from '../../utils/productsValidation';
import productsService from '../../services/productsService';

const ProductsForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    precio: ''
  });
  
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await productsService.getById(id);
          console.log('este es el response:', response);
          const productData = response.data.data;
          console.log('datos de fetch', productData);
          setInitialValues({
            nombre: productData.nombre || '',
            precio: productData.precio != null ? productData.precio : ''
          });
        } catch (err) {
          console.error('Error al obtener producto:', err);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null); 
      
      if (isEditMode) {
        await productsService.update(id, values);
      } else {
        await productsService.create(values);
      }
    } catch (error) {
      console.error('Error al guardar producto:', error);
      setStatus('Error al guardar el producto. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
      // Hace un redireccionamiento completo recargando la página
      window.location.href = '/productos';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Editar Producto' : 'Agregar Producto'}
      </h2>
      <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={productsValidation}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && (
              <div className="text-red-500 text-sm mb-4">{status}</div>
            )}
            <div>
              <label className="block text-sm font-medium">Nombre</label>
              <Field 
                name="nombre" 
                type="text" 
                className="mt-1 block w-full border px-3 py-2" 
              />
              <ErrorMessage 
                name="nombre" 
                component="div" 
                className="text-red-500 text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Precio</label>
              <Field 
                name="precio" 
                type="number" 
                className="mt-1 block w-full border px-3 py-2" 
              />
              <ErrorMessage 
                name="precio" 
                component="div" 
                className="text-red-500 text-sm" 
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting 
                ? (isEditMode ? 'Actualizando...' : 'Creando...') 
                : (isEditMode ? 'Actualizar Producto' : 'Crear Producto')
              }
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductsForm;
