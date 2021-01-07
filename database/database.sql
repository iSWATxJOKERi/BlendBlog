CREATE DATABASE blendblog;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    fullname VARCHAR(40) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password TEXT NOT NULL
);
