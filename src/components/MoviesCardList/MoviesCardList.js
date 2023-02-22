import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useScreenWidth from '../../hooks/useScreenWidth';
import Preloader from '../Preloader/Preloader';
import { SCREEN_WIDTH_FEATURES } from '../../utils/constants';

function MoviesCardList({
  isLoading,
  moviesList,
  handleMovieSave,
  handleMovieDelete,
  savedMoviesList,
  savedMoviesPage,
  isMoviesFound,
}) {
  const screenWidth = useScreenWidth();
  const [showMovies, setShowMovies] = useState([]);
  const [isMount, setIsMount] = useState(true);
  const [cardAmount, setCardAmount] = useState({ sum: 12, more: 3 });

  const { desktop, tablet, mobile } = SCREEN_WIDTH_FEATURES;

  useEffect(() => {
    if (screenWidth >= desktop.screen) {
      setCardAmount(desktop.movies);
    } else if (screenWidth >= tablet.screen.min && screenWidth < tablet.screen.max) {
      setCardAmount(tablet.movies);
    } else {
      setCardAmount(mobile.movies);
    }
    return () => setIsMount(false);
  }, [screenWidth, isMount, desktop, tablet, mobile]);

  useEffect(() => {
    const res = moviesList.slice(0, cardAmount.sum);
    setShowMovies(res);
  }, [moviesList, cardAmount.sum]);

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
          {isMoviesFound ? (
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
              ) : null}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
