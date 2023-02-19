import { React, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import { filterMovies, filterShortMovies } from '../../utils/utils';
import * as moviesApi from '../../utils/MoviesApi';
import { remakeMovieData } from '../../utils/utils';

function Movies({ handleMovieSave, handleMovieDelete, savedMoviesList, savedMoviesPage }) {
  const [isShortMoviesSelected, setIsShortMoviesSelected] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialMovies, setInititalMovies] = useState([]);
  const [areMoviesLoading, setAreMoviesLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [serverMovies, setServerMovies] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('shortMovies') === 'true') {
      setIsShortMoviesSelected(true);
    } else {
      setIsShortMoviesSelected(false);
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
    moviesList.length === 0 ? setNotFound(true) : setNotFound(false);
    setInititalMovies(moviesList);
    setFilteredMovies(shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function handleSearchMovieSubmit(inputValue) {
    localStorage.setItem('movieSearch', inputValue);
    localStorage.setItem('shortMovies', isShortMoviesSelected);
    if (Boolean(!serverMovies.length)) {
      setAreMoviesLoading(true);
      moviesApi
        .getMovies()
        .then((data) => {
          setServerMovies(data);
          handleSetFilteredMovies(remakeMovieData(data), inputValue, isShortMoviesSelected);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setAreMoviesLoading(false));
    } else {
      handleSetFilteredMovies(serverMovies, inputValue, isShortMoviesSelected);
    }
  }

  function toggleShortFilms() {
    setIsShortMoviesSelected(!isShortMoviesSelected);
    if (!isShortMoviesSelected) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem('shortMovies', !isShortMoviesSelected);
  }

  return (
    <section className='movies'>
      <SearchForm
        handleSearchSubmit={handleSearchMovieSubmit}
        toggleShortFilms={toggleShortFilms}
        shortMovies={isShortMoviesSelected}
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
            isMoviesFound={notFound}
          />
        </>
      )}
    </section>
  );
}

export default Movies;
