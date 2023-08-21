import { Router } from "express";
import { check, query } from "express-validator";
import { search } from "../controllers/search.controller.js";

export const searchRouter = Router();

searchRouter.get("/:collection/:term", [], search);
