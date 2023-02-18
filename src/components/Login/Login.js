import { React } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login() {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  return (
    <section className='login'>
      <div className='login__container'>
        <form className='login__form'>
          <Logo />
          <h1 className='login__title'>Рады видеть!</h1>
          <label className='login__label'>
            <span className='login__input-name'>E-mail</span>
            <input
              className='login__input'
              placeholder='Почта'
              pattern='^\w+@\w+\.\w+$'
              minLength={2}
              maxLength={40}
              id='email'
              name='email'
              type='email'
              required
              value={values.email || ''}
              onChange={handleChange}></input>
            <span className='login__error'>{errors.email}</span>
          </label>
          <label className='login__label'>
            <span className='login__input-name'>Пароль</span>
            <input
              className='login__input'
              placeholder='Пароль'
              minLength={5}
              maxLength={10}
              id='password'
              name='password'
              type='password'
              required
              value={values.password || ''}
              onChange={handleChange}></input>
            <span className='login__error'>{errors.password}</span>
          </label>
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
    </section>
  );
}

export default Login;
