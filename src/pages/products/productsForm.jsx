import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import productsValidation from '../../utils/productsValidation';
import productsService from '../../services/productsService';
import '../../styles/productsForm.css';

const ProductsForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    precio: ''
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
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
        } finally {
          setLoading(false);
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
      setSubmitting(false)
      window.location.href = '/productos';
    }
  };

  if (loading) {
    return (
      <div className="form-view">
        <div className="form-container p-text-center">
          <ProgressSpinner 
            style={{ width: '50px', height: '50px' }} 
            strokeWidth="3" 
            fill="transparent"
            animationDuration=".5s"
          />
          <p style={{ marginTop: '1rem', color: '#8b5cf6' }}>Cargando producto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-view">
      <div className="form-container">
        <Link to="/productos" className="back-btn">
          ← Volver a Productos
        </Link>
        
        <h2 className="form-title">
          {isEditMode ? '✏️ Editar Producto' : 'Agregar Producto'}
        </h2>
        
        <Formik 
          enableReinitialize
          initialValues={initialValues}
          validationSchema={productsValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, values, setFieldValue, errors, touched }) => (
            <Form className="modern-form">
              {status && (
                <Message 
                  severity="error" 
                  text={status}
                  className="form-status-error"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
              )}
              
              <div className="form-field">
                <label className="form-label">Nombre del Producto</label>
                <InputText
                  value={values.nombre}
                  onChange={(e) => setFieldValue('nombre', e.target.value)}
                  placeholder="Ingrese el nombre del producto"
                  className={`form-input ${errors.nombre && touched.nombre ? 'p-invalid' : ''}`}
                />
                <ErrorMessage 
                  name="nombre" 
                  component="div" 
                  className="form-error" 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Precio</label>
                <InputNumber
                  value={values.precio}
                  onValueChange={(e) => setFieldValue('precio', e.value)}
                  placeholder="Ingrese el precio"
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  minFractionDigits={2}
                  className={`form-input ${errors.precio && touched.precio ? 'p-invalid' : ''}`}
                />
                <ErrorMessage 
                  name="precio" 
                  component="div" 
                  className="form-error" 
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="form-submit-btn"
                label={
                  isSubmitting 
                    ? (isEditMode ? 'Actualizando...' : 'Creando...') 
                    : (isEditMode ? 'Actualizar Producto' : 'Crear Producto')
                }
                icon={isSubmitting ? 'pi pi-spin pi-spinner' : (isEditMode ? 'pi pi-check' : 'pi pi-plus')}
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductsForm;