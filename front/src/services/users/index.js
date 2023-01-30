import {
  CREATE_USER,
  CREATE_USER_FAILED,
  DELETE_USER,
  DELETE_USER_FAILED,
  GET_ALL_USERS,
  GET_ALL_USERS_FAILED,
  UPDATE_USER,
  UPDATE_USER_FAILED,
} from "../../store/users/action-types";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const baseUrl = "http://localhost:3001/users";

export const getAllUsers = async (dispatch) => {
  try {
    const res = await fetch(baseUrl, { headers: defaultHeaders });
    const data = await res.json();
    dispatch({ type: GET_ALL_USERS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAILED, payload: error });
  }
  return;
};

export const createUser = async (dispatch, form) => {
  const options = {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(form),
  };
  try {
    const res = await fetch(baseUrl, options);
    const data = await res.json();
    dispatch({ type: CREATE_USER, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILED, payload: error });
  }
  return;
};

export const updateUser = async (dispatch, uuid, data) => {
  const options = {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(`${baseUrl}/${uuid}`, options);
    const data = await res.json();
    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAILED, payload: error });
  }
  return;
};

export const deleteUser = async (dispatch, uuid) => {
  const options = {
    method: "DELETE",
    headers: defaultHeaders,
  };
  try {
    const res = await fetch(`${baseUrl}/${uuid}`, options);
    const data = await res.json();
    dispatch({ type: DELETE_USER, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAILED, payload: error });
  }
  return;
};
