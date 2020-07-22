import React from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const MovieCard = props => {
  const history = useHistory();
  const { title, director, metascore, stars, id } = props.movie;
  const {setMovieList, movies} = props;

  const deleteMovie=()=>{
      axios.delete(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
          console.log('movie deleted');
          console.log(movies);
          const newMoviesList = movies.filter(movie => movie.id !== id)
          setMovieList(newMoviesList)
          history.push('/')
        })
        .catch(err=>{
          console.log(err);
        })
  }

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={()=>history.push(`/update-movie/${id}`)}>Update Movie</button>
      <button onClick={deleteMovie}>Delete Movie</button>
    </div>
  );
};

export default MovieCard;
