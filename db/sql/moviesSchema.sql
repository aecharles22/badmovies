-- SET UP SCHEMA HERE

CREATE DATABASE movies;

USE movies;

CREATE TABLE movie (
  id INT NOT NULL,
  movie_title VARCHAR(200) NOT NULL,
  release_date VARCHAR(200) NOT NULL,
  rating VARCHAR(20) NOT NULL,
  poster_id VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);