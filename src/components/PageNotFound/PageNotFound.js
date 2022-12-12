import { React } from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <section className='not-found'>
      <span className='not-found__status'>404</span>
      <span className='not-found__name'>Страница не найдена</span>

      <Link to='/' className='not-found__link'>
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;
