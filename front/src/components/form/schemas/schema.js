import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Nombre obligatorio"),
  email: yup.string().email().required("Email obligatorio"),
  phone: yup.string().required("Teléfono obligatorio"),
});
