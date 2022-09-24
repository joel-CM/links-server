import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import db from "./database/db.js";

const app = express();

// settings
app.set("port", process.env.PORT || 3001);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// route
app.use("/", routes);

export default app;
