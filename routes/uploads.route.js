import { Router } from "express";
import { check, query } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { uploadFile } from "../controllers/uploads.controller.js";

export const uploadsRouter = Router();

uploadsRouter.post("/", [], uploadFile);
