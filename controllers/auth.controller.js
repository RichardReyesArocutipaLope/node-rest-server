import { request, response } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";

export const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg: "Correo incorrecto",
      });
    //Verificar si el usuario esta activo

    if (!user.state)
      return res.status(400).json({
        msg: "Usuario inactivo",
      });

    //Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword)
      return res.status(400).json({
        msg: "Contraseña incorrecta",
      });

    // Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
