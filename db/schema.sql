DROP DATABASE IF EXISTS recipes_dev;
CREATE DATABASE recipes_dev;

\c recipes_dev;

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY, 
    category TEXT NOT NULL,
    dish VARCHAR(500) NOT NULL,
    ingredients VARCHAR NOT NULL,
    prep_time TEXT,
    cook_time TEXT,
    total_time TEXT,
    directions VARCHAR(5000) NOT NULL,
    nutrition_facts INTEGER,
    tips VARCHAR DEFAULT NULL,
    is_good BOOLEAN,
    is_quick BOOLEAN,
    image_url TEXT DEFAULT NULL
);

