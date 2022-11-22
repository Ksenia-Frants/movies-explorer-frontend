import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className='navigation'>
      <Route exact path='/'>
        <ul className='navigation__list'>
          <li className='navigation__item'>
            <Link to='/signup' className='navigation__link navigation__link_type_signin'>
              Регистрация
            </Link>
          </li>
          <li className='navigation__item'>
            <Link to='/signin' className='navigation__link navigation__link_type_signup'>
              Войти
            </Link>
          </li>
        </ul>
      </Route>
      <Route path='/movies'>
        <ul className='navigation__list'>
          <li className='navigation__item'>
            <Link
              to='/movies'
              className='navigation__link navigation__link_type_films navigation__link_active'>
              Фильмы
            </Link>
          </li>
          <li className='navigation__item'>
            <Link to='/saved-movies' className='navigation__link navigation__link_type_saved-films'>
              Сохранённые фильмы
            </Link>
          </li>
          <li className='navigation__item'>
            <Link to='/profile' className='navigation__link navigation__link_type_account'>
              Аккаунт
            </Link>
          </li>
        </ul>
      </Route>
    </nav>
  );
}

export default Navigation;
