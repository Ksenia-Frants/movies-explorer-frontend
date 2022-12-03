import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ logged }) {
  return (
    <header className='header'>
      <Logo />
      <Navigation logged={logged} />
    </header>
  );
}

export default Header;
