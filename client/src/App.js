import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from './Movies/UpdateMovie';
import AddMovie from './Movies/AddMovie'
import Movie from "./Movies/Movie";
import axios from 'axios';



const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [updatedMovie, setUpdatedMovie] = useState(false);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res =>{
        console.log(res.data);
        setMovieList(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
    setUpdatedMovie(false)
  }, [updatedMovie]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movies={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/update-movie/:id'>
        <UpdateMovie  setUpdatedMovie={setUpdatedMovie}/>
      </Route>
      <Route path='/add-movie/'>
        <AddMovie setUpdatedMovie={setUpdatedMovie}/>
      </Route>
    </>
  );
};

export default App;
