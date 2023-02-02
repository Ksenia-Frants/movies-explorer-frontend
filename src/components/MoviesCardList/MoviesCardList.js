import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../hooks/useScreenWidth';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({
  isLoading,
  noResults,
  moviesList,
  handleMovieSave,
  handleMovieDelete,
  savedMoviesList,
  savedMoviesPage,
}) {
  const screenWidth = useScreenWidth();
  const [showMovies, setShowMovies] = useState([]);
  const [isMount, setIsMount] = useState(true);
  const [cardAmount, setCardAmount] = useState({ sum: 12, more: 3 });

  useEffect(() => {
    if (screenWidth >= 1100) {
      setCardAmount({ sum: 12, more: 3 });
    } else if (screenWidth >= 705 && screenWidth < 1100) {
      setCardAmount({ sum: 8, more: 2 });
    } else {
      setCardAmount({ sum: 5, more: 2 });
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount]);

  useEffect(() => {
    if (moviesList.length) {
      const res = moviesList.filter((movie, i) => i < cardAmount.sum);
      setShowMovies(res);
    }
  }, [moviesList, savedMoviesPage, cardAmount.sum]);

  function getSavedMovie(savedMoviesList, movie) {
    return savedMoviesList.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  function handleMoreMovies() {
    const start = showMovies.length;
    const end = start + cardAmount.more;
    const extra = moviesList.length - start;

    if (extra > 0) {
      const newCards = moviesList.slice(start, end);
      setShowMovies([...showMovies, ...newCards]);
    }
  }

  return (
    <section className='movies-cards__cards'>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {noResults ? (
            <span className='movies__error'>Ничего не найдено</span>
          ) : (
            <>
              <ul className='movies-cards__list'>
                {showMovies.map((movie) => (
                  <MoviesCard
                    key={movie._id || movie.id}
                    movie={movie}
                    savedMoviesPage={savedMoviesPage}
                    saved={getSavedMovie(savedMoviesList, movie)}
                    handleMovieSave={handleMovieSave}
                    handleMovieDelete={handleMovieDelete}
                  />
                ))}
              </ul>
              {showMovies.length >= 5 && showMovies.length < moviesList.length ? (
                <button className='movies-cards__button' onClick={handleMoreMovies}>
                  Ещё
                </button>
              ) : (
                ''
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
