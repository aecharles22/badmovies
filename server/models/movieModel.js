//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql');


module.exports = {
  add: function(movie) {
    sqlDb.query(`INSERT INTO movie (movie_title, release_date, rating, poster_id) VALUES(?,?,?,?)`), 
    [movie.title, movie.relase_date, movie.rating, movie.poster_id], 
    (err, results) => {
      if (err) {console.log(err)
      }
    }
  },
  remove: {}
}