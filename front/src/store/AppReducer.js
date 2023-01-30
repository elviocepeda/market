import {
  GET_SINGLE_USER,
  GET_SINGLE_USER_FAILED,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILED,
  GET_USER_LOCATION,
  GET_USER_LOCATION_FAILED,
  CREATE_USER,
  CREATE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  DELETE_USER_FAILED,
  DELETE_USER,
} from "./action-types";

export const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_SINGLE_USER: {
      const filteredUser = state.users.find(
        (user) => user.uuid === action.payload
      );
      const user = {
        isLoading: false,
        message: "Datos del cliente -Nombre Apellido- obtenidos con éxito",
        error: null,
        data: filteredUser,
      };
      return { ...state, user };
    }

    case GET_SINGLE_USER_FAILED: {
      const user = {
        isLoading: false,
        message: "No se pudieron obtener los datos del cliente solicitado",
        error: action.payload,
        data: {},
      };
      return { ...state, user };
    }

    case GET_ALL_USERS: {
      const users = {
        isLoading: false,
        message: "La lista completa de clientes fue obtenida con éxito",
        error: null,
        data: action.payload,
      };
      return { ...state, users };
    }

    case GET_ALL_USERS_FAILED: {
      const users = {
        isLoading: false,
        message: "No se pudo obtener la lista completa de clientes",
        error: action.payload,
        data: {},
      };
      return { ...state, users };
    }

    case CREATE_USER: {
      const users = {
        isLoading: false,
        message: "Nueva cliente creado con éxito",
        error: null,
        data: action.payload,
      };
      return { ...state, users };
    }

    case CREATE_USER_FAILED: {
      const users = {
        isLoading: false,
        message: "No se pudo crear un nuevo cliente",
        error: action.payload,
        data: {},
      };
      return { ...state, users };
    }

    case UPDATE_USER: {
      const users = {
        isLoading: false,
        message: "Cliente actualizado con éxito",
        error: null,
        data: action.payload,
      };
      return { ...state, users };
    }

    case UPDATE_USER_FAILED: {
      const users = {
        isLoading: false,
        message: "No se actualizar el cliente",
        error: action.payload,
        data: {},
      };
      return { ...state, users };
    }

    case DELETE_USER: {
      const users = {
        isLoading: false,
        message: "Cliente eliminado con éxito",
        error: null,
        data: action.payload,
      };
      return { ...state, users };
    }

    case DELETE_USER_FAILED: {
      const users = {
        isLoading: false,
        message: "No se pudo eliminar el cliente",
        error: action.payload,
        data: {},
      };
      return { ...state, users };
    }

    case GET_USER_LOCATION: {
      const currentLocation = {
        isLoading: false,
        message: "Ubicación obtenida con éxito",
        error: null,
        data: action.payload,
      };
      return { ...state, currentLocation };
    }

    case GET_USER_LOCATION_FAILED: {
      const currentLocation = {
        isLoading: false,
        message: "No se pudo obtener la ubicación",
        error: action.payload,
        data: {},
      };
      return { ...state, currentLocation };
    }

    default:
      return state;
  }
};
