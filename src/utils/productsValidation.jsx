import * as Yup from 'yup';

const productValidation = Yup.object().shape({
  nombre: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede tener más de 100 caracteres')
    .matches(
      /^[a-zA-Z0-9\s\-,.áéíóúÁÉÍÓÚñÑ]+$/,
      'El nombre solo puede contener letras, números, espacios, guiones, comas y puntos'
    ),
  precio: Yup.number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser positivo')
    .required('El precio es obligatorio')
    .max(1000000, 'El precio no puede superar 1.000.000')
});

export default productValidation;
