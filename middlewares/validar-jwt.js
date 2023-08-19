import { request, response } from "express";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "No hay token en la peticion" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const userAuth = await User.findById(uid);
    if (!userAuth) return res.status(401).json({ msg: "Usuario no existe" });
    if (!userAuth.state)
      return res.status(401).json({ msg: "Usuario inactivo" });
    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};
