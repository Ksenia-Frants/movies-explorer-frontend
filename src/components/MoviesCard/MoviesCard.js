import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movie, handleMovieSave, handleMovieDelete, saved, savedMoviesPage }) {
  const movieDuration = `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;

  function handleSaveClick() {
    handleMovieSave(movie);
  }

  function handleDeleteClick() {
    handleMovieDelete(movie);
  }

  return (
    <li className='movies-card__item'>
      <a
        className='movies__card-link'
        href={movie.trailerLink || movie.trailer}
        target='_blank'
        rel='noreferrer'>
        <img className='movies-card__image' src={movie.image} alt={movie.nameRU} />
      </a>
      <div className='movies-card__description'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <span className='movies-card__time'>{movieDuration}</span>
      </div>
      {!savedMoviesPage ? (
        <button
          className={
            saved
              ? 'movies-card__button movies-card__button_saved'
              : 'movies-card__button movies-card__button_save'
          }
          onClick={saved ? handleDeleteClick : handleSaveClick}>
          {saved ? '' : 'Сохранить'}
        </button>
      ) : (
        <button
          className='movies-card__button movies-card__button_delete'
          onClick={handleDeleteClick}></button>
      )}
    </li>
  );
}

export default MoviesCard;
