import { v4 as uuid } from "uuid";

export const userFormatter = (user) => {
  const data = {
    uuid: user.uuid,
    role: user.role,
    name: user.name,
    birthDate: user.birthDate,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    createdAt: user.createdAt,
    lastEdit: user.lastEdit,
    verified: user.verified,
    isConnected: user.isConnected,
    favorites: user.favorites,
    rating: user.rating,
  };
  return data;
};

export const newUserFormatter = (user) => {
  const { name, email, phone, birthDate, password } = user;
  const initialUser = {
    uuid: uuid(),
    role: "default",
    name,
    email,
    phone,
    birthDate,
    password,
    avatar: "",
    createdAt: Date.now(),
    lastEdit: "",
    verified: false,
    isConnected: false,
    favorites: [],
    rating: "",
  };
  return initialUser;
};

export const productFormatter = (product) => {
  const data = {
    uuid: product.uuid,
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    brand: product.brand,
    createdAt: product.createdAt,
    lastEdit: product.lastEdit,
    expirationDate: product.expirationDate,
    bought: product.bought,
  };
  return data;
};

export const newProductFormatter = (product) => {
  const { name, quantity } = user;
  const initialUser = {
    uuid: uuid(),
    name,
    category,
    quantity,
    brand: "",
    createdAt: Date.now(),
    lastEdit: "",
    expirationDate: "",
    bought: "",
  };
  return initialUser;
};

export const responseFormatter = (response) => {
  const data = {
    data: response.data || {},
    success: response.success || false,
    message: response.message || "",
    token: response.token || "",
  };
  return data;
};
