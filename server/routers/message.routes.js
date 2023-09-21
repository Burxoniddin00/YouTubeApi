import { Router } from "express";
import user from "../controllers/message.controller.js";

const massageRouters = Router();

massageRouters
  .get("/", user.get)
  .get("/:id", user.get)
  .post("/", user.post)
  .delete("/:id", user.delete)
  .put("/:id", user.put);

export default massageRouters;
