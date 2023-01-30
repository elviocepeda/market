import { SecureKeyModel, UserModel } from "./models/index.js";
import { newUserFormatter, userFormatter } from "../utils/formatter.js";
import {
  createRandomBytes,
  hashPassword,
  mailTransport,
} from "../utils/index.js";
import bcrypt from "bcrypt";

const getAllUsers = async () => {
  const filter = {};
  const allUsers = await UserModel.find(filter);
  if (allUsers.length > 0) {
    const formattedUsers = allUsers.map((user) => userFormatter(user));
    return {
      data: formattedUsers,
      success: true,
      message: "",
      status: 200,
    };
  } else
    return {
      data: {},
      success: false,
      message: "Actualmente no hay usuarios registrados en la base de datos.",
      status: 204,
    };
};

const getOneUser = async (uuid) => {
  const user = await UserModel.findOne({ uuid });
  if (user) {
    const formattedUser = userFormatter(user);
    return {
      data: formattedUser,
      success: true,
      message: "",
      status: 200,
    };
  } else
    return {
      data: {},
      success: false,
      message: "No hay un usuario con ese uuid",
      status: 400,
    };
};

const createUser = async (newUser) => {
  const isEmailExist = await UserModel.findOne({ email: newUser.email });
  if (isEmailExist) {
    return {
      data: {},
      success: false,
      message: "El email ingresado ya existe en la base de datos.",
      status: 401,
    };
  }
  const formattedNewUser = newUserFormatter(newUser);
  const user = new UserModel(formattedNewUser);

  const randomBytes = await createRandomBytes();
  const secureKey = new SecureKeyModel({
    owner: user.email,
    key: randomBytes,
  });

  if (!secureKey)
    return {
      data: {},
      success: false,
      message: "No se pudo crear una nueva clave de verificación",
      status: 500,
    };

  const savedUser = await user.save();
  if (!savedUser)
    return {
      data: {},
      success: false,
      message: "No se pudo guardar el usuario en la base de datos",
      status: 500,
    };
  const savedSecureKey = await secureKey.save();
  if (!savedSecureKey)
    return {
      data: {},
      success: false,
      message:
        "No se pudo guardar la clave de verificación en la base de datos",
      status: 500,
    };

  mailTransport().sendMail({
    from: "mail@mail.com",
    to: user.email,
    subject: "Renta App: validar cuenta.",
    html: `http://localhost:3000/set-password?key=${randomBytes}&email=${user.email}`,
  });

  return {
    data: {},
    success: true,
    message: "Se envió un link a tu email para verificar tu cuenta!",
    status: 201,
  };
};

const updateUser = async (update, uuid) => {
  const editDate = Date.now();
  const data = { ...update, lastEdit: editDate };
  const updated = await UserModel.updateOne({ uuid }, { $set: data });
  if (!updated)
    return {
      data: {},
      success: false,
      message: "No hay un usuario con ese uuid.",
      status: 400,
    };
  else
    return {
      data: {},
      success: true,
      message: "Usuario actualizado con éxito.",
      status: 200,
    };
};

const deleteUser = async (uuid) => {
  const user = await UserModel.findOne({ uuid });
  if (user) {
    const deletedUser = await UserModel.deleteOne({ uuid: user.uuid });
    return {
      data: deletedUser,
      success: true,
      message: "Usuario eliminado con éxito.",
      status: 200,
    };
  } else
    return {
      data: {},
      success: false,
      message: "No existe un usuario con ese uuid",
      status: 400,
    };
};

const forgotPassword = async (email) => {
  const user = await UserModel.findOne({ email });
  if (!user)
    return {
      data: {},
      success: false,
      message: "No se encontro un usuario con ese email en la base de datos",
      status: 400,
    };

  const tokenExist = await SecureKeyModel.findOne({ owner: user.email });
  if (tokenExist)
    return {
      data: {},
      success: false,
      message:
        "Debes esperar una hora para obtener un nuevo código y reestablecer la contraseña!",
      status: 401,
    };

  const randomBytes = await createRandomBytes();
  const setPwdToken = new SecureKeyModel({
    owner: user.email,
    token: randomBytes,
  });
  await setPwdToken.save();

  mailTransport().sendMail({
    from: "mail@mail.com",
    to: user.email,
    subject: "QualityCode: reestablecer contraseña.",
    html: `http://localhost:3000/set-password?token=${randomBytes}&uuid=${user.uuid}`,
  });

  return {
    data: {},
    success: true,
    message: "Se envió un link a tu email para reestablecer la contraseña!",
    status: 200,
  };
};

const setPassword = async (newPwd, uuid) => {
  const user = await UserModel.findOne({ uuid });
  if (!user)
    return {
      data: {},
      success: false,
      message: "No se encontro un usuario con ese uuid.",
      status: 400,
    };

  if (user.password !== "") {
    const isSamePassword = await bcrypt.compare(newPwd, user.password);
    if (isSamePassword)
      return {
        data: {},
        success: false,
        message: "La contraseña nueva es igual a la anterior",
        status: 409,
      };
  }

  const hashedNewPwd = await hashPassword(newPwd);
  if (!hashedNewPwd)
    return {
      data: {},
      success: false,
      message: "Hubo un problema al intentar encriptar la contraseña",
      status: 500,
    };

  await UserModel.updateOne(
    { uuid },
    { $set: { password: hashedNewPwd, verified: true } }
  );
  await SecureKeyModel.findOneAndDelete({ owner: user.email });

  mailTransport().sendMail({
    from: "mail@mail.com",
    to: user.email,
    subject: "QualityCode: contraseña reestablecida!",
    html: "Ya puedes iniciar sesión con tu nueva contraseña!",
  });

  return {
    data: {},
    success: true,
    message: "Contraseña creada con éxito",
    status: 201,
  };
};

const setAvatar = async (url, uuid) => {
  const updated = await UserModel.updateOne(
    { uuid },
    { $set: { avatar: url } }
  );
  if (!updated)
    return {
      data: {},
      success: false,
      message: "No existe un usuario con ese uuid.",
      status: 400,
    };
  else
    return {
      data: {},
      success: true,
      message: "Usuario actualizado con éxito.",
      status: 200,
    };
};

const verifyAccount = async (email) => {
  await UserModel.updateOne({ email }, { $set: { verified: true } });

  await SecureKeyModel.findOneAndDelete({ owner: email });

  return {
    data: {},
    success: true,
    message: "Cuenta verificada con éxito.",
    status: 200,
  };
};

export default {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  setPassword,
  setAvatar,
  verifyAccount,
};
