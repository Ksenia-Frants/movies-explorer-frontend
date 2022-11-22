import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NavTab.css';

function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__list'>
        <li className='navtab__item'>
          <HashLink smooth to='#about-project' className='navtab__link'>
            О проекте
          </HashLink>
        </li>
        <li className='navtab__item'>
          <HashLink smooth to='#techs' className='navtab__link'>
            Технологии
          </HashLink>
        </li>
        <li className='navtab-item'>
          <HashLink smooth to='#about-me' className='navtab__link'>
            Студент
          </HashLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
