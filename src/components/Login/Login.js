import { React } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../Logo/Logo';

function Login() {
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
              name='email'
              type='email'
              defaultValue='pochta@yandex.ru'
              required></input>
          </label>
          <label className='login__label'>
            <span className='login__input-name'>Пароль</span>
            <input className='login__input' name='password' type='password' required></input>
          </label>
          <button type='submit' className='login__button'>
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
