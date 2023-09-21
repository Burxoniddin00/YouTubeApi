import { Router } from "express";
import login from '../controllers/login.js'
export const loginRouters = Router();

loginRouters.post('/' , login.Password).post('/token',login.login);
