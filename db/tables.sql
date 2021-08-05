DROP DATABASE IF EXISTS wedding_plans;
CREATE DATABASE wedding_plans;
\c wedding_plans;

DROP TABLE IF EXISTS client_info CASCADE;
DROP TABLE IF EXISTS notes;

CREATE TABLE client_info (
    client_id SERIAL PRIMARY KEY,
    "name" VARCHAR(255)
);

CREATE TABLE notes (
    wedding_day INTEGER,
    wedding_month INTEGER,
    city VARCHAR(255)
);