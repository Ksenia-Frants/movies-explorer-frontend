import { React, useState, useEffect, useCallback } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { Switch, Route } from 'react-router-dom';
import { cardData, savedCardData } from '../../utils/cardData';

function MoviesCardList() {
  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth);

  const handleResize = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <section className='movies-cards__cards'>
      <ul className='movies-cards__list'>
        <Switch>
          <Route path='/movies'>
            {screenWidth >= 1100 &&
              cardData.slice(0, 12).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
            {screenWidth >= 705 &&
              screenWidth < 1100 &&
              cardData.slice(0, 8).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
            {screenWidth < 705 &&
              cardData.slice(0, 5).map((movie) => <MoviesCard key={movie._id} movie={movie} />)}
          </Route>
          <Route path='/saved-movies'>
            {savedCardData.map((savedMovie) => (
              <MoviesCard key={savedMovie._id} movie={savedMovie} />
            ))}
          </Route>
        </Switch>
      </ul>
      <Route path='/movies'>
        <button className='movies-cards__button'>Ещё</button>
      </Route>
    </section>
  );
}

export default MoviesCardList;
