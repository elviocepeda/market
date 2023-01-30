import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/userSchema";

import { GET_USER_LOCATION } from "../../store/action-types";
import { getLocation } from "../../helpers";

import { useStore } from "../../store";
import { createUser, updateUser } from "../../services/users";
import { uuid } from "../../common";

import "./UserForm.css";
import { useEffect } from "react";

export const Form = ({ manager, dataToEdit, setDataToEdit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { appDispatch } = useStore();
  const handleGetLocation = () => {
    getLocation().then((coords) =>
      appDispatch({ type: GET_USER_LOCATION, payload: coords })
    );
  };

  useEffect(() => {
    if (dataToEdit) {
      setValue("name", dataToEdit.name);
      setValue("email", dataToEdit.email);
      setValue("phone", dataToEdit.phone);
      setFocus("name");
    }
  }, [dataToEdit]);

  const onSubmit = (form) => {
    if (dataToEdit) {
      const { id } = dataToEdit;
      updateUser(appDispatch, id, form);
      resetField("name");
      resetField("email");
      resetField("phone");
      setDataToEdit(null);
    } else {
      const data = {
        ...form,
        uuid: uuid(),
        password: "",
        location: "",
      };
      createUser(appDispatch, data);
      resetField("name");
      resetField("email");
      resetField("phone");
    }
  };

  return (
    <div className="user_form_wrapper">
      <p className="user_form_title">{dataToEdit ? "Editar" : "Agregar"}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="user_form_form">
        <input {...register("name")} placeholder="Nombre" />
        <p>{errors.name?.message}</p>
        <input {...register("email")} placeholder="Email" />
        <p>{errors.email?.message}</p>
        <input {...register("phone")} placeholder="Teléfono" />
        <p>{errors.phone?.message}</p>
        <input type="submit" value={dataToEdit ? "Guardar" : "Agregar"} />
      </form>
    </div>
  );
};
