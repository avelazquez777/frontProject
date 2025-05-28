import * as Yup from 'yup';

const userValidation = Yup.object().shape({
  nombre: Yup.string()
    .trim()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email: Yup.string()
    .trim()
    .email('Email inválido')
    .required('El email es obligatorio')
    .test('unique-email', 'Este email ya está registrado', function (value) {
      const { existingEmails = [] } = this.options.context || {};
      return existingEmails.indexOf(value) === -1;
    }),
  edad: Yup.number()
    .required('La edad es obligatoria')
    .typeError('La edad debe ser un número')
    .positive('La edad debe ser un número positivo')
    .integer('La edad debe ser un número entero')
    .min(1, 'La edad debe ser al menos 1')
    .max(130, 'La edad parece ser inválida')
});

export default userValidation;
