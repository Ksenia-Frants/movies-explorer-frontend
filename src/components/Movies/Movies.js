import { React } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

function Movies({
  isLoading,
  isError,
  noResults,
  handleSearchSubmit,
  toggleShortFilms,
  shortMovies,
  moviesList,
  handleMovieSave,
  handleMovieDelete,
  savedMoviesList,
  savedMoviesPage,
}) {
  return (
    <section className='movies'>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
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
            isLoading={isLoading}
            noResults={noResults}
            moviesList={moviesList}
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
