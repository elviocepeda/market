import { UserModel, SecureKeyModel } from "../database/models/index.js";
import { sendError } from "../utils/index.js";

export const verifyKey = async (req, res, next) => {
  const { key, email } = req.query;
  if (!key || !email) return sendError(res, "Parametros inválidos", 401);

  const user = await UserModel.findOne({ email });
  if (!user)
    return sendError(res, "No se encontró un usuario con ese email", 400);

  const secureKey = await SecureKeyModel.findOne({ owner: user.email });
  if (!secureKey)
    return sendError(
      res,
      "No se encontró la clave de verificación de la cuenta",
      400
    );

  req.user = user;
  next();
};
