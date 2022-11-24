import { React } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__element'>
        <input className='search-form__input' type='text' placeholder='Фильм'></input>
        <button className='search-form__button' type='submit'></button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
