import { request, response } from "express";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const userGet = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };
  const getUsers = User.find(query).skip(+offset).limit(+limit);
  const getTotal = User.countDocuments(query);
  const [users, total] = await Promise.all([getUsers, getTotal]);
  res.json({
    users,
    total,
  });
};

export const userPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, ...rest } = req.body;
  // TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, rest, { new: true });
  res.json(usuario);
};

export const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const usuario = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();
  res.json(usuario);
};

export const userDelete = async (req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    user,
  });
};

export const userPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - controller",
  });
};
