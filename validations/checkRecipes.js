const validateCategory = (req, res, next) => {
  if (!req.body.category || typeof req.body.category !== "string") {
    return res
      .status(400)
      .json({ error: "Category is required and must be a string" });
  }
  next();
};

const validateDish = (req, res, next) => {
  if (
    !req.body.dish ||
    typeof req.body.dish !== "string" 
  ) {
    return res
      .status(400)
      .json({
        error:
          "Name of dish is required and must be a string",
      });
  }
  next();
};

const validateIngredients = (req, res, next) => {
  if (!req.body.ingredients || typeof req.body.ingredients !== "string") {
    return res
      .status(400)
      .json({ error: "Ingredients are required and must be a string" });
  }
  next();
};

const validateDirections = (req, res, next) => {
  if (
    !req.body.directions ||
    typeof req.body.directions !== "string"
  ) {
    return res
      .status(400)
      .json({
        error:
          "Directions are required and must be a string with a max of 500 characters",
      });
  }
  next();
};

const validateIsGood = (req, res, next) => {
  const isGood = req.body.is_good;

  if (isGood === undefined || typeof isGood !== "boolean") {
    return res
      .status(400)
      .json({ error: "is_good is required and must be a boolean value" });
  }

  next();
};

const validateIsQuick = (req, res, next) => {
  const isQuick = req.body.is_quick;

  if (isQuick === undefined || typeof isQuick !== "boolean") {
    return res
      .status(400)
      .json({ error: "is_quick is required and must be a boolean value" });
  }

  next();
};


module.exports = {
  validateCategory,
  validateDish,
  validateIngredients,
  validateDirections,
  validateIsGood,
  validateIsQuick,
};
