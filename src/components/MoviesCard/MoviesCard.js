import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie }) {
  return (
    <li className='movies-card__item'>
      <img className='movies-card__image' src={movie.pic} alt={movie.title} />
      <div className='movies-card__description'>
        <h2 className='movies-card__title'>{movie.title}</h2>
        <span className='movies-card__time'>{movie.time}</span>
      </div>
    </li>
  );
}

export default MoviesCard;
