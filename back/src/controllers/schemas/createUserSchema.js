import yup from "yup";

const createUserSchema = yup.object().shape({
  name: yup.string().required("Nombre obligatorio."),
  email: yup
    .string()
    .required("Email obligatorio.")
    .email("Ingresa un email válido."),
  phone: yup.string().required("Teléfono obligatorio."),
  birthDate: yup.string().required("Fecha de nacimiento obligatoria."),
  password: yup.string().required("Contraseña obligatoria."),
});

export default createUserSchema;
