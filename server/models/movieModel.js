//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');


module.exports = {
  add: function(movie) {
    console.log(movie);
    sqlDb.query(`INSERT INTO movie (movie_title, release_date, rating, poster_id) VALUES("${movie['title']}",${movie.release_date},${movie.vote_average},"${movie.poster_path}")`)
  },
  remove: {}
}