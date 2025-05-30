import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import userValidation from '../../utils/usersValidation';
import userService from '../../services/usersService';
import '../../styles/usersForm.css';

const UsersForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    email: '',
    edad: ''
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await userService.getById(id);
          const userData = response.data.data || response.data;
          setInitialValues({
            nombre: userData.nombre || '',
            email: userData.email || '',
            edad: userData.edad || ''
          });
        } catch (err) {
          console.error('Error al obtener usuario:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus(null);
      if (isEditMode) {
        await userService.update(id, values);
      } else {
        await userService.create(values);
      }
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      setStatus('Error al guardar el usuario. Inténtalo de nuevo.');
    } finally {
      setSubmitting(false);
      window.location.href = '/usuarios';
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
          <p style={{ marginTop: '1rem', color: '#8b5cf6' }}>Cargando usuario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-view">
      <div className="form-container">
        <Link to="/usuarios" className="back-btn">
          ← Volver a Usuarios
        </Link>
        
        <h2 className="form-title">
          {isEditMode ? '✏️ Editar Usuario' : 'Agregar Usuario'}
        </h2>
        
        <Formik 
          enableReinitialize
          initialValues={initialValues}
          validationSchema={userValidation}
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
                <label className="form-label">Nombre Completo</label>
                <InputText
                  value={values.nombre}
                  onChange={(e) => setFieldValue('nombre', e.target.value)}
                  placeholder="Ingrese el nombre completo"
                  className={`form-input ${errors.nombre && touched.nombre ? 'p-invalid' : ''}`}
                />
                <ErrorMessage 
                  name="nombre" 
                  component="div" 
                  className="form-error" 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Correo Electrónico</label>
                <InputText
                  value={values.email}
                  onChange={(e) => setFieldValue('email', e.target.value)}
                  placeholder="Ingrese el correo electrónico"
                  type="email"
                  className={`form-input ${errors.email && touched.email ? 'p-invalid' : ''}`}
                />
                <ErrorMessage 
                  name="email" 
                  component="div" 
                  className="form-error" 
                />
              </div>
              
              <div className="form-field">
                <label className="form-label">Edad</label>
                <InputNumber
                  value={values.edad}
                  onValueChange={(e) => setFieldValue('edad', e.value)}
                  placeholder="Ingrese la edad"
                  min={1}
                  max={120}
                  showButtons
                  buttonLayout="horizontal"
                  decrementButtonClassName="p-button-secondary"
                  incrementButtonClassName="p-button-secondary"
                  incrementButtonIcon="pi pi-plus"
                  decrementButtonIcon="pi pi-minus"
                  className={`form-input ${errors.edad && touched.edad ? 'p-invalid' : ''}`}
                />
                <ErrorMessage 
                  name="edad" 
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
                    : (isEditMode ? 'Actualizar Usuario' : 'Crear Usuario')
                }
                icon={isSubmitting ? 'pi pi-spin pi-spinner' : (isEditMode ? 'pi pi-check' : 'pi pi-user-plus')}
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UsersForm;