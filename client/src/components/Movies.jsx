import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)
  handleOnClick(evt, movieObject) {
    evt.preventDefault();
    this.props.saveMovie(movieObject);
    // this.movieSearch(evt.target.value);
  }

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movie, i) => <Card key={i} movie={movie} clickHandler={this.handleOnClick}/>)}
      </ul>
    );
  }
}


const Card = (props) => (
  <li className="movie_item" onClick={(evt) => {props.clickHandler(evt, props.movie)}}>
          <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}/>
          <div className="movie_description">
            <h2>{props.movie.title}</h2>
            <section className="movie_details">
              <div className="movie_year">
                <span className="title">Year</span>
                <span>{props.movie.release_date}</span>
              </div>
              <div className="movie_rating">
                <span className="title">Rating</span>
                <span>{props.movie.vote_average}</span>
              </div>
            </section>
          </div>
        </li>
)

export default Movies;