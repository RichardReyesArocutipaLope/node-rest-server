import { request, response } from "express";
import { Product } from "../models/producto.model.js";
import { Category } from "../models/category.model.js";
import { getCategory } from "./categories.controller.js";

export const getProducts = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };
  const queryProducts = Product.find(query)
    .populate("category")
    .skip(offset)
    .limit(limit);
  const queryCountProducts = Product.countDocuments(query);
  const [countProducts, products] = await Promise.all([
    queryCountProducts,
    queryProducts,
  ]);

  res.json({ countProducts, products });
};

export const getProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("category")
    .populate("user");
  if (!product) {
    return res.status(500).json({
      msg: "Producto no encontrado",
    });
  }
  res.json(product);
};

export const createProduct = async (req = request, res = response) => {
  const category = req.body.category.toUpperCase();
  const getCategory = await Category.findOne({ name: category });
  if (!getCategory) {
    return res.status(404).json({ msg: "Categoria no encontrada" });
  }

  const name = req.body.name.toUpperCase();
  const existsProduct = await Product.findOne({ name });
  if (existsProduct) {
    return res.status(400).json({ msg: "Este producto ya existe" });
  }

  const { price, description, available } = req.body;
  const userId = req.userAuth._id;

  const newProduct = new Product({
    name,
    user: userId,
    price,
    category: getCategory._id,
    description,
    available,
  });
  await newProduct.save();

  res.json(newProduct);
};

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, name, category, ...rest } = req.body;
  let getCategory = null;
  if (name) {
    const existsProduct = await Product.findOne({ name: name.toUpperCase() });
    if (existsProduct) {
      return res.status(400).json({ msg: "Este nombre de producto ya existe" });
    }
  }
  if (category) {
    getCategory = await Category.findOne({ name: category.toUpperCase() });
    if (!getCategory) {
      return res.status(404).json({ msg: "Categoria no encontrada" });
    }
  }

  const product = await Product.findByIdAndUpdate(
    id,
    {
      name: name?.toUpperCase(),
      category: getCategory?._id || category,
      ...rest,
    },
    { new: true }
  ).populate("category");

  res.json(product);
};

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.json(product);
};
