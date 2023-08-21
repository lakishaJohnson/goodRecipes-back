const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const recipesController = require("./controllers/recipesController");
app.use("/recipes", recipesController);

const { getQuickRecipes } = require("./queries/recipes");

// ROUTES
app.get("/", async (req, res) => {
  try {
    const quickRecipesData = await getQuickRecipes();
    res.json(quickRecipesData);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
