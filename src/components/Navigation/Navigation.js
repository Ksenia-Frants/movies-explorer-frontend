import { React, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ logged }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function onClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

  return (
    <>
      {!logged ? (
        <nav className='navigation'>
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
        </nav>
      ) : (
        <nav className='navigation'>
          <ul className='navigation__list navigation__list_logged'>
            <li className='navigation__item'>
              <NavLink
                to='/movies'
                className='navigation__link navigation__link_type_films'
                activeClassName='navigation__link_active'>
                Фильмы
              </NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink
                to='/saved-movies'
                className='navigation__link navigation__link_type_saved-films'
                activeClassName='navigation__link_active'>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className='navigation__item'>
              <NavLink
                to='/profile'
                className='navigation__link navigation__link_type_account'
                activeClassName='navigation__link_active'>
                Аккаунт
              </NavLink>
            </li>
          </ul>
          <button onClick={onClickMenu} className='navigation__burger-button'>
            <span></span>
          </button>

          <div
            className={`navigation__background navigation__background_${
              isMenuOpened ? 'visible' : 'hidden'
            }`}></div>
          <div
            className={`navigation__container navigation__container_${
              isMenuOpened ? 'visible' : 'hidden'
            }`}>
            <button className='navigation__cross-button' onClick={onClickMenu}>
              &#x2716;
            </button>
            <ul className='navigation__menu'>
              <li className='navigation__item'>
                <NavLink
                  exact
                  to='/'
                  className='navigation__link navigation__link_type_menu'
                  activeClassName='navigation__menu-link_active'>
                  Главная
                </NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink
                  to='/movies'
                  className='navigation__link navigation__link_type_menu'
                  activeClassName='navigation__menu-link_active'>
                  Фильмы
                </NavLink>
              </li>
              <li className='navigation__item'>
                <NavLink
                  to='/saved-movies'
                  className='navigation__link navigation__link_type_menu'
                  activeClassName='navigation__menu-link_active'>
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className='navigation__item navigation__item_type_account'>
                <Link to='/profile' className='navigation__link navigation__link_type_account'>
                  Аккаунт
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navigation;
