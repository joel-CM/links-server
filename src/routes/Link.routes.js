import { Router } from "express";
import controller from "../controllers/Link.controller.js";
import auth from "../middlewares/auth.js";

const route = Router();

route.post("/create", auth, controller.createLink);
route.put("/update/:id", auth, controller.updateLink);
route.delete("/delete/:id", auth, controller.deleteLink);

export default route;
