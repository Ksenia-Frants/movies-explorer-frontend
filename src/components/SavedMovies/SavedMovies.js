import { React, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { filterMovies, filterShortMovies } from '../../utils/utils';

function SavedMovies({ handleMovieDelete, savedMoviesList }) {
  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  const [noResults, setNoResults] = useState(false);

  function handleSearchSubmit(inputValue) {
    if (filterMovies(savedMoviesList, inputValue, shortMovies).length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
      setFilteredMovies(filterMovies(savedMoviesList, inputValue, shortMovies));
      setShowedMovies(filterMovies(savedMoviesList, inputValue, shortMovies));
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
      setShowedMovies(filterShortMovies(filteredMovies));
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
        savedMoviesList={savedMoviesList}
        savedMoviesPage={true}
        noResults={noResults}
      />
    </section>
  );
}

export default SavedMovies;
