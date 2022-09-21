import app from "./src/app.js";

// start server
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
