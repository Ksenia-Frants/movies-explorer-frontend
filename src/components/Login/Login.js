import { React } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Preloader from '../Preloader/Preloader';

function Login({ handleLogin, isLoading, errorMessage }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values);
  }
  return (
    <section className='login'>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='login__container'>
          <form className='login__form' onSubmit={handleSubmit}>
            <Logo />
            <h1 className='login__title'>Рады видеть!</h1>
            <label className='login__label'>
              <span className='login__input-name'>E-mail</span>
              <input
                className='login__input'
                placeholder='Почта'
                id='email'
                name='email'
                type='email'
                required
                value={values.email || ''}
                onChange={handleChange}></input>
              <span className='login__error'>{errors.email || ''}</span>
            </label>
            <label className='login__label'>
              <span className='login__input-name'>Пароль</span>
              <input
                className='login__input'
                placeholder='Пароль'
                id='password'
                name='password'
                type='password'
                required
                value={values.password || ''}
                onChange={handleChange}></input>
              <span className='login__error'>{errors.password || ''}</span>
            </label>
            <span
              className={
                errorMessage.message
                  ? 'login__page-error register__page-error_visible'
                  : 'login__page-error'
              }>
              {errorMessage.message}
            </span>
            <button type='submit' className='login__button' disabled={!isValid}>
              Войти
            </button>
          </form>
          <div className='login__signup-container'>
            <span className='login__text'>Ещё не зарегистрированы?</span>
            <Link to='/signup' className='login__signup'>
              Регистрация
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
