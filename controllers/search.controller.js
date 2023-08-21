import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";

export const collectionsAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  res.json({ results: users });
};

export const search = async (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;

    case "categories":
      break;

    case "products":
      break;

    default:
      res.status(500).json({
        msg: "Error en la collecion",
      });
      break;
  }

  //   res.json({
  //     msg: "BUSCAR ...",
  //     collection,
  //     term,
  //   });
};
