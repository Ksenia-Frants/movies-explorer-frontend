import { React, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  function onClickMenu() {
    setIsMenuOpened(!isMenuOpened);
  }

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
        <button onClick={onClickMenu} className='navigation__burger-button'>
          <span></span>
        </button>
        {isMenuOpened ? (
          <>
            <div className='navigation__background'></div>
            <div className='navigation__container'>
              <button className='navigation__cross-button' onClick={onClickMenu}>
                &#x2716;
              </button>
              <ul className='navigation__menu'>
                <li className='navigation__item'>
                  <Link to='/' className='navigation__link navigation__link_type_menu'>
                    Главная
                  </Link>
                </li>
                <li className='navigation__item'>
                  <Link to='/movies' className='navigation__link navigation__link_type_menu'>
                    Фильмы
                  </Link>
                </li>
                <li className='navigation__item'>
                  <Link to='/saved-movies' className='navigation__link navigation__link_type_menu'>
                    Сохранённые фильмы
                  </Link>
                </li>
                <li className='navigation__item navigation__item_type_account'>
                  <Link
                    to='/saved-movies'
                    className='navigation__link navigation__link_type_account'>
                    Аккаунт
                  </Link>
                </li>
              </ul>
            </div>
          </>
        ) : (
          ''
        )}
      </Route>
    </nav>
  );
}

export default Navigation;
