import { Router } from "express";
import userRoutes from "./User.routes.js";
import linkRoutes from "./Link.routes.js";

const route = Router();

route.use("/users", userRoutes);
route.use("/link", linkRoutes);

export default route;
