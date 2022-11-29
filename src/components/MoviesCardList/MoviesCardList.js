import { React, useState, useEffect, useCallback } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);

  const handleResize = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <section className='movies-cards__cards'>
      <ul className='movies-cards__list'>
        {screenWidth >= 1100 &&
          movies.slice(0, 12).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
        {screenWidth >= 705 &&
          screenWidth < 1100 &&
          movies.slice(0, 8).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
        {screenWidth < 705 &&
          movies.slice(0, 5).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
      </ul>
      <button className='movies-cards__button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
