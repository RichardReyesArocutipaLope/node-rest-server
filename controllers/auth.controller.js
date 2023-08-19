import { request, response } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

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

export const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        img: picture,
        role: "USER_ROLE",
        password: "without-password",
        google: true,
      };
      user = new User(data);
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Hable con el administrador, usuario bloqueado",
      });
    }

    const token = await generarJWT(user?.id);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "El token no se pudo verificar",
    });
  }
};
