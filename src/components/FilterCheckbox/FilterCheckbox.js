import { React } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ toggleShortFilms, shortMovies }) {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__label'>
        <input
          className='filter-checkbox__input'
          type='checkbox'
          onChange={toggleShortFilms}
          checked={shortMovies ? true : false}
        />
        <span className='filter-checkbox__flag'></span>
      </label>
      <span className='filter-checkbox__name'>Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
