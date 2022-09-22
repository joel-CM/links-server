import { Router } from "express";
import controller from "../controllers/User.controller.js";

const route = Router();

route.post("/signup", controller.signUp);
route.post("/login", controller.login);
route.post("/verify", controller.verify);

export default route;
