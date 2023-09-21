import { Router } from "express";
import { GET, POST, PUT } from "../controllers/users.controller.js";

export const UsersRouters = Router();

UsersRouters.get("/", GET);
UsersRouters.get("/:id", GET);
UsersRouters.post("/", POST);
UsersRouters.put("/:id", PUT);
