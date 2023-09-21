import { Router } from "express";
import { DLETE, GET, POST, PUT } from "../controllers/vidyo.controler.js";

export const vidyoRouters = Router();

vidyoRouters.get("/", GET);
vidyoRouters.get("/:id", GET);
vidyoRouters.post("/", POST);
vidyoRouters.put("/:id", PUT);
vidyoRouters.delete("/:id", DLETE);
