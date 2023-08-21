import { Router } from "express";
import { check, query } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existsProduct } from "../helpers/dbValidators.js";
import { hasRole } from "../middlewares/validar-roles.js";

export const productsRouter = Router();

productsRouter.get(
  "/",
  [
    query("limit", "El limit debe ser númerico").isNumeric().optional(),
    query("offset", "El offset debe ser númerico").isNumeric().optional(),
    validarCampos,
  ],
  getProducts
);

productsRouter.get(
  "/:id",
  [check("id", "No es un ID válido").isMongoId(), validarCampos],
  getProduct
);

productsRouter.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "La categoria es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createProduct
);

productsRouter.put(
  "/:id",
  [
    validarJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsProduct),
    validarCampos,
  ],
  updateProduct
);

productsRouter.delete(
  "/:id",
  [
    validarJWT,
    hasRole("ADMIN_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsProduct),
    validarCampos,
  ],
  deleteProduct
);
