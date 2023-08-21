import { request, response } from "express";
import { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/producto.model.js";

const collectionsAllowed = ["users", "categories", "products", "roles"];

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

const searchCategories = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const categories = await Category.find({ name: regex, state: true });
  res.json({ results: categories });
};

const searchProducts = async (term = "", res = response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }
  const regex = new RegExp(term, "i");
  const products = await Product.find({ name: regex, state: true });
  res.json({ results: products });
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
      searchCategories(term, res);
      break;

    case "products":
      searchProducts(term, res);
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
