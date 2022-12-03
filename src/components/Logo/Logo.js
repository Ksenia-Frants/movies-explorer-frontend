import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to='/' className='logo__link'>
      <img src={logo} alt='Логотип приложения.' className='logo__image' />
    </Link>
  );
}

export default Logo;
