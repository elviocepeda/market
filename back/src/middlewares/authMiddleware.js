import { sendError } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const authMiddleware = () => {
  return async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) sendError(res, "Parametros inválidos", 400);
      const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
      const isVerified = jwt.verify(token, JWT_PRIVATE_KEY);
      if (isVerified) next();
    } catch (err) {
      return sendError(res, "Sin autorización", 401);
    }
  };
};
