import { request, response } from "express";
import { Category } from "../models/category.model.js";

export const getCategories = async (req = request, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };
  const queryCategories = Category.find(query)
    .populate("user")
    .skip(offset)
    .limit(limit);
  const queryTotalCategories = Category.countDocuments(query);
  const [categories, totalCategories] = await Promise.all([
    queryCategories,
    queryTotalCategories,
  ]);

  res.json({
    totalCategories,
    categories,
  });
};

export const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate("user");
  if (!category || !category.state)
    return res.status(404).json({ msg: "Categoria no encontrada" });
  res.json({ category });
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const existsName = await Category.findOne({ name });
  if (existsName) return res.json({ msg: "Esta categoria ya existe" });
  const user = req.userAuth._id;
  const newCategory = new Category({ name, user });
  await newCategory.save();
  res.json(newCategory);
};

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const name = req.body.name.toUpperCase();
  const existsName = await Category.findOne({ name });
  if (existsName) return res.json({ msg: "Esta categoria ya existe" });
  const newCategory = await Category.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  res.json({
    newCategory,
  });
};

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  res.json({
    category,
  });
};
