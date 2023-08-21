import { Category } from "../models/category.model.js";
import { Product } from "../models/producto.model.js";
import { Role } from "../models/role.model.js";
import { User } from "../models/user.model.js";

export const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole)
    throw new Error(`El rol ${role} no está registrado en la BD`);
};

export const existsEmail = async (email) => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) throw new Error("El email ya esta registrado");
};

export const existsUserById = async (id) => {
  const existsUser = await User.findById(id);
  if (!existsUser) throw new Error(`El id: ${id} no existe`);
};

export const existsCategory = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error(`El id: ${id} no existe`);
};

export const existsProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`El id: ${id} no existe`);
};
