import { React } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import Logo from '../Logo/Logo';

function Register() {
  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
        <form className='register__form'>
          <label className='register__label'>
            <span className='register__input-name'>Имя</span>
            <input
              className='register__input'
              name='name'
              type='text'
              defaultValue='Ксения'
              required></input>
          </label>
          <label className='register__label'>
            <span className='register__input-name'>E-mail</span>
            <input
              className='register__input'
              name='email'
              type='email'
              defaultValue='pochta@yandex.ru'
              required></input>
          </label>
          <label className='register__label'>
            <span className='register__input-name'>Пароль</span>
            <input
              className='register__input'
              name='password'
              type='password'
              defaultValue='••••••••••••••'
              required></input>
          </label>
          <span className='register__error'>Что-то пошло не так...</span>
          <button type='submit' className='register__button'>
            Зарегистрироваться
          </button>
        </form>
        <div className='register__signin-container'>
          <span className='register__text'>Уже зарегистрированы?</span>
          <Link to='/signin' className='register__signin'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
