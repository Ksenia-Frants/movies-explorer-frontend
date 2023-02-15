import { React, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { filterMovies, filterShortMovies } from '../../utils/utils';

function SavedMovies({ handleMovieDelete, savedMoviesList }) {
  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);

  function handleSearchSubmit(inputValue) {
    const filteredMovies = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (filteredMovies.length !== 0) {
      setShowedMovies(filteredMovies);
    }
  }

  function toggleShortFilms() {
    if (shortMovies) {
      setShortMovies(false);
      localStorage.setItem('shortSavedMovies', false);
      setShowedMovies(savedMoviesList);
    } else {
      setShortMovies(true);
      localStorage.setItem('shortSavedMovies', true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    }
  }

  useEffect(() => {
    if (localStorage.getItem('shortSavedMovies') === 'true') {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(savedMoviesList));
    } else {
      setShortMovies(false);
      setShowedMovies(savedMoviesList);
    }
  }, [savedMoviesList]);

  return (
    <section className='saved-movies'>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        toggleShortFilms={toggleShortFilms}
        shortMovies={shortMovies}
      />
      <MoviesCardList
        moviesList={showedMovies}
        handleMovieDelete={handleMovieDelete}
        savedMoviesList={showedMovies}
        savedMoviesPage={true}
      />
    </section>
  );
}

export default SavedMovies;
