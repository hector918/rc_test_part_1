DROP DATABASE IF EXISTS rc_test;

CREATE DATABASE rc_test;

\c rc_test;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    user_id INTEGER REFERENCES users(id),
    release_date DATE
);