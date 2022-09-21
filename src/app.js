import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import db from "./database/db.js";

const app = express();

// settings
app.set("port", process.env.PORT || 3001);

// middlewares
app.use(express.json());
app.use(cors("*"));

// route
app.use("/", routes);

export default app;
