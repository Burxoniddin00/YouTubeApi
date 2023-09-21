import { Router } from "express";
import admin from "../controllers/addmi.controller.js";

const addminRouters = Router();

addminRouters
  .get("/", admin.get)
  .get("/:id", admin.get)
  .post("/", admin.post)
  .delete("/:id", admin.delete)
  .put("/:id", admin.put);

export default addminRouters;
