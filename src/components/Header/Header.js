import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='header__link'>
        <img src={logo} alt='Логотип приложения.' className='header__logo' />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;