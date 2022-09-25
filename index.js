import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

// start server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
