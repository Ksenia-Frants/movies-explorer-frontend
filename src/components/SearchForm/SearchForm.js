import { React, useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ handleSearchSubmit, shortMovies, handleClickCheckbox }) {
  const { values, handleChange, isValid } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    isValid ? handleSearchSubmit(values.movie) : setErrorMessage('Нужно ввести ключевое слово');
  }

  useEffect(() => {
    setErrorMessage('');
  }, [isValid]);

  return (
    <section className='search-form'>
      <form className='search-form__element' onSubmit={handleSubmit} noValidate>
        <input
          className='search-form__input'
          type='text'
          placeholder='Фильм'
          required
          onChange={handleChange}
          name='movie'
          value={values.movie || ''}></input>
        <button className='search-form__button' type='submit'></button>
      </form>
      <span className='search-form__error'>{errorMessage}</span>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
