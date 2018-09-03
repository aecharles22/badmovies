import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }
  

  getMovies(searchedGenres) {
    var query = searchedGenres;
    console.log(query);
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search', {params:{query: query}})
      .then((movies) => {
        var movieList = movies.data;
        
        this.setState({
          movies: movieList
        })
        console.log(this.state.movies)
      })
  }

  saveMovie(selectedMovie) {

    if (this.state.favorites.length === 0) {
      this.setState({favorites: [selectedMovie]})
    }
    var currentState = this.state.favorites.slice();
    var newState = currentState.concat(selectedMovie);

    this.setState({favorites: newState});
    // console.log('SAVING ', selectedMovie.title)
    axios.post('/save', {selectedMovie})
    .then(() => {
      console.log('SAVED');
    })
  }

  deleteMovie(selectedMovie) {
     var currenStats = this.state.favorites;
    if (currenStats.indexOf(selectedMovie) !== -1) {
      var index = currenStats.indexOf(selectedMovie);
      var before = currenStats.slice(0, index);
      var after = currenStats.slice(index + 1);
      var removedMovieArray = before.concat(after);
    
      this.setState({favorites: removedMovieArray});
      axios.get('/delete')
    }

    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }
  
  componentDidMount() {
    this.getMovies();
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} movieSearch={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} favorites={this.state.favorites} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));