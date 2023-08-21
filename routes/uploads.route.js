import { Router } from "express";
import { check, query } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
  showImage,
  updateImage,
  updateImageCloudinary,
  uploadFile,
} from "../controllers/uploads.controller.js";
import { collectionsAllowed } from "../helpers/dbValidators.js";
import { validateFile } from "../middlewares/validateFile.js";

export const uploadsRouter = Router();

uploadsRouter.post("/", [validateFile], uploadFile);
uploadsRouter.put(
  "/:collection/:id",
  [
    validateFile,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validarCampos,
  ],
  // updateImage
  updateImageCloudinary
);

uploadsRouter.get(
  "/:collection/:id",
  [
    check("id", "El id debe ser de mongo").isMongoId(),
    check("collection").custom((c) =>
      collectionsAllowed(c, ["users", "products"])
    ),
    validarCampos,
  ],
  showImage
);
