-- CREATE DATABASE blendblog;
DROP TABLE posts;
DROP TABLE users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(40) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password TEXT,
    created_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(32) NOT NULL,
    body TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW(),
    blogger_id SERIAL NOT NULL,

    FOREIGN KEY (blogger_id) REFERENCES users(id)
)
