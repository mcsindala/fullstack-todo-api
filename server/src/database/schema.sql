CREATE DATABASE "fullstack-todo-api";

\c "fullstack-todo-api"

CREATE TABLE todos (
"id" SERIAL PRIMARY KEY,
"description" VARCHAR(255) NOT NULL,
"completed" BOOLEAN DEFAULT FALSE
);