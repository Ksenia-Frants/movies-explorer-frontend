import { React, useEffect } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';
import FormLink from '../FormLink/FormLink';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Preloader from '../Preloader/Preloader';

function Register({ handleRegister, errorMessage, isLoading, isDisabledFormElement }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values);
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='register'>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='register__container'>
          <form className='register__form' onSubmit={handleSubmit}>
            <Logo />
            <h1 className='register__title'>Добро пожаловать!</h1>
            <label className='register__label'>
              <span className='register__input-name'>Имя</span>
              <input
                className='register__input'
                name='name'
                type='text'
                placeholder='Имя'
                required
                minLength='2'
                maxLength='40'
                values={values.name || ''}
                onChange={handleChange}
                disabled={isDisabledFormElement}></input>
              <span className='register__error'>{errors.name || ''}</span>
            </label>
            <label className='register__label'>
              <span className='register__input-name'>E-mail</span>
              <input
                className='register__input'
                name='email'
                type='email'
                placeholder='Почта'
                required
                value={values.email || ''}
                onChange={handleChange}
                disabled={isDisabledFormElement}></input>
              <span className='register__error'>{errors.email || ''}</span>
            </label>
            <label className='register__label'>
              <span className='register__input-name'>Пароль</span>
              <input
                className='register__input'
                name='password'
                type='password'
                placeholder='Пароль'
                required
                value={values.password || ''}
                onChange={handleChange}></input>
              <span className='register__error'>{errors.password || ''}</span>
            </label>
            <span
              className={
                errorMessage.message
                  ? 'register__page-error register__page-error_visible'
                  : 'register__page-error'
              }>
              {errorMessage.message}
            </span>
            <button
              type='submit'
              className='register__button'
              disabled={!isValid || isDisabledFormElement}>
              Зарегистрироваться
            </button>
          </form>
          <FormLink text='Уже зарегистрированы?' page='/signin' link='Войти' />
        </div>
      )}
    </section>
  );
}

export default Register;
