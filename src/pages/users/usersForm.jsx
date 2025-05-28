import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import userValidation from '../../utils/usersValidation';
import userService from '../../services/usersService';

const UsersForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [initialValues, setInitialValues] = useState({
    nombre: '',
    email: '',
    edad: ''
  });
  
  useEffect(() => {
    if (isEditMode) {
      const fetchUser = async () => {
        try {
          const response = await userService.getById(id);
          const userData = response.data.data || response.data;
          setInitialValues({
            nombre: userData.nombre || '',
            email: userData.email || '',
            edad: userData.edad || ''
          });
        } catch (err) {
          console.error('Error al obtener usuario:', err);
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        {isEditMode ? 'Editar Usuario' : 'Agregar Usuario'}
      </h2>
      <Formik 
        enableReinitialize
        initialValues={initialValues}
        validationSchema={userValidation}
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
              <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full border px-3 py-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium">Edad</label>
              <Field
                name="edad"
                type="number"
                className="mt-1 block w-full border px-3 py-2"
              />
              <ErrorMessage name="edad" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditMode ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UsersForm;
