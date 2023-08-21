// THIS FILE HOLDS ALL THE CRUD ROUTES: REQUESTS TO DATABASE
const express = require("express");
const recipes = express.Router();
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../queries/recipes");

// const {
//     checkName, checkBoolean, checkArtist
// } = require("../validations/checkSongs")

// INDEX
recipes.get("/", async (req, res) => {
  const { order, is_good, category } = req.query;
  try {
    const getRecipes = await getAllRecipes(order, is_good, category);
    if (getRecipes.length > 0) {
      res.status(200).json(getRecipes);
    } else {
      res.status(404).json({ error: "No recipes found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// SHOW
recipes.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipe(id);
  if (recipe.id) {
    res.json(recipe);
  } else {
    res.redirect("/404"); // BROWSER ERROR
    // res.status(404).json("Song not found with the given ID");
  }
});

// CREATE
recipes.post("/", async (req, res) => {
// recipes.post("/", checkName, checkBoolean, checkArtist, async (req, res) => {
  try {
    const recipe = await createRecipe(req.body);
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// DELETE
recipes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await deleteRecipe(id);
  if (deletedRecipe) {
    res.status(200).json(deletedRecipe);
  } else {
    res.status(404).json({ error: "Recipe not found" });
  }
});

// UPDATE
recipes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRecipe = await updateRecipe(id, req.body);
  res.status(200).json(updatedRecipe);
});

module.exports = recipes;
