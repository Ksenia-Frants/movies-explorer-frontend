import { React, useState, useEffect } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ handleSearchSubmit, toggleShortFilms, shortMovies }) {
  const { values, handleChange } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');
  const searchQuery = values.movie;

  function handleSubmit(evt) {
    evt.preventDefault();

    if (searchQuery) {
      handleSearchSubmit(searchQuery);
      hideErrorMessage();
    } else {
      showErrorMessage();
    }
  }

  useEffect(() => {
    if (searchQuery !== '') {
      hideErrorMessage();
    } else {
      showErrorMessage();
    }
  }, [searchQuery]);

  function hideErrorMessage() {
    setErrorMessage('');
  }

  function showErrorMessage() {
    setErrorMessage('Нужно ввести ключевое слово');
  }

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
      <span className={`${errorMessage && 'search-form__error'}`}>{errorMessage}</span>
      <FilterCheckbox toggleShortFilms={toggleShortFilms} shortMovies={shortMovies} />
    </section>
  );
}

export default SearchForm;
