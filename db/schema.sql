DROP DATABASE IF EXISTS recipes_dev;
CREATE DATABASE recipes_dev;

\c recipes_dev;

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    category TEXT NOT NULL,
    dish VARCHAR(500) NOT NULL,
    ingredients VARCHAR NOT NULL,
    prepTime INTERVAL,
    cookTime INTERVAL,
    totalTime INTERVAL,
    directions VARCHAR NOT NULL,
    nutritionFacts VARCHAR DEFAULT NULL,
    tips VARCHAR DEFAULT NULL,
    is_good BOOLEAN
)