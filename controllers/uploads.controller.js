import { request, response } from "express";
import { uploadFileHelper } from "../helpers/uploadFile.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/producto.model.js";

export const uploadFile = async (req = request, res = response) => {
  try {
    const nameFile = await uploadFileHelper(req.files, undefined, "imgs");
    res.json({ nameFile });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;
  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `No existe un usuario con el id ${id}` });
      break;

    case "products":
      model = await Product.findById(id);
      if (!model)
        return res
          .status(400)
          .json({ msg: `No existe un producto con el id ${id}` });
      break;

    default:
      return res.status(500).json({ msg: "Coleccion no validada" });
  }

  try {
    const nameFile = await uploadFileHelper(req.files, undefined, collection);
    model.img = nameFile;
    await model.save();
    res.json(model);
  } catch (error) {
    res.status(400).json({ error });
  }
};
