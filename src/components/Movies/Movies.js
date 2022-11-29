import { React } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import cardData from '../../utils/cardData';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className='content'>
      <SearchForm />
      <MoviesCardList movies={cardData} />
    </main>
  );
}

export default Movies;
