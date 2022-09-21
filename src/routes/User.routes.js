import { Router } from "express";
import controller from "../controllers/User.controller.js";

const route = Router();

route.post("/signup", controller.signUp);
route.post("/login", controller.login);

export default route;
