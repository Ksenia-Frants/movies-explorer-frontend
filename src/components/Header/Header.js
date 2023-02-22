import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation();
  return (
    <header
      className={`header ${
        (location.pathname === '/signup' && 'header__auth-page') ||
        (location.pathname === '/signin' && 'header__auth-page')
      }`}>
      {loggedIn && (
        <>
          <Logo />
          <Navigation loggedIn={loggedIn} />
        </>
      )}
      {!loggedIn && (
        <Route exact path='/'>
          <Logo />
          <nav className='header__auth'>
            <ul className='header__auth-list'>
              <li className='header__auth-item'>
                <Link to='/signup' className='header__link header__link_type_signin'>
                  Регистрация
                </Link>
              </li>
              <li className='header__item'>
                <Link to='/signin' className='header__link header__link_type_signup'>
                  Войти
                </Link>
              </li>
            </ul>
          </nav>
        </Route>
      )}
    </header>
  );
}

export default Header;
