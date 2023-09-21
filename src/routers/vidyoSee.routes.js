import { Router } from "express";
import { DELET, GET, PUT } from "../controllers/vidyoSee.controller.js";

export const vidyoSeeRouters = Router();

vidyoSeeRouters.get("/", GET);
vidyoSeeRouters.get("/:id", GET);
vidyoSeeRouters.put("/:id", PUT)
vidyoSeeRouters.delete("/:id", DELET);
