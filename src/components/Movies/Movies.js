import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { filterMovies, filterShortMovies } from '../../utils/utils';
import * as moviesApi from '../../utils/MoviesApi';
import { remakeMovieData } from '../../utils/utils';

function Movies({ handleMovieSave, handleMovieDelete, savedMoviesList, savedMoviesPage }) {
  const [shortMovies, setShortMovies] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInititalMovies] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      const movies = JSON.parse(localStorage.getItem('movies'));
      setInititalMovies(movies);
      if (localStorage.getItem('shortMovies') === 'true') {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);
    setInititalMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleSearchMovieSubmit(inputValue) {
    setAreMoviesLoading(true);
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', shortMovies);

    moviesApi
      .getMovies()
      .then((data) => {
        handleSetFilteredMovies(remakeMovieData(data), inputValue, shortMovies);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      })
      .finally(() => setAreMoviesLoading(false));
  }

  function toggleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !shortMovies);
  }

  return (
    <section className='movies'>
      <SearchForm
        handleSearchSubmit={handleSearchMovieSubmit}
        toggleShortFilms={toggleShortFilms}
        shortMovies={shortMovies}
      />
      {isError ? (
        <span className='movies__error'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз
        </span>
      ) : (
        <>
          <MoviesCardList
            isLoading={areMoviesLoading}
            moviesList={filteredMovies}
            handleMovieSave={handleMovieSave}
            handleMovieDelete={handleMovieDelete}
            savedMoviesList={savedMoviesList}
            savedMoviesPage={savedMoviesPage}
          />
        </>
      )}
    </section>
  );
}

export default Movies;
