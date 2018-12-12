const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const material = require("./routes/material");

const app = express();

app.set("port", process.env.SERVER_PORT || 8080);
app.use(morgan("dev"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/material/search/", material.search);
app.all("*", (req, res) => res.status(404).send("Not Found"));

app.use((err, req, res, next) => {
  console.log(err);
  return res.json("Server Error");
});

app.listen(app.get("port"), () => {
  console.log("[RUNNING] PORT: %d TIME: %s", app.get("port"), Date());
});

module.exports = app;
