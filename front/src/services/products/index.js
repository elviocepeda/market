import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_FAILED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILED,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAILED,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_FAILED,
} from "../../store/products/action-types";

const defaultHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const baseUrl = "http://localhost:3001/products";

export const getAllProducts = async (dispatch) => {
  try {
    const res = await fetch(baseUrl, { headers: defaultHeaders });
    const data = await res.json();
    dispatch({ type: GET_ALL_PRODUCTS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCTS_FAILED, payload: error });
  }
  return;
};

export const createProduct = async (dispatch, form) => {
  const options = {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(form),
  };
  try {
    const res = await fetch(baseUrl, options);
    const data = await res.json();
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILED, payload: error });
  }
  return;
};

export const updateProduct = async (dispatch, uuid, data) => {
  const options = {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(`${baseUrl}/${uuid}`, options);
    const data = await res.json();
    dispatch({ type: UPDATE_PRODUCT, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILED, payload: error });
  }
  return;
};

export const deleteProduct = async (dispatch, uuid) => {
  const options = {
    method: "DELETE",
    headers: defaultHeaders,
  };
  try {
    const res = await fetch(`${baseUrl}/${uuid}`, options);
    const data = await res.json();
    dispatch({ type: DELETE_PRODUCT, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILED, payload: error });
  }
  return;
};
