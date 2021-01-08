-- CREATE DATABASE blendblog;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(40) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
