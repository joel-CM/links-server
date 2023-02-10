import express from "express";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import db from "./database/db.js";

const app = express();

// settings
app.set("port", process.env.PORT || 3001);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://joelcm-links-client-d1phm60gw-joel-cm.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, token, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// route
app.use("/", routes);

export default app;
