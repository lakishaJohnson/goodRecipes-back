const db = require("../db/dbConfig.js");

const getAllRecipes = async (category, order) => {
  let query = "SELECT * FROM recipes";
  const validCategories = ["Breakfast", "Lunch", "Dinner"];

  if (validCategories.includes(category)) {
    query += ` WHERE category = '${category}'`;
  }

  if (order === "asc") {
    query += " ORDER BY dish ASC";
  } else if (order === "desc") {
    query += " ORDER BY dish DESC";
  }

  try {
    const allRecipes = await db.any(query);
    return allRecipes;
  } catch (error) {
    throw error;
  }
};

const getRecipe = async (id) => {
  try {
    const oneRecipe = await db.one("SELECT * FROM recipes WHERE id=$1", id);
    return oneRecipe;
  } catch (error) {
    throw error;
  }
};

const createRecipe = async (recipe) => {
  try {
    const newRecipe = await db.one(
      "INSERT INTO recipes (dish, category, ingredients, prepTime, cookTime, totalTime, directions, nutritionFacts, tips, is_good) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        recipe.dish,
        recipe.category,
        recipe.ingredients,
        recipe.prepTime,
        recipe.cookTime,
        recipe.totalTime,
        recipe.directions,
        recipe.nutritionFacts,
        recipe.tips,
        recipe.is_good,
      ]
    );
    return newRecipe;
  } catch (error) {
    throw error;
  }
};

const deleteRecipe = async (id) => {
  try {
    const deletedRecipe = await db.one(
      "DELETE FROM recipes WHERE id = $1 RETURNING *",
      id
    );
    return deletedRecipe;
  } catch (error) {
    throw error;
  }
};

const updateRecipe = async (id, recipe) => {
  try {
    const updatedRecipe = await db.one(
      "UPDATE recipes SET dish=$1, category=$2, ingredients=$3, prepTime=$4, cookTime=$5, totalTime=$6, directions=$7, nutritionFacts=$8, tips=$9, is_good=$10 where id=$11 RETURNING *",
      [
        recipe.dish,
        recipe.category,
        recipe.ingredients,
        recipe.prepTime,
        recipe.cookTime,
        recipe.totalTime,
        recipe.directions,
        recipe.nutritionFacts,
        recipe.tips,
        recipe.is_good,
        id,
      ]
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
