import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
      .then((data) => {
        var genres = data.data;
        this.setState({
          genres: genres
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleOnClick(evt, selectValue) {
    evt.preventDefault();

    this.props.movieSearch(selectValue);
  }

  componentDidMount(){
    this.getGenres();
  }


  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select id='dropDown'>
          {this.state.genres.map((genre, i) => <List key={i} genre={genre}/>)}
        </select>
        <br/><br/>

        <button onClick={(evt) => this.handleOnClick(evt, document.getElementById('dropDown').value)}>Search</button>

      </div>
    );
  }
}

const List = ({genre}) => (
  <option value={genre.id}>{genre.name}</option>
)

export default Search;