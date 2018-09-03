-- SET UP SCHEMA HERE

CREATE DATABASE movies;

USE movies;

CREATE TABLE movie (
  id INT AUTO_INCREMENT,
  movie_title VARCHAR(200),
  release_date VARCHAR(200),
  rating VARCHAR(20),
  poster_id VARCHAR(200),
  PRIMARY KEY (id)
);