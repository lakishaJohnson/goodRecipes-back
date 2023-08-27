const db = require("../db/dbConfig.js");

const getAllRecipes = async (order, is_good, category) => {
  // console.log("Received category:", category);

  let query = "SELECT * FROM recipes";
  const validCategories = ["Breakfast", "Lunch", "Dinner"];

  const whereConditions = [];

  if (validCategories.includes(category)) {
    whereConditions.push(`category = '${category}'`);
  }

  if (is_good) {
    whereConditions.push(`is_good = true`);
  }

  if (whereConditions.length > 0) {
    query += ` WHERE ${whereConditions.join(" AND ")}`;
  }

  if (order === "asc") {
    query += " ORDER BY dish ASC";
  } else if (order === "desc") {
    query += " ORDER BY dish DESC";
  }

  // console.log("Final query:", query);

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
      "INSERT INTO recipes (dish, category, ingredients, prep_time, cook_time, total_time, directions, nutrition_facts, tips, is_good, is_quick, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        recipe.dish,
        recipe.category,
        recipe.ingredients,
        recipe.prep_time,
        recipe.cook_time,
        recipe.total_time,
        recipe.directions,
        recipe.nutrition_facts,
        recipe.tips,
        recipe.is_good,
        recipe.is_quick,
        recipe.image_url,
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
      "UPDATE recipes SET dish=$1, category=$2, ingredients=$3, prep_time=$4, cook_time=$5, total_time=$6, directions=$7, nutrition_facts=$8, tips=$9, is_good=$10, is_quick=$11, image_url=$12 where id=$13 RETURNING *",
      [
        recipe.dish,
        recipe.category,
        recipe.ingredients,
        recipe.prep_time,
        recipe.cook_time,
        recipe.total_time,
        recipe.directions,
        recipe.nutrition_facts,
        recipe.tips,
        recipe.is_good,
        recipe.is_quick,
        recipe.image_url,
        id,
      ]
    );
    return updatedRecipe;
  } catch (error) {
    throw error;
  }
};

// const updateIsGood = async (req, res) => {
//   const { id } = req.params;
//   const { is_good } = req.body;

//   try {
//     const updatedRecipe = await db.one(
//       "UPDATE recipes SET is_good=$1 WHERE id=$2 RETURNING *",
//       [is_good, id]
//     );

//     res.status(200).json(updatedRecipe);
//   } catch (error) {
//     console.error("Error updating is_good:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while updating is_good." });
//   }
// };

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  // updateIsGood
};
