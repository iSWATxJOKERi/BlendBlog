-- CREATE DATABASE blendblog;
DROP TABLE favorites;
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
    date VARCHAR(26) NOT NULL,
    username VARCHAR(16) NOT NULL,

    FOREIGN KEY (blogger_id) REFERENCES users(id)
);

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    favoriter_id SERIAL NOT NULL,
    favoritee_id SERIAL NOT NULL,
    post_id SERIAL NOT NULL,

    FOREIGN KEY (favoriter_id) REFERENCES users(id),
    FOREIGN KEY (favoritee_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);
