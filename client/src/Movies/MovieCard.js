import React from 'react';
import { useHistory } from 'react-router-dom'

const MovieCard = props => {
  const history = useHistory();
  const { title, director, metascore, stars, id } = props.movie;
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
    </div>
  );
};

export default MovieCard;
