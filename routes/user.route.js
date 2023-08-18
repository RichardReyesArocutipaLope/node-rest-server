import { Router } from "express";
import {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} from "../controllers/user.controller.js";
import { check, query } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
  existsEmail,
  existsUserById,
  isValidRole,
} from "../helpers/dbValidators.js";

export const router = Router();

router.get(
  "/",
  [
    query("limit", "El limit debe ser numérico").isNumeric().optional(),
    query("offset", "El offset debe ser numérico").isNumeric().optional(),
    validarCampos,
  ],
  userGet
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserById),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  userPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(existsEmail),
    check("password", "El password debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    // check("role", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isValidRole),
    validarCampos,
  ],
  userPost
);

router.delete("/", userDelete);

router.patch("/", userPatch);
