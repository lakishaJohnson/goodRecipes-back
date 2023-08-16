const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const recipesController = require("./controllers/recipesController.js");
app.use("/recipes", recipesController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Recipes R Us");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
