import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {
  return (
    <section className='movies-cards__cards'>
      <ul className='movies-cards__list'>
        {movies.map((movie) => (
          <MoviesCard key={movie._id} movie={movie} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
