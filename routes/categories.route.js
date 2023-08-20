import { Router } from "express";
import { check, query } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existsCategory } from "../helpers/dbValidators.js";
import { hasRole } from "../middlewares/validar-roles.js";

export const categoriesRouter = Router();

// Obtener todas las categorias - public
categoriesRouter.get(
  "/",
  [
    query("limit", "El limit debe ser un número").isNumeric().optional(),
    query("offset", "El offset debe ser un número").isNumeric().optional(),
    validarCampos,
  ],
  getCategories
);

// Obtener una categoria por id - public
categoriesRouter.get(
  "/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  getCategory
);

// Crear una categoria - privado - cualquier persona con un token válido
categoriesRouter.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createCategory
);

// Actualizar una categoria por id
categoriesRouter.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsCategory),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  updateCategory
);

// Borrar una categoria - admin
categoriesRouter.delete(
  "/:id",
  [
    validarJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsCategory),
    validarCampos,
  ],
  deleteCategory
);
