import { Router } from "express";
import { DELET, GET, PUT } from "../controllers/Subscribers.controller.js";

export const SubscribersRouters = Router();

SubscribersRouters.get("/", GET);
SubscribersRouters.get("/:id", GET);
SubscribersRouters.put("/:id", PUT)
SubscribersRouters.delete("/:id", DELET);
