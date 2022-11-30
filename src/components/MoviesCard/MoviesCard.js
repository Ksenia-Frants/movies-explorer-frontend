import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  const [savedCard, setSavedCard] = useState(false);

  function handleSaveClick() {
    setSavedCard(!savedCard);
  }

  return (
    <li className='movies-card__item'>
      <img className='movies-card__image' src={movie.pic} alt={movie.title} />
      <div className='movies-card__description'>
        <h2 className='movies-card__title'>{movie.title}</h2>
        <span className='movies-card__time'>{movie.time}</span>
      </div>
      <Switch>
        <Route path='/movies'>
          <button
            className={`movies-card__button movies-card__button_${savedCard ? 'saved' : 'save'}`}
            onClick={handleSaveClick}>
            {savedCard ? '' : 'Сохранить'}
          </button>
          {/* {movie.saved ? (
            <button className='movies-card__button movies-card__button_saved'></button>
          ) : (
            <button className='movies-card__button movies-card__button_save'>Сохранить</button>
          )} */}
        </Route>
        <Route path='/saved-movies'>
          <button className='movies-card__button movies-card__button_delete'></button>
        </Route>
      </Switch>
    </li>
  );
}

export default MoviesCard;
