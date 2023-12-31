import { Router } from "express";
import { check, query } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";

export const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

authRouter.post(
  "/google",
  [
    check("id_token", "El id_token es necesario").not().isEmpty(),
    validarCampos,
  ],
  googleSignIn
);
