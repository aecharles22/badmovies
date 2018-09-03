var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var config = require('../config.js');
var app = express();
var db = require('./models/movieModel.js')

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes
app.get('/search', function(req, res) {
  // get the search genre     
  // https://www.themoviedb.org/account/signup
  var options = {
    api_key: config.API_KEY,
    with_genres: req.query.query
  }
 
  // use this endpoint to search for movies by genres, you will need an API key

  // https://api.themoviedb.org/3/discover/movie
  axios.get('https://api.themoviedb.org/3/discover/movie', {params: options})
    .then((data) => { 
      var movies = data.data.results;
      movies.sort((function(a, b) {
        return a.vote_average - b.vote_average;
      }));
      res.send(movies);
      res.end();
    })
    .catch((err) => {
      console.log(err);
    })
  // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {

  var options = {
    api_key: config.API_KEY
  }
  // make an axios request to get the list of official genres
  axios.get('https://api.themoviedb.org/3/genre/movie/list', {params: options})
    .then((data) => {
      var genres = data.data.genres;

      res.send(genres);
      res.end();
    })
  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list

  // send back
});

app.post('/save', function(req, res) {
  db.add(req.body.selectedMovie);
});

app.post('/delete', function(req, res) {

});

//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
const movieRoutes = require('./routes/movieRoutes.js');
//Use routes
app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
